

import { notes } from "../../module/note/model";
// import { users } from "@/src/module/user/model";

export const table = {
	notes,
    // users,
} as const

export type Table = typeof table

export { 
    notes, 
    // users 
// 
}  // drizzle look at it to maintain migration