import Link from 'next/link'
import styles from '../styles/header.module.css'

const Header = () => {
	return (
		<div className={styles.header}>
			<div className={styles.title}>
				<Link href="/">
					<h1>whimsyimages</h1>
				</Link>
				
			</div>
			<nav className={styles.nav}>
				<Link href="/#upload">Try it</Link>
				<Link href="/pricing">Pricing</Link>
				{/* <Link href="/about">How it works</Link> */}
			</nav>
		</div>
	)
}

export default Header