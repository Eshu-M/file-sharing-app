import { Inter,Outfit } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '/components/theme.jsx'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Outfit({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
    </ClerkProvider >
  )
}
