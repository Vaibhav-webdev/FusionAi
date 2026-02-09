import { Toaster } from "sonner"
import "./globals.css"
import SessionProviderWrapper from "./components/SessionProviderWrapper"
import Providers from "./providers"
import localFont from "next/font/local";

const inter = localFont({
  src: [
    {
      path: "../../public/fonts/Inter-VariableFont_opsz,wght.ttf",
      style: "normal",
    },
    {
      path: "../../public/fonts/Inter-Italic-VariableFont_opsz,wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Ai That Works for Your - FusionAi",
  description: "This is a fusionAi where you can genrate content for social media.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SessionProviderWrapper>
          <Providers>
              {children}
              <Toaster
              position="top-center"/>
          </Providers>
        </SessionProviderWrapper>
      </body>
    </html>
  )
}
