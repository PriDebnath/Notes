import { describe, expect, it, test } from 'vitest';
import { QuotePage as Component   } from './quote.page';
import { render, screen } from '@testing-library/react';
import {renderWithProviders } from '@/test/test-utils';
import { createMemoryHistory } from '@tanstack/react-router';
import { router } from '@/provider/tanstack-router.provider';
import { createRouter, RouterProvider } from "@tanstack/react-router";

describe(Component.name, () => {
it("renders quote page", async() => {

  // router.navigate({ to: '/new' })

  renderWithProviders(<Component mode="add" />)

  expect(await screen.findByRole("button")).toBeInTheDocument()

})


});