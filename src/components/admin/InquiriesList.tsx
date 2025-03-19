"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import type { Inquiry } from "@/models/inquiry";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase.config";
import InquiryCard from "./InquiryCard";

type InquiriesListProps = {
    setIsLoading: (loading: boolean) => void;
    t: (args: string) => string;
};

export default function InquiriesList({ setIsLoading, t }: InquiriesListProps) {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const fetchInquiries = async () => {
        setIsLoading(true);
        try {
            const inquiriesRef = collection(db, "inquiries");
            const q = query(inquiriesRef, orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);

            const inquiriesData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Inquiry[];

            setInquiries(inquiriesData);
        } catch (error) {
            console.error("Error fetching inquiries:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchInquiries();
    }, [refreshTrigger]);

    const handleInquiryDeleted = () => {
        setRefreshTrigger((prev) => prev + 1);
    };

    return (
        <ScrollArea className="max-h-screen">
            <div className="space-y-4 p-4">
                <h2 className="text-3xl font-semibold">{t("title")}</h2>
                {inquiries.length === 0 ? (
                    <p className="text-muted-foreground">{t("notFound")}</p>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {inquiries.map((inquiry) => (
                            <InquiryCard
                                key={inquiry.id}
                                inquiry={inquiry}
                                t={t}
                                onInquiryDeleted={handleInquiryDeleted}
                            />
                        ))}
                    </div>
                )}
            </div>
        </ScrollArea>
    );
}
