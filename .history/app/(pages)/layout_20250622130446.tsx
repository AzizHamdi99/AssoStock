import Navbar from '@/components/Navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-[#ece3ca]">
                <Navbar />
                {children}
            </body>
        </html>
    );
}
