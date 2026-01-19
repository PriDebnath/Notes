import type { TextureKey, Pri_set } from "@/hook/use-background.hook";

export interface Quote {
    id?: number | undefined;
    text: string;
    texture?: TextureKey;
    pri_set?: Pri_set;
    created_at?: Date;
    updated_at?: Date;
}

export interface QuoteDetails {
    id?: number | undefined;
    text: string;
    texture?: TextureKey;
    pri_set?: Pri_set;
    tags?: Tag[]
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


export interface QuoteFormData {
    id?: number | undefined;
    text?: string;
    tags?: string[];
    texture?: TextureKey;
    pri_set?: Pri_set;
}