import type { TextureKey, Pri_set } from "@/feature/quote/hook/use-background.hook";

// DB DATA MODELS

export interface Quote {
    _id?: string | undefined; // cloud id
    id?: number | undefined;
    text: string;
    texture?: TextureKey;
    pri_set?: Pri_set;
    created_at?: Date;
    updated_at?: Date;
    pinned?: boolean;
    synced?: boolean;
    deleted?: boolean;
}

export interface Tag {
    id?: number | undefined;
    name: string;
}

export interface QuoteTags {
    id?: number | undefined;
    quoteId: number;
    tagId: number;
}


// EXTRA DATA MODELS

export interface QuoteFormData {
    id?: number | undefined;
    text?: string;
    tags?: string[];
    texture?: TextureKey;
    pri_set?: Pri_set;
}

export interface QuoteDetails extends Quote {
    tags?: Tag[]
}




export type SortOption = "created_at" | "updated_at" | "tags"

export type CardView = "list" | "grid"

export type Status = "idle" | "pending" | "success"

export type ContentChatMessage = {
    role: "user" | "assistant";
    content: string;
}

export type GetAllQuotesDetailsParam = {
    sortBy?: SortOption,
    include?: 'all' | 'deleted'| 'non-deleted',
}