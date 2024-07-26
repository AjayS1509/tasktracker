import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Header from "@/components/ui/Header";
import { AppProvider } from "@/components/AppContext";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://task-management-system-alpha.vercel.app'),
  title: "Task Management System",
  description:
    "A task management system is a web application designed to help users organize and track tasks efficiently. Users can add tasks along with titles, descriptions, and status indicators, enabling them to prioritize, manage progress, and keep track of task completion.",
  keywords: [
    "Resume",
    "Front-End Developer Resume",
    "Web Developer Resume",
    "Ajay Soni Resume",
    "Next.js",
    "React",
    "JavaScript",
    "Task Management System",
    "Organize Tasks",
    "Track Tasks",
    "Task Titles",
    "Task Descriptions",
    "Status Indicators",
    "Task Prioritization",
    "Task Progress",
    "Task Completion",
    "Efficient Task Tracking",
    "Task Organization",
    "Task Management Web App",
    "User Task Tracking",
    "Task Management Tools",
    "Productivity App",
    "Task Monitoring",
    "Task Workflow",
    "Manage Tasks Online",
    "Task Tracking Software",
    "Task Planner"
  ],
  authors: [{ name: "Ajay Soni" }],
  openGraph: {
    title: "Task Management System",
    description:
      "A task management system is a web application designed to help users organize and track tasks efficiently. Users can add tasks with titles, descriptions, and status indicators, enabling them to prioritize, manage progress, and track completion. The system includes Google login managed by NextAuth and uses MongoDB Cloud for data storage.",
    images: [
      {
        url: "./task.png",
        alt: "Task management System Photo",
      },
    ],
    url: "https://task-management-system-alpha.vercel.app",
    siteName: "Task",
    locale: "en-us"
  },
  icons:{
    icon:'./task.ico',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-custom-gradient-2 `}>
      <main className="flex min-h-screen flex-col items-center justify-between pt-4 pb-0 lg:px-24 lg:max-w-screen-xl mx-auto">
        <AppProvider>
        <Toaster />
        <Header />
        {children}
        <Footer />
        </AppProvider>
        </main>
      </body>
    </html>
  );
}
