import fs from 'fs'
import * as parser from '@babel/parser'
import traverseModule from '@babel/traverse'
import generatorModule from '@babel/generator'

const traverse = traverseModule.default
const generate = generatorModule.default

const inputFile = process.argv[2]
const outputFile = process.argv[3] || 'output.spec.ts'

if (!inputFile) {
  console.log('Usage: node puppeteer-to-playwright.js input.js output.spec.ts')
  process.exit(1)
}

const code = fs.readFileSync(inputFile, 'utf8')

// ================================
// PARSE AST
// ================================
const ast = parser.parse(code, {
  sourceType: 'module',
  plugins: [
    'jsx',
    'classProperties',
    'optionalChaining',
    'nullishCoalescingOperator',
    'asyncGenerators',
    'dynamicImport',
  ],
})

// ================================
// VARIABLE STORE
// ================================
const variableMap = new Map()

// ================================
// HELPERS
// ================================
function stripQuotes(s) {
  if (!s) return s
  return s.replace(/^["']|["']$/g, '')
}

function nodeToString(node) {
  if (!node) return null

  if (node.type === 'StringLiteral') return JSON.stringify(node.value)

  if (node.type === 'NumericLiteral') return node.value

  if (node.type === 'Identifier' && variableMap.has(node.name)) {
    return variableMap.get(node.name)
  }

  return generate(node).code
}

function normalizeSelector(selector) {
  if (!selector) return selector

  const parts = selector
    .split(/>>>>>|>>>>|>>>/)
    .map(p => p.trim())
    .filter(Boolean)

  return parts.length ? parts[parts.length - 1] : selector
}

// ================================
// SELECTOR RANKING
// ================================
function pickBestSelector(selectors) {
  const cleaned = selectors.map(stripQuotes).map(normalizeSelector)

  // 1 text selector
  const textSel = cleaned.find(s => s.includes('::-p-text('))
  if (textSel) return textSel

  // 2 aria name
  const ariaName = cleaned.find(s => {
    if (!s.includes('::-p-aria(')) return false

    const match = s.match(/::-p-aria\((.*?)\)/)
    if (!match) return false

    const content = stripQuotes(match[1])

    if (content.startsWith('[')) return false
    if (content.includes('role=')) return false

    return true
  })
  if (ariaName) return ariaName

  // 3 aria role
  const ariaRole = cleaned.find(s => s.includes('role='))
  if (ariaRole) return ariaRole

  // 4 css
  const css = cleaned.find(s => !s.includes('::-p-'))
  if (css) return css

  // 5 xpath
  const xpath = cleaned.find(s => s.includes('::-p-xpath'))
  if (xpath) return xpath

  return cleaned[0]
}

// ================================
// SELECTOR CONVERTER
// ================================
function convertSelector(selector) {
  if (!selector) return null

  selector = stripQuotes(selector)

  // text
  if (selector.includes('::-p-text(')) {
    const match = selector.match(/::-p-text\((.*?)\)/)
    return `page.getByText(${JSON.stringify(stripQuotes(match[1]))})`
  }

  // aria
  if (selector.includes('::-p-aria(')) {
    const match = selector.match(/::-p-aria\((.*?)\)/)
    const content = stripQuotes(match[1])

    if (content.startsWith('['))
      return `page.locator('${content}')`

    if (content.includes('role=')) {
      const role = content.match(/role\s*=\s*["']?([^"']+)/)?.[1]
      return `page.getByRole('${role}')`
    }

    return `page.getByLabel('${content}')`
  }

  // xpath
  if (selector.includes('::-p-xpath(')) {
    const match = selector.match(/::-p-xpath\((.*?)\)/)
    return `page.locator('xpath=${stripQuotes(match[1])}')`
  }

  return `page.locator(${JSON.stringify(selector)})`
}

// ================================
// COMMAND STORAGE
// ================================
let playwrightCommands = []

// ================================
// AST TRAVERSAL
// ================================
traverse(ast, {

  VariableDeclarator(path) {
    const name = path.node.id.name
    const init = path.node.init

    if (!init) return

    if (init.type === 'NumericLiteral' || init.type === 'StringLiteral') {
      variableMap.set(name, init.value)
    }
  },

  CallExpression(path) {

    const callee = path.node.callee

    // page.goto
    if (callee?.property?.name === 'goto') {
      const url = nodeToString(path.node.arguments?.[0])
      playwrightCommands.push(`await page.goto(${url})`)
      return
    }

    // viewport
    if (callee?.property?.name === 'setViewport') {

      const arg = path.node.arguments?.[0]

      if (arg?.type === 'ObjectExpression') {

        const width = arg.properties.find(p => p.key.name === 'width')?.value?.value
        const height = arg.properties.find(p => p.key.name === 'height')?.value?.value

        playwrightCommands.push(
          `await page.setViewportSize({ width: ${width}, height: ${height} })`
        )
      }

      return
    }

    // click / fill
    if (
      callee?.property &&
      (callee.property.name === 'click' || callee.property.name === 'fill')
    ) {

      const action = callee.property.name

      // find Locator.race()
      let current = callee.object
      let raceCall = null

      while (current) {

        if (
          current.type === 'CallExpression' &&
          current.callee?.property?.name === 'race'
        ) {
          raceCall = current
          break
        }

        if (current.type === 'CallExpression' && current.callee?.object) {
          current = current.callee.object
          continue
        }

        if (current.type === 'MemberExpression') {
          current = current.object
          continue
        }

        break
      }

      if (!raceCall) return

      const raceArg = raceCall.arguments?.[0]

      if (!raceArg || raceArg.type !== 'ArrayExpression') return

      const selectors = raceArg.elements
        .map(el => nodeToString(el.arguments?.[0]))
        .filter(Boolean)

      if (!selectors.length) return

      const bestSelector = pickBestSelector(selectors)
      const pwSelector = convertSelector(bestSelector)

      if (!pwSelector) return

      // CLICK
      if (action === 'click') {

        let x = null
        let y = null

        const clickArg = path.node.arguments?.[0]

        if (clickArg?.type === 'ObjectExpression') {

          const offset = clickArg.properties.find(
            p => p.key.name === 'offset'
          )

          if (offset?.value?.type === 'ObjectExpression') {

            x = nodeToString(
              offset.value.properties.find(p => p.key.name === 'x')?.value
            )

            y = nodeToString(
              offset.value.properties.find(p => p.key.name === 'y')?.value
            )
          }
        }

        if (x && y) {
          playwrightCommands.push(
            `await ${pwSelector}.click({ position: { x: ${x}, y: ${y} } })`
          )
        } else {
          playwrightCommands.push(`await ${pwSelector}.click()`)
        }
      }

      // FILL
      if (action === 'fill') {

        const val = nodeToString(path.node.arguments?.[0])

        playwrightCommands.push(`await ${pwSelector}.fill(${val})`)
      }
    }
  }
})

// ================================
// GENERATE TEST FILE
// ================================
const finalTest = `
import { test, expect } from '@playwright/test'

test('converted puppeteer test', async ({ page }) => {

${playwrightCommands.map(c => `  ${c}`).join('\n')}

})
`

fs.writeFileSync(outputFile, finalTest)

console.log('✅ Playwright test generated:', outputFile)