import type {Metadata} from "next";
import {Poppins} from "next/font/google";
import {Roboto} from "next/font/google";
import 'rsuite/dist/rsuite-no-reset.min.css';
import "../globals.css";
import {Header} from "@/fsd/widgets/header";
import {QueryProvider} from "@/fsd/core/providers/QueryProvider";
import ProtectedRoute from "@/fsd/core/providers/ProtectedRoute";
import {Sidebar} from "@/fsd/widgets/sidebar/ui/Sidebar";

const lora = Poppins({
  weight:['400','500','600','700','800','900'],
  subsets:['latin']
});
const roboto = Roboto({
  weight:['400','500','700','900'],
  subsets:['cyrillic']
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next core",
};

export default function RootLayout(
  {
    children,

  }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
    <body className={`${roboto.className} px-4 overflow-hidden`}>
    <ProtectedRoute>
      <QueryProvider>
        <Header/>
        <main className={'flex gap-8'}>
          <Sidebar/>
          {children}
        </main>
      </QueryProvider>
    </ProtectedRoute>
    </body>
    </html>
  );
}
