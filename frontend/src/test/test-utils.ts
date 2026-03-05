import 'fake-indexeddb/auto'
import '@testing-library/jest-dom';
import { afterEach, vi } from "vitest"
import { cleanup } from "@testing-library/react"
 
// // Official jsdom polyfill for matchMedia
if (!window.matchMedia) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
      addListener: vi.fn(), // legacy support
      removeListener: vi.fn(),
    })),
  })
}

afterEach(() => {
  cleanup();
});







// @ts-expect-error
global.IS_REACT_ACT_ENVIRONMENT = true