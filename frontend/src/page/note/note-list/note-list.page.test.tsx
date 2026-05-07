import { NoteListPage as Component } from "@/page/note/note-list/note-list.page"
import { userEvent } from "@testing-library/user-event"
import { router } from "@/provider/tanstack-router.provider"
import { renderWithFileRoutes } from "@/test/file-route-utils"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { logDOM, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react"

// hooks
import { useGetAllNoteDetails } from "@/feature/note-list/hook/use-get-all-note-details.hook"

// db actions
import { deleteNoteWithLinks } from "@/db/note_tags.db"
import { toggleNotePinned } from "@/db/note.db"

// store
import { useSortStore } from "@/store/use-sort.store"
import type { NoteDetails } from "@/model/index.model"

vi.mock("@/api-hook/use-get-all-note-details.hook")
const mockUseGetAllNoteDetails = vi.mocked(useGetAllNoteDetails)
type GetAllNotesReturn = ReturnType<typeof useGetAllNoteDetails>

vi.mock('@/db/quote_tags.db')
const mockDeleteNoteWithLinks = vi.mocked(deleteNoteWithLinks)

beforeEach(() => {
  ///reset mock value
  mockUseGetAllNoteDetails.mockReturnValue({
    data: undefined,
    isLoading: false,
    error: undefined,
    refetch: vi.fn()
  })
})
 
describe(Component.name, () => {
  describe("rendering", () => {
    it("renders page with header and search", async () => {
      await router.navigate({ to: "/" })
      await renderWithFileRoutes(<Component />)
      const loader = await screen.queryByLabelText("loading-list")
      if (loader) {
        expect(await loader).toBeInTheDocument()
        await waitForElementToBeRemoved(loader, { timeout: 8000 })
      }

      const list = await screen.queryByLabelText("list")
      expect(await list).toBeInTheDocument()

      expect(await screen?.findByLabelText("sticky-header")).toBeInTheDocument()
      expect(await screen?.findByLabelText("search-note")).toBeInTheDocument()
      expect(await screen?.findByLabelText("search-icon")).toBeInTheDocument()
      expect(await screen?.findByLabelText("settings-button")).toBeInTheDocument()
    })

    it("renders loading list", async () => {
      mockUseGetAllNoteDetails.mockReturnValue({
        data: undefined,
        isLoading: true,
        error: undefined,
        refetch: vi.fn(),
      }  )

      await router.navigate({ to: "/" })
      await renderWithFileRoutes(<Component />)

      const loaderList = await screen.queryByLabelText("loading-list")
      if (loaderList) {
        expect(await loaderList).toBeInTheDocument()
        await waitForElementToBeRemoved(loaderList, { timeout: 8000 })
      }

      const loader = await screen.queryByLabelText("loading")
      expect(await loader).toBeInTheDocument()
      logDOM(loader!)
    })

    it("renders notes when data exists", async () => {
      const testContent = "test note" 
      mockUseGetAllNoteDetails.mockReturnValue({
        data: [
          {
            id: 1,
            text: testContent,
            pinned: false,
            tags: [{ id: 1, name: "life" }],
          },
        ],
        isLoading: false,
        error: undefined,
        refetch: vi.fn(),
      }  )

      await router.navigate({ to: "/" })
      await renderWithFileRoutes(<Component />)

         const loaderList = await screen.queryByLabelText("loading-list")
      if (loaderList) {
        expect(await loaderList).toBeInTheDocument()
        await waitForElementToBeRemoved(loaderList, { timeout: 8000 })
      }

      expect(await screen.findByText(testContent)).toBeInTheDocument()
    })

    it("shows error state", async () => {
      const errorMessage = "something went wrong"

      mockUseGetAllNoteDetails.mockReturnValue({
        data: undefined,
        isLoading: false,
        error: errorMessage,
        refetch: vi.fn(),
      }  )

      await router.navigate({ to: "/" })
      await renderWithFileRoutes(<Component />)
    const loaderList = await screen.queryByLabelText("loading-list")
      if (loaderList) {
        expect(await loaderList).toBeInTheDocument()
        await waitForElementToBeRemoved(loaderList, { timeout: 8000 })
      }
      expect(await screen.findByText(errorMessage, {exact: false})).toBeInTheDocument()
    })

    it("renders add new button with navigation link", async () => {
      await router.navigate({ to: "/" })
      await renderWithFileRoutes(<Component />)

      expect(await screen.findByLabelText("add-new-note-link")).toBeInTheDocument()
    })
  })

  describe("search filtering", () => {
    it("filters notes by search text", async () => {
      mockUseGetAllNoteDetails.mockReturnValue({
        data: [
          { id: 1, text: "hello world", tags: [] },
          { id: 2, text: "goodbye world", tags: [] },
        ],
        isLoading: false,
        error: undefined,
        refetch: vi.fn(),
      }  )

      await router.navigate({ to: "/" })
      await renderWithFileRoutes(<Component />)

      const searchInput = await screen.findByLabelText("search-note")
      await userEvent.type(searchInput, "hello")

      await waitFor(() => {
        expect(screen.getByText("hello world")).toBeInTheDocument()
        expect(screen.queryByText("goodbye world")).not.toBeInTheDocument()
      })
    })
  })

  describe("tag filtering", () => {
    it("filters notes by tag", async () => {
      const mockedData = {
        data: [
          {
            id: 1,
            text: "note one",
            tags: [{ id: 1, name: "life" }],
          },
          {
            id: 2,
            text: "note two",
            tags: [{ id: 2, name: "love" }],
          },
        ],
        isLoading: false,
        error: undefined,
        refetch: vi.fn(),
      }
      mockUseGetAllNoteDetails.mockReturnValue(mockedData)

      await router.navigate({ to: "/" })
      await renderWithFileRoutes(<Component />)
      const loaderList = await screen.queryByLabelText("loading-list")
      if (loaderList) {
        expect(await loaderList).toBeInTheDocument()
        await waitForElementToBeRemoved(loaderList, { timeout: 8000 })
      }

      const firstText = screen.queryByText(mockedData.data[0].text)
      const secondText = screen.queryByText(mockedData.data[1].text)

      await expect(firstText).toBeInTheDocument()
      await expect(secondText).toBeInTheDocument()

      const openFilter = await screen.queryByLabelText("open-filter")
      expect(await openFilter).toBeInTheDocument()
      await userEvent.click(openFilter!, {})

      const tagBox = await screen.queryByLabelText("filter-by")
      expect(await tagBox).toBeInTheDocument()

      const tagButton = await screen.queryByLabelText(
        "filter-by-" + mockedData.data[0].tags[0].name
      )
      await userEvent.click(tagButton!)
      const list = await screen.queryByLabelText("list")

      expect(firstText).toBeInTheDocument()
      expect(secondText).not.toBeInTheDocument()
    })
  })

  describe("interaction", () => {
    it("opens delete dialog and deletes note", async () => {
      const firstItem = { id: 1, text: "delete me", tags: [{ id: 1, name: "life" }] }
      const mockedData: GetAllNotesReturn = {
        data: [firstItem],
        isLoading: false,
        error: undefined,
        // refetch: vi.fn()
        refetch: vi.fn(async () => {
          mockedData.data = []
          return {} as Awaited<ReturnType<GetAllNotesReturn["refetch"]>>
        })
      }
      mockUseGetAllNoteDetails.mockReturnValue(mockedData)

      await router.navigate({ to: "/" })
      await renderWithFileRoutes(<Component />)
      const loaderList = await screen.queryByLabelText("loading-list")
      if (loaderList) {
        expect(await loaderList).toBeInTheDocument()
        await waitForElementToBeRemoved(loaderList, { timeout: 8000 })
      }

      const list = await screen.queryByLabelText("list")
      const firstText = screen.queryByText(mockedData?.data?.[0]?.text!)
      await expect(firstText).toBeInTheDocument()

      const deleteBtn = await screen.findByLabelText("delete-" + firstItem.id)
      await userEvent.click(deleteBtn)
      // logDOM(deleteBtn!)

      const deletePopup = await screen.findByLabelText("delete")
      await expect(deletePopup).toBeInTheDocument()
 
      await userEvent.click(deletePopup, {})
     
      await expect(mockDeleteNoteWithLinks).toHaveBeenCalledWith(firstItem.id)
      await expect(mockedData.refetch).toHaveBeenCalled()

      await expect(deletePopup).not.toBeInTheDocument()
      await expect(firstText).not.toBeInTheDocument()
    })

   
  })
})