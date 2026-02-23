// https://tanstack.com/router/latest/docs/how-to/test-file-based-routing
import { routeTree } from './routeTree.gen'
import { describe, it, expect } from 'vitest'
import { act, screen } from '@testing-library/react'
import { QuoteListPage } from "@/page/quote/quote-list.page"
import { router } from './provider/tanstack-router.provider'
import { renderWithFileRoutes } from '@/test/file-route-utils';

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
        await renderWithFileRoutes(<QuoteListPage />)
        expect(await screen.getByTitle('new')).toBeInTheDocument()
        expect(await screen.findByLabelText("loading-list")).toBeInTheDocument()

        act(async () => {
            //   /* finish loading suspended data */
            expect(await screen.findByLabelText("list")).toBeInTheDocument()
        });
    })
})

