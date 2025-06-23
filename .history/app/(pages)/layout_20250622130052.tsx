import Navbar from "@/components/Navbar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <html lang="en" className="bg-[#ece3ca]">
            <Navbar />
            <body

            >
                {children}

            </body>
        </html>

    );
}