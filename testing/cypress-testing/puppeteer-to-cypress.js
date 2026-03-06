// puppeteer-to-cypress.js
import fs from 'fs'
import * as parser from '@babel/parser'
import traverseModule from '@babel/traverse'
import generatorModule from '@babel/generator'

const traverse = traverseModule.default
const generate = generatorModule.default

const inputFile = process.argv[2]
const outputFile = process.argv[3] || 'output.puppeteer.cy.ts'

if (!inputFile) {
  console.log('Usage: node puppeteer-to-cypress.js input.js output.js')
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
// VARIABLE STORE (fix timeout issue)
// ================================
const variableMap = new Map()

// ================================
// HELPERS
// ================================
function stripQuotes(s) {
  if (!s) return s
  return s.replace(/^["']|["']$/g, '')
}

// convert AST node → safe JS output
function nodeToString(node) {
  if (!node) return null

  if (node.type === 'StringLiteral') {
    return JSON.stringify(node.value)
  }

  if (node.type === 'NumericLiteral') {
    return node.value
  }

  // resolve constants like timeout
  if (node.type === 'Identifier' && variableMap.has(node.name)) {
    return variableMap.get(node.name)
  }

  // simple template literal
  if (
    node.type === 'TemplateLiteral' &&
    node.quasis.length === 1 &&
    node.expressions.length === 0
  ) {
    return JSON.stringify(node.quasis[0].value.cooked)
  }

  return generate(node).code
}

// remove deep selectors like >>>> or :scope >>>
function normalizeDeepSelector(selector) {
  if (!selector) return selector

  const parts = selector
    .split(/>>>>>|>>>>|>>>/)
    .map(p => p.trim())
    .filter(Boolean)

  const last = parts.length ? parts[parts.length - 1] : selector
  return last.replace(/^\s*:scope\s*/i, '').trim()
}

// ================================
// SELECTOR CONVERTER
// ================================
function convertSelector(selector) {
  if (!selector) return null

  selector = stripQuotes(selector)
  selector = normalizeDeepSelector(selector)

// chained aria selectors
if (selector.includes('>>>') && selector.includes('::-p-aria')) {
  const parts = selector.split(/>>>>>|>>>>|>>>/).map(p => p.trim())

  const first = parts[0]
  const second = parts[1]

  const firstMatch = first.match(/::-p-aria\((.*?)\)/)
  const secondMatch = second?.match(/::-p-aria\((.*?)\)/)

  if (firstMatch && secondMatch) {
    const parent = stripQuotes(firstMatch[1])
    const child = stripQuotes(secondMatch[1])

    if (child.startsWith('[')) {
      return `cy.get('[aria-label="${parent}"]').find(${JSON.stringify(child)})`
    }

    return `cy.get('[aria-label="${parent}"]').find('[aria-label="${child}"]')`
  }
}

  // ::-p-text(text) -> cy.contains(text)
  if (selector.includes('::-p-text(')) {
    const match = selector.match(/::-p-text\(([\s\S]*?)\)/)
    if (match) {
      return `cy.contains(${JSON.stringify(stripQuotes(match[1]))})`
    }
  }

  // ::-p-aria(...)
if (selector.includes('::-p-aria(')) {
  const match = selector.match(/::-p-aria\(([\s\S]*?)\)/)
  if (!match) return null

  const content = stripQuotes(match[1].trim())
const commonMethod = ".eq(0).should('exist').scrollIntoView()"

  // attribute selector already
  if (content.startsWith('[') && content.endsWith(']')) {
    return `cy.get('${content}')` + commonMethod
  }

  // role=button → [role="button"]
  if (content.includes('role=')) {
    const roleMatch = content.match(/role\s*=\s*["']?([^"'\]]+)["']?/)
    if (roleMatch) {
      return `cy.get('[role="${roleMatch[1]}"]')` + commonMethod
    }
  }

  // accessible name → aria-label
  return `cy.get('[aria-label="${content}"]')` + commonMethod
}

  // xpath → TODO (requires plugin)
  if (selector.includes('::-p-xpath(')) {
    const match = selector.match(/::-p-xpath\(([\s\S]*?)\)/)
    const xpath = match ? stripQuotes(match[1]) : selector
    return `/* TODO: requires cypress-xpath */ cy.xpath(${JSON.stringify(xpath)})`
  }

  // normal CSS
  return `cy.get(${JSON.stringify(selector)})` + commonMethod
}

// ================================
// PICK BEST SELECTOR FROM race()
// ================================

function pickBestSelector(raceElements) {
  if (!raceElements?.length) return null

  const selectors = raceElements
    .map(el => nodeToString(el.arguments?.[0]))
    .filter(Boolean)
    .map(stripQuotes)

  if (!selectors.length) return null

  const cleaned = selectors.map(normalizeDeepSelector)

  // 1️⃣ Prefer ARIA names (most stable)
  const ariaName = cleaned.find(s => {
    if (!s.includes('::-p-aria(')) return false
    const match = s.match(/::-p-aria\((.*?)\)/)
    if (!match) return false

    const content = stripQuotes(match[1]).trim()

    // ignore attribute selectors and roles
    if (content.startsWith('[')) return false
    if (content.includes('role=')) return false

    return content.length > 1
  })
  if (ariaName) return ariaName

  // 2️⃣ Prefer meaningful visible text
  const ptext = cleaned.find(s => {
    if (!s.includes('::-p-text')) return false
    const match = s.match(/::-p-text\((.*?)\)/)
    if (!match) return false

    const text = stripQuotes(match[1]).trim()
    return text.length > 1 && !/^#/.test(text)
  })
  if (ptext) return ptext

  // 3️⃣ Prefer real CSS selectors
  const css = cleaned.find(s => !s.includes('::-p-'))
  if (css) return css

  // 4️⃣ aria role fallback
  const ariaRole = cleaned.find(s => s.includes('role='))
  if (ariaRole) return ariaRole

  // 5️⃣ fallback
  return cleaned[0]
}
// ================================
// MAIN CONVERSION
// ================================
let cypressCommands = []

traverse(ast, {
  // capture variables like: const timeout = 5000
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

    // page.setDefaultTimeout(...)
    if (callee?.property?.name === 'setDefaultTimeout') {
      // const val = nodeToString(path.node.arguments?.[0])
      const val =  10000 //milisec
      cypressCommands.push(
        `Cypress.config('defaultCommandTimeout', ${val})`
      )
      return
    }

    // page.goto(...)
    if (callee?.property?.name === 'goto') {
      const val = nodeToString(path.node.arguments?.[0])
      cypressCommands.push(`cy.visit(${val})`)

      return
    }

    // page.setViewport(...)
    if (callee?.property?.name === 'setViewport') {
      const arg = path.node.arguments?.[0]

      if (arg?.type === 'ObjectExpression') {
        const width = arg.properties.find(p => p.key.name === 'width')?.value?.value
        const height = arg.properties.find(p => p.key.name === 'height')?.value?.value

        if (width != null && height != null) {
          cypressCommands.push(`cy.viewport(${width}, ${height})`)
        }
      }
      return
    }

    // click / fill conversion
    if (
      callee?.property &&
      (callee.property.name === 'click' || callee.property.name === 'fill')
    ) {
      const action = callee.property.name

      // walk back to find Locator.race(...)
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

      const bestSelector = pickBestSelector(raceArg.elements)
      const cySelector = convertSelector(bestSelector)

      if (!cySelector) {
        cypressCommands.push(
          `// TODO: selector couldn't be converted: ${JSON.stringify(bestSelector)}`
        )
        return
      }

      // click
      if (action === 'click') {
        let x = null
        let y = null

        const clickArg = path.node.arguments?.[0]
        if (clickArg?.type === 'ObjectExpression') {
          const offset = clickArg.properties.find(p => p.key.name === 'offset')

          if (offset?.value?.type === 'ObjectExpression') {
            x = nodeToString(offset.value.properties.find(p => p.key.name === 'x')?.value)
            y = nodeToString(offset.value.properties.find(p => p.key.name === 'y')?.value)
          }
        }

        if (x != null && y != null) {
          cypressCommands.push(`${cySelector}.click(${x}, ${y}, {force: true})`)
        } else {
          cypressCommands.push(`${cySelector}.click({force: true})`)
        }
      }

      // fill -> type
      if (action === 'fill') {
        const val = nodeToString(path.node.arguments?.[0])
        cypressCommands.push(`${cySelector}.type(${val})`)
      }
    }
  },
})

// ================================
// OUTPUT TEST
// ================================
const finalTest = `
describe('Converted Puppeteer Test', () => {
  it('runs converted steps', () => {
    ${cypressCommands.join('\n    ')}
  })
})
`

fs.writeFileSync(outputFile, finalTest)
console.log('✅ Cypress test generated:', outputFile)