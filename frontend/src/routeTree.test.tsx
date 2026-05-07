// // https://tanstack.com/router/latest/docs/how-to/test-file-based-routing
import { routeTree } from './routeTree.gen'
import { describe, it, expect } from 'vitest'
import { router } from './provider/tanstack-router.provider'
import { renderWithFileRoutes } from '@/test/file-route-utils';
import { NoteListPage } from "@/page/note/note-list/note-list.page"
import { act, screen, waitForElementToBeRemoved } from '@testing-library/react'

describe('Generated Route Tree', () => {
    it('should generate route tree from file structure', () => {
        // Test that route tree exists and has expected structure
        expect(routeTree).toBeDefined()
        expect(routeTree.children).toBeDefined()
    })

    it('should include all expected routes', () => {
        // Get all route paths from the generated tree
        const getAllRoutePaths = (tree: any, paths: string[] = []): string[] => {
            if (tree.path) {
                paths.push(tree.path)
            }
            if (tree.children) {
                tree.children.forEach((child: any) => {
                    getAllRoutePaths(child, paths)
                })
            }
            return paths
        }

        const routePaths = getAllRoutePaths(routeTree)
        console.log({ routePaths });

        // Test that expected routes are present
        expect(routePaths)?.toContain('/')
        expect(routePaths)?.toContain('new')
    })
})

describe('Individual Route Components', async () => {
    it('should test home route component', async () => {
        await router.navigate({ to: '/' })
        await renderWithFileRoutes(<NoteListPage />)
        const addButton = screen.getByTitle('new')
        expect(addButton).toBeInTheDocument()

        const loader = await screen.findByLabelText("loading-list")
        if (loader) {
            expect(await loader).toBeInTheDocument()
            await waitForElementToBeRemoved(loader, { timeout: 8000 })
        }

        const list = await screen.findByLabelText("list")
        expect(await list).toBeInTheDocument()
    })
})

