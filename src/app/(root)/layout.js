import localFont from "next/font/local";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import PrimaryNavbar from "@/components/shared/PrimaryNavbar";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Contact Pro",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-96 mx-auto`}
      >
        <main className="bg-colorBg px-4 min-h-screen">
          <header>
            <PrimaryNavbar />
          </header>

          {children}

        </main>

        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </body>
    </html>
  );
}
