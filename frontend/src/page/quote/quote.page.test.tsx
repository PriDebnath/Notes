import { describe, expect, it, test } from 'vitest';
import { QuotePage as Component } from './quote.page';
import { act, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
// import { renderWithProviders } from '@/test/test-utils';
import { createMemoryHistory } from '@tanstack/react-router';
import { router } from '@/provider/tanstack-router.provider';
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { renderWithFileRoutes } from '@/test/file-route-utils';

describe(Component.name, () => {
  describe("rendering", () => {
    it("renders quote page: add mode", async () => {
      await router.navigate({ to: '/new' })
      await renderWithFileRoutes(<Component mode="add" />)
      const loader = screen.queryByLabelText("loading-editor")
      if (loader) {
        expect(await loader).toBeInTheDocument()
        await waitForElementToBeRemoved(loader, { timeout: 8000 })
      }
      const editor = screen.findByLabelText("editor")
      expect(await editor).toBeInTheDocument()
    })
    it("renders quote page: add mode", async () => {
      await router.navigate({ to: '/new' })
      await renderWithFileRoutes(<Component mode="add" />)
      const loader = screen.queryByLabelText("loading-editor")
      if (loader) {
        expect(await loader).toBeInTheDocument()
        await waitForElementToBeRemoved(loader, { timeout: 8000 })
      }
      const editor = screen.findByLabelText("editor")
      expect(await editor).toBeInTheDocument()
    })
    // it("renders quote page: edit mode", async () => {
    //   await router.navigate({ to: '/$quoteId', params: { quoteId: '1'} })
    //   await renderWithFileRoutes(<Component mode="edit" />)
    //   const loader = screen.queryByLabelText("loading")
    //   if (loader) {
    //     expect(await loader).toBeInTheDocument() 
    //     await waitForElementToBeRemoved(loader, { timeout: 8000 })
    //   }
    //   const editor = screen.findByLabelText("editor")
    //   expect(await editor).toBeInTheDocument()
    // })
  })


});

