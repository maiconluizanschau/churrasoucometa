import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Churras do Time',
  description: 'O site que prova que o cometa chega antes da picanha.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
