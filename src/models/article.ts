import { ArticlesSchemaType } from "@/components/schemas/article";
import { Timestamp } from "firebase/firestore";
interface Article extends ArticlesSchemaType{
    id:string;
    createdAt: Timestamp;
}

export type { Article };
