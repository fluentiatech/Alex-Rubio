import type { Metadata } from 'next'
import { Bebas_Neue, Outfit, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Álex Rubio — Delantero',
  description: 'Perfil del delantero Álex Rubio, jugador del Albacete BP en Segunda División.',
  openGraph: {
    title: 'Álex Rubio — Delantero',
    description: '71 goles. Velocidad como argumento.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${bebasNeue.variable} ${outfit.variable} ${jetbrainsMono.variable} grain`}>
      <body>{children}</body>
    </html>
  )
}
