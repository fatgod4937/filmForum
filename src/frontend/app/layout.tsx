import Navbar from "./components/Navbar/Navbar";
import "./globals.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <Navbar />
            <body>{children}</body>
        </html>
    );
}
