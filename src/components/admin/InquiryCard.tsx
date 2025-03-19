"use client";

import LoadingOverlay from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Inquiry } from "@/models/inquiry";
import { deleteDoc, doc } from "firebase/firestore";
import {
    Calendar,
    Mail,
    MessageSquare,
    Phone,
    Trash2,
    User,
} from "lucide-react";
import { useState } from "react";
import { db } from "../../../firebase/firebase.config";

type InquiryCardProps = {
    inquiry: Inquiry;
    t: (args: string) => string;
    onInquiryDeleted: () => void;
};

export default function InquiryCard({
    inquiry,
    t,
    onInquiryDeleted,
}: InquiryCardProps) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            // Fixed typo in collection name from "coontacts" to "contacts"
            const inquiryRef = doc(db, "inquiries", inquiry.id);
            await deleteDoc(inquiryRef);
            console.log(`Inquiry with ID ${inquiry.id} deleted successfully.`);
            onInquiryDeleted();
        } catch (error) {
            console.error("Error deleting inquiry: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="overflow-hidden transition-all hover:shadow-md">
            {loading && <LoadingOverlay />}
            <CardHeader className="bg-primary/5 pb-2">
                <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                    <User className="h-5 w-5 text-primary" />
                    {t("name")} {inquiry.name}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
                <div className="flex items-start gap-2">
                    <Mail className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">
                            {t("email")}
                        </p>
                        <p className="text-sm">{inquiry.email}</p>
                    </div>
                </div>

                <div className="flex items-start gap-2">
                    <Phone className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">
                            {t("phone")}
                        </p>
                        <p className="text-sm">{inquiry.phone}</p>
                    </div>
                </div>

                <div className="flex items-start gap-2">
                    <MessageSquare className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">
                            {t("message")}
                        </p>
                        <p className="break-words text-sm">{inquiry.message}</p>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="justify-between border-t bg-muted/20 pt-2">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <time
                        dateTime={new Date(
                            inquiry.createdAt.seconds * 1000,
                        ).toISOString()}
                    >
                        {new Date(
                            inquiry.createdAt.seconds * 1000,
                        ).toLocaleString()}
                    </time>
                </div>
                <Button
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleDelete}
                    aria-label={t("delete")}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </CardFooter>
        </Card>
    );
}
