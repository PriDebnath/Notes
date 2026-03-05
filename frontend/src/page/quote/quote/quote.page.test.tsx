
import { QuotePage as Component } from './quote.page';
import { userEvent } from '@testing-library/user-event';
import { createMemoryHistory } from '@tanstack/react-router';
import { router } from '@/provider/tanstack-router.provider';
import { renderWithFileRoutes } from '@/test/file-route-utils';
import { beforeEach, describe, expect, it, test, vi } from 'vitest';
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { act, logDOM, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';

/// mock hook
import { useGetQuoteDetails } from '@/api-hook/use-get-quote-details.hook';
vi.mock("@/api-hook/use-get-quote-details.hook")
const mockUseGetQuoteDetails = vi.mocked(useGetQuoteDetails)

beforeEach(() => {

  ///reset mock value
  mockUseGetQuoteDetails.mockReturnValue({
    data: undefined,
    isLoading: false,
    error: undefined,
  })
})

describe(Component.name, () => {
  describe("rendering", () => {

    it("renders quote page: add mode", async () => {
      await router.navigate({ to: '/new' })
      await renderWithFileRoutes(<Component mode="add" />)
      const loader = await screen.queryByLabelText("loading-editor")
      if (loader) {
        expect(await loader).toBeInTheDocument()
        await waitForElementToBeRemoved(loader, { timeout: 8000 })
      }
      const editor = await screen.findByLabelText("editor")
      expect(await editor).toBeInTheDocument()
    })

    it("renders quote page: edit mode", async () => {
      const editorContent = "editor-content"
      const tagContent = "tag-content"
      mockUseGetQuoteDetails.mockReturnValue({
        data: {
          text: editorContent,
          id: 1,
          tags: [{ id: 1, name: tagContent }]
        },
        isLoading: false,
        error: undefined,
      })
      await router.navigate({ to: '/$quoteId', params: { quoteId: "1" } })
      await renderWithFileRoutes(<Component mode="edit" />)

      const loader =await screen.queryByLabelText("loading")

      if (loader) {
        expect(await loader).toBeInTheDocument()
        await waitForElementToBeRemoved(loader, { timeout: 8000 })
      }

      const editor = await screen.findByLabelText("editor")
      const tagList = await screen.findByLabelText("tag-list")
      await expect(await editor).toBeInTheDocument()
      await expect(await tagList).toBeInTheDocument()
      // logDOM(tagList)
      await expect(await screen.findByText(editorContent)).toBeInTheDocument()
      await expect(await screen.findByLabelText(tagContent)).toBeInTheDocument()

    })

    it("shows loading indicator when fetching quote", async () => {
      mockUseGetQuoteDetails.mockReturnValue({
        data: undefined,
        isLoading: true,
        error: undefined,
      })

      await router.navigate({ to: '/$quoteId', params: { quoteId: "1" } })
      await renderWithFileRoutes(<Component mode="edit" />)

      expect(await screen.findByLabelText("loading")).toBeInTheDocument()
    })

    it("should show error", async () => {
      const somethingBad = "bugs took over the entire tech world"
      mockUseGetQuoteDetails.mockReturnValue({
        data: undefined,
        isLoading: false,
        error: somethingBad
      })

      router.navigate({ to: "/$quoteId", params: { quoteId: "1" } })
      renderWithFileRoutes(<Component mode='edit' />)

      const errorElement = await screen.findByLabelText("error")
      expect(errorElement).toBeInTheDocument()

      const badElement = await screen.findByText(somethingBad, { exact: false })
      await expect(badElement).toBeInTheDocument()
    })



  })

  describe("interaction", () => {

    it("adds tag when chosen", async () => {
      await router.navigate({ to: '/new' })
      await renderWithFileRoutes(<Component mode="add" />)

      const loader = screen.queryByLabelText("loading-editor")
      if (loader) {
        expect(await loader).toBeInTheDocument()
        await waitForElementToBeRemoved(loader, { timeout: 8000 })
      }

      const editor = await screen.findByLabelText("editor")
      expect(await editor).toBeInTheDocument()

      const addTag = screen.queryByLabelText("add-tag")
      expect(await addTag).toBeInTheDocument()
      await userEvent.click(addTag!)

      const tags = screen.queryByLabelText("tags")
      expect(await tags).toBeInTheDocument()

      const tagGroup = screen.getByText("relationship", { exact: false })
      expect(await tagGroup).toBeInTheDocument()
      await userEvent.click(tagGroup!)
      // logDOM(tagGroup!)

      const tag = screen.getByText("kindness", { exact: false })
      expect(await tag).toBeInTheDocument()
      // logDOM(tag!)
    })

  })

});

