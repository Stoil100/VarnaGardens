import { ArticleForm } from "@/components/forms/article/article";

type ArticleUploadSectionProps = {
    t: (key: string) => string;
};

export default function ArticleUploadSection({ t }: ArticleUploadSectionProps) {
    return (
        <div className="rounded-xl border p-4 shadow-sm">
            <h3 className="mb-4 text-3xl font-semibold">
                {t("forms.article.upload")}
            </h3>
            <ArticleForm />
        </div>
    );
}
