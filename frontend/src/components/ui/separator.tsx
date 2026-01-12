import { cn } from "@/lib/utils"


export const Separator = ({ className }: { className?: string }) => {
    return (
        <div className={cn("w-full h-px bg-gray-200", className)}   />
    )
}