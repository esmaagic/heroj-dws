
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import TopNav from '../components/TopNav'
import BottomNav from '../components/BottomNav'
 

const inter = Inter({ subsets: ["latin"] });

 export const metadata: Metadata = {
  title: "Heroj",
  description: "Generated by create next app",
};
 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return (
    <html lang="en">
      <ThemeProvider theme = {theme}>
        
         
        <body className={inter.className}><TopNav/>{children} <BottomNav/></body>
        
       
      </ThemeProvider>
    </html>
  );
}
