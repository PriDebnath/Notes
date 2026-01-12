import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ChooseTagDropdown() {
    const CATEGORY_TAGS = {
        emotion: [
            "happiness",
            "sadness",
            "love",
            "anger",
            "fear",
            "peace",
            "confidence",
        ],
        life: [
            "life",
            "success",
            "failure",
            "growth",
            "discipline",
            "mindset",
            "patience",
        ],
        work: [
            "work",
            "focus",
            "goals",
            "learning",
            "leadership",
            "consistency",
        ],
        relationship: [
            "friendship",
            "family",
            "trust",
            "respect",
            "kindness",
        ],
        philosophy: [
            "wisdom",
            "stoicism",
            "mindfulness",
            "truth",
            "ethics",
        ],
    }

    const FREE_TAGS = [
        "deep",
        "powerful",
        "simple",
        "short",
        "long",
        "relatable",
        "classic",
        "favorite",
        "daily",
        "inspiring",
        "real",
        "bold",
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                >
                    <PlusIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56  " align="start">
                <DropdownMenuLabel className="sticky top-0 backdrop-blur-sm   z-10">Tags</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {
                        Object.entries(CATEGORY_TAGS).map(([category, tags]) => (
                            <DropdownMenuSub key={category}>
                                <DropdownMenuSubTrigger>{category}</DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        {tags.map((tag) => (
                                            <DropdownMenuItem key={tag}>{tag}</DropdownMenuItem>
                                        ))}
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                        ))
                    }
                    {
                        FREE_TAGS.map((tag) => (
                            <DropdownMenuItem key={tag}>
                                {tag}
                            </DropdownMenuItem>
                        ))
                    }
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
