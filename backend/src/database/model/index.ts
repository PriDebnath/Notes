import { quotes } from "@/src/module/quote/model";
// import { users } from "@/src/module/user/model";

export const table = {
	quotes,
    // users,
} as const

export type Table = typeof table

export { quotes }  // drizzle look at it to maintain migration