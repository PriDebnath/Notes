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

interface Props {
    onChoose: (tag: string) => void
}

export function ChooseTagDropdown(props: Props) {
    const { onChoose } = props

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
            <DropdownMenuContent className="w-56 m-0 p-0 " align="start">
                <div className="sticky top-0 z-10 backdrop-blur-sm">
                    <DropdownMenuLabel className=" ">Tags</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                </div>

                <DropdownMenuGroup>
                    {
                        Object.entries(CATEGORY_TAGS).map(([category, tags]) => (
                            <DropdownMenuSub key={category}>
                                <DropdownMenuSubTrigger>{category}</DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        {tags.map((tag) => {
                                            return (
                                                <DropdownMenuItem
                                                    key={tag}
                                                    onClick={() => onChoose(tag)}
                                                >
                                                    # {tag}
                                                </DropdownMenuItem>
                                            )
                                        })}
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                        ))
                    }
                    {
                        FREE_TAGS.map((tag) => (
                            <DropdownMenuItem
                                key={tag}
                                onClick={() => onChoose(tag)}
                                className="flex align-center"
                            >
                                # {tag} 
                            </DropdownMenuItem>
                        ))
                    }
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
