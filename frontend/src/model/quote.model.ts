export interface Quote{
    id?: number | undefined;
    text: string;
}

export interface QuoteDetails{
    id?: number | undefined;
    text: string;
    tags?: Tag[]
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


export interface QuoteFormData{
  id?: number | undefined;
  text?: string;
  tags?: string[];
}