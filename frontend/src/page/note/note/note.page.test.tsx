
import { NotePage as Component } from '@/page/note/note/note.page';
import { userEvent } from '@testing-library/user-event';
import { createMemoryHistory } from '@tanstack/react-router';
import { router } from '@/provider/tanstack-router.provider';
import { renderWithFileRoutes } from '@/test/file-route-utils';
import { beforeEach, describe, expect, it, test, vi } from 'vitest';
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { act, logDOM, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { useGetNoteDetails } from '@/feature/note/hook/use-get-note-details.hook';

/// mock hook
vi.mock("@/api-hook/use-get-note-details.hook")
const mockUseGetNoteDetails = vi.mocked(useGetNoteDetails)

beforeEach(() => {

  ///reset mock value
  mockUseGetNoteDetails.mockReturnValue({
    data: undefined,
    isLoading: false,
    error: undefined,
  })
})

describe(Component.name, () => {
  describe("rendering", () => {

    it("renders note page: add mode", async () => {
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

    it("renders note page: edit mode", async () => {
      const editorContent = "editor-content"
      const tagContent = "tag-content"
      mockUseGetNoteDetails.mockReturnValue({
        data: {
          text: editorContent,
          id: 1,
          tags: [{ id: 1, name: tagContent }]
        },
        isLoading: false,
        error: undefined,
      })
      await router.navigate({ to: '/$noteId', params: { noteId: "1" } })
      await renderWithFileRoutes(<Component mode="edit" />)

      const loader = await screen.queryByLabelText("loading")

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

    it("shows loading indicator when fetching note", async () => {
      mockUseGetNoteDetails.mockReturnValue({
        data: undefined,
        isLoading: true,
        error: undefined,
      })

      await router.navigate({ to: '/$noteId', params: { noteId: "1" } })
      await renderWithFileRoutes(<Component mode="edit" />)

      expect(await screen.findByLabelText("loading")).toBeInTheDocument()
    })

    it("should show error", async () => {
      const somethingBad = "bugs took over the entire tech world"
      mockUseGetNoteDetails.mockReturnValue({
        data: undefined,
        isLoading: false,
        error: somethingBad
      })

      router.navigate({ to: "/$noteId", params: { noteId: "1" } })
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

      const tagList = screen.queryByLabelText("tag-list")
      expect(await tagList).toBeInTheDocument()

      const tagField =  screen.queryByLabelText("tag-field")
      expect(await tagField).toBeInTheDocument()
    
      const chooseTag = screen.queryByLabelText("choose-tag")
      expect(await chooseTag).toBeInTheDocument()
      await userEvent.click(chooseTag!)

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

