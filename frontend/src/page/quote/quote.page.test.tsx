import { describe, expect, it, test } from 'vitest';
import { QuotePage as Component } from './quote.page';
import { act, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
// import { renderWithProviders } from '@/test/test-utils';
import { createMemoryHistory } from '@tanstack/react-router';
import { router } from '@/provider/tanstack-router.provider';
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { renderWithFileRoutes } from '@/test/file-route-utils';

describe(Component.name, () => {

  it("renders quote page", async () => {

    await router.navigate({ to: '/new' })

    await renderWithFileRoutes(<Component mode="add" />)
    expect(await screen.findByLabelText("loading-editor")).toBeInTheDocument()

    act(async () => {
      /* finish loading suspended data */
      expect(await screen.findByLabelText("editor")).toBeInTheDocument()

    });
  })
});

