export interface Quote{
    id?: number | undefined;
    text: string;
    // author?: string;
    // book?: string;
    // tags?: string[];
}


export interface Tag{
    id?: number | undefined;
    name: string;
}

export interface QuoteTags{
    id?: number | undefined;
    quoteId: number;
    tagId: number;
}