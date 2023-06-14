import { title } from "process"
import 'tailwindcss/tailwind.css';
import styles from '../app/home.module.css'

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>My Roommate</title>
      </head>
      <body className="overflow-y-hidden">
        {children}</body >
    </html>
  )
}
