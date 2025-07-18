"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { handleNavigate } from "./util/functions";

export default function Home() {
    const router = useRouter();
    useEffect(() => {
        handleNavigate(router, "movies");
    });
    return <>:/</>;
}
