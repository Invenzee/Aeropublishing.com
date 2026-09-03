"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromoPopup from "@/components/PromoPopup";

const STANDALONE_LP_PREFIXES = ["/cookbook/lp", "/kids/lp", "/editing/lp"]; // matched lowercase

function isStandaloneLp(pathname: string | null) {
    const path = pathname?.toLowerCase() ?? "";
    return STANDALONE_LP_PREFIXES.some((prefix) => path.startsWith(prefix));
}

export default function SiteChrome({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    if (isStandaloneLp(pathname)) {
        return <>{children}</>;
    }

    return (
        <>
            <Header />
            {children}
            <Footer />
            <PromoPopup />
        </>
    );
}
