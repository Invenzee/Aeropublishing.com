"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { initTracking, recordPageView } from "@/lib/tracking";

export default function TrackingProvider() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        initTracking();
    }, []);

    useEffect(() => {
        const query = searchParams.toString();
        recordPageView(query ? `${pathname}?${query}` : pathname);
    }, [pathname, searchParams]);

    return null;
}
