import { DM_Mono, DM_Sans, DM_Serif_Display } from 'next/font/google'

export const fontSans = DM_Sans({ variable: '--font-sans', subsets: ['latin'] })
export const fontMono = DM_Mono({ variable: '--font-mono', subsets: ['latin'], weight: ['300', '400', '500'] })
export const fontSerif = DM_Serif_Display({ variable: '--font-serif', subsets: ['latin'], weight: ['400'] })
