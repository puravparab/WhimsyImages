import './globals.css'

import { VercelAnalytics } from '../components/analytics/va.js';
import { GTag } from '../components/analytics/gtag.js';

import Header from '../components/header.js'

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Create my avatar',
	description: 'Upload your image and generate a stylized image',
	// other: {
	//   "google-site-verification": "-bbeXHZvZm4OaCASz8xD2sFDEQNKh-l0uE7M7mLR-v8"
	// }
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			{/* <GTag /> */}
			<body className={inter.className}>
				<Header />
				{children}
				{/* <Footer /> */}
				{/* <VercelAnalytics /> */}
			</body>
		</html>
	)
}