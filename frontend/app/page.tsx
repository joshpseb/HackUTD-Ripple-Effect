"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
    const [inputValue, setInputValue] = useState("")

    return (
        <main className="p-4 w-screen min-h-screen flex justify-center items-center gap-6">
            <div className="w-96 flex gap-6">
                <Input placeholder="Toyota" value={inputValue} onChange={(event) => {
                    setInputValue(event.target.value)
                }} />
                <Link href={`/dashboard/${inputValue}`} className={buttonVariants()}>Go</Link>
            </div>
        </main>
    );
}
