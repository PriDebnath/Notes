
import { createFileRoute } from "@tanstack/react-router";
import MePage from "@/page/user/me/me.page"

export const Route =  createFileRoute("/me",)({
    component: MePage
})