import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Management System",
  description:
    "A task management system is a web application designed to help users organize and track tasks efficiently. Users can add tasks along with titles, descriptions, and status indicators, enabling them to prioritize, manage progress, and keep track of task completion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-custom-gradient-2 `}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
