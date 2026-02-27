#!/usr/bin/env node

/**
 * Puppeteer → Cypress Converter
 * ------------------------------
 * Usage:
 *   node puppeteer-to-cypress.js input.js > output.puppeteer.cy.js
 *
 * Requirements:
 *   - Node 18+
 *   - If using ES modules: "type": "module" in package.json
 */

import fs from "fs";

// =====================================================
// Config
// =====================================================

const config = {
  warnOnUnknown: true,
};

// =====================================================
// Logger
// =====================================================

const warn = (msg) => {
  if (config.warnOnUnknown) {
    console.warn(`[converter] ${msg}`);
  }
};

// =====================================================
// Utility helpers
// =====================================================

const escapeForQuotes = (str = "") =>
  str.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

const wrapSelector = (selector) =>
  `"${selector.replace(/"/g, '\\"')}"`;

const isCypressExpression = (selector) =>
  selector?.startsWith("cy.");

// =====================================================
// Selector Processing
// =====================================================

/**
 * Convert Puppeteer selector syntax → Cypress compatible
 */
const cleanSelector = (selector) => {
  if (!selector) return null;

  let result = selector;

  // unwrap escaped quotes
  result = result.replace(/\\"/g, '"');

  // Remove xpath selectors entirely
  if (result.includes("xpath")) return null;

  // Convert aria selectors
  result = result.replace(/::-p-aria\((.*?)\)/g, (_, value) => {
    value = value.replace(/^\[|\]$/g, "").trim();

    // role selectors → [role="button"]
    if (value.startsWith("role=")) {
      const role = value.split("=")[1].replace(/"/g, "");
      return `[role="${role}"]`;
    }

    // fallback → cy.contains()
    return `cy.contains("${escapeForQuotes(value)}")`;
  });

  // Convert text selectors
  result = result.replace(/::-p-text\((.*?)\)/g, (_, text) => {
    return `cy.contains("${escapeForQuotes(text)}")`;
  });

  // Remove Puppeteer combinators
  result = result
    .replace(/:scope\s*>>>\s*/g, "")
    .replace(/>>>>/g, " ")
    .trim();

  return result || null;
};

/**
 * Extract all selectors from Locator.race()
 */
const extractSelectorsFromRace = (block) => {
  const matches = [...block.matchAll(/locator\('([^']+)'\)/g)];

  return matches
    .map((m) => cleanSelector(m[1]))
    .filter(Boolean);
};

/**
 * Score selectors by stability/quality
 */
const scoreSelector = (selector) => {
  if (!selector) return 0;
  if (selector.startsWith("cy.contains")) return 100;
  if (selector.includes("[role=")) return 90;
  if (!selector.includes("nth-of-type")) return 50;
  return 10;
};

/**
 * Choose best selector
 */
const chooseBestSelector = (selectors) => {
  if (!selectors.length) return null;
  return selectors.sort((a, b) => scoreSelector(b) - scoreSelector(a))[0];
};

// =====================================================
// Command Builder
// =====================================================

const buildCommand = (selector, action, args = "") => {
  if (!selector) return null;

  if (isCypressExpression(selector)) {
    return `${selector}.${action}(${args});`;
  }

  return `cy.get(${wrapSelector(selector)}).${action}(${args});`;
};

// =====================================================
// Action Handlers
// =====================================================

const handlers = {
  viewport(block) {
    const width = block.match(/width:\s*(\d+)/)?.[1];
    const height = block.match(/height:\s*(\d+)/)?.[1];

    if (!width || !height) return null;

    return `// viewport recorded: ${width}x${height}
cy.viewport(${width}, ${height});`;
  },

  goto(block) {
    const url = block.match(/goto\((['"])(.*?)\1\)/)?.[2];
    if (!url) return null;

    return `cy.visit("${escapeForQuotes(url)}");`;
  },

  click(block) {
    const selectors = extractSelectorsFromRace(block);
    const selector = chooseBestSelector(selectors);

    if (!selector) {
      warn("Could not determine selector for click");
      return "// ⚠️ unable to determine selector";
    }

    const offsetX = block.match(/x:\s*([\d.]+)/)?.[1];
    const offsetY = block.match(/y:\s*([\d.]+)/)?.[1];

    if (offsetX && offsetY) {
      return buildCommand(selector, "click", `${offsetX}, ${offsetY}`);
    }

    return buildCommand(selector, "click");
  },

  fill(block) {
    const selectors = extractSelectorsFromRace(block);
    const selector = chooseBestSelector(selectors);

    if (!selector) {
      warn("Could not determine selector for fill");
      return "// ⚠️ unable to determine selector";
    }

    const text = block.match(/fill\((['"])(.*?)\1\)/)?.[2] ?? "";

    if (isCypressExpression(selector)) {
      return `${selector}.clear().type("${escapeForQuotes(text)}");`;
    }

    return `cy.get(${wrapSelector(selector)})
  .clear()
  .type("${escapeForQuotes(text)}");`;
  },
};

// =====================================================
// Block Detection
// =====================================================

/**
 * Extract Puppeteer action blocks safely
 */
const splitIntoBlocks = (code) =>
  code.match(/\{\s*const targetPage[\s\S]*?\n\s*\}/g) || [];

/**
 * Detect action type
 */
const detectAction = (block) => {
  if (block.includes("setViewport")) return "viewport";
  if (block.includes(".goto(")) return "goto";
  if (block.includes(".click(")) return "click";
  if (block.includes(".fill(")) return "fill";
  return null;
};

// =====================================================
// Main conversion
// =====================================================

const convert = (inputCode) => {
  const blocks = splitIntoBlocks(inputCode);
  const output = [];

  output.push(`describe("Recorded flow", () => {`);
  output.push(`  it("replays user actions", () => {`);

  for (const block of blocks) {
    const action = detectAction(block);
    if (!action) continue;

    const handler = handlers[action];
    if (!handler) continue;

    const result = handler(block);
    if (result) {
      output.push(`    ${result}`);
    }
  }

  output.push(`  });`);
  output.push(`});`);

  return output.join("\n");
};

// =====================================================
// CLI
// =====================================================

const file = process.argv[2];

if (!file) {
  console.error("Usage: node puppeteer-to-cypress.js input.js");
  process.exit(1);
}

if (!fs.existsSync(file)) {
  console.error("File not found:", file);
  process.exit(1);
}

const code = fs.readFileSync(file, "utf8");
const result = convert(code);

console.log(result);