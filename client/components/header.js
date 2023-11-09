import Link from 'next/link'
import styles from '../styles/header.module.css'

const Header = () => {
	return (
		<div className={styles.header}>
			<div className={styles.title}>
				<h1>Createmyavatar</h1>
			</div>
			<nav className={styles.nav}>
				<Link href="/pricing">Pricing</Link>
				<Link href="/about">How it works</Link>
			</nav>
		</div>
	)
}

export default Header