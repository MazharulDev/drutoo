import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/Providers";
import { SocketProvider } from "@/context/SocketContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Drutoo",
  description: "Trusted Online Banking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          <SocketProvider>{children}</SocketProvider>
        </Providers>
      </body>
    </html>
  );
}
