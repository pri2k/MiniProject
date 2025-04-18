import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"


export const metadata: Metadata = {
    title: "Brighter Beyond",
    description: "A supportive platform designed to provide guidance, resources, and a sense of community for those facing depression. Together, we can navigate through tough times and find hope for a brighter future.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={"antialiased flex flex-col min-h-screen"}
            >
                <UserProvider>
                    <Navbar/>
                    <main className="flex-grow">
                        {children}
                    </main>
                    <Footer/>
                </UserProvider>
            </body>
        </html>
    );
}
