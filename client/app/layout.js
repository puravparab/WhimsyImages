import './globals.css'

import { VercelAnalytics } from '../components/analytics/va.js';
import { GTag } from '../components/analytics/gtag.js';

import Header from '../components/header.js'

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Whimsy Images',
	description: 'Upload your image and generate a stylized image. Reimagine your images in the style of studio ghibli, 8-bit, etc.',
	other: {
		"google-site-verification": "-bbeXHZvZm4OaCASz8xD2sFDEQNKh-l0uE7M7mLR-v8"
	}
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<GTag />
			<body className={inter.className}>
				<Header />
				{children}
				{/* <Footer /> */}
				<VercelAnalytics />
			</body>
		</html>
	)
}