type ArticleT = {
    id?: string;
    date: string;
    heroImage?: string;
    title: string;
    titleDescriptions?: { id: number; value: string }[];
    descriptions?: { id: number; value: string }[];
    lists?: {
        title?: string;
        items: { id: number; value: string }[];
    }[];
    docs?: {
        title: string;
        images?: { id: number; value: string }[];
        texts?: (
            | { id: number; value: string}
            | {
                  title?: string;
                  listItems: { id: number; value: string }[];
              }
        )[];
    }[];
    type: "standard" | "notable" | "important";
};

export type { ArticleT };
