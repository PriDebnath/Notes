import { cn } from "@/lib/utils"


export const Separator = ({ className }: { className?: string }) => {
    return (
        <div className={cn("my-2 w-full h-px bg-primary", className)}   />
    )
}