import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
	return (
		<main className={styles.main}>
			<div className={styles.mainTitle}>
				<h2>Reimagine your images</h2>
				<p>Powered by gpt4 and dalle-3</p>
			</div>

			<div className={styles.mainExample}>
				<div className={styles.imageContainer}>
					<img 
						src="/images/tswift.jpg" 
						width={790}
						height={699}
					/>
				</div>
				<div className={styles.exampleTransition}>
					{/* <span>Reimagine</span> */}
					<Image
						src="/icons/white_arrow.svg"
						width={200}
						height={200}
					/>
					<span>In the style of</span>
					<span>"Studio Ghibli"</span>
				</div>

				<div className={styles.imageContainer}>
					<img 
						src="/images/tswift_ghibli2.png" 
						width={800}
						height={800}
					/>
				</div>
			</div>

			<div className={styles.mainExample}>
				<div className={styles.imageContainer}>
					<img 
						src="/images/mj.jpg" 
						width={790}
						height={699}
					/>
				</div>
				<div className={styles.exampleTransition}>
					{/* <span>Reimagine</span> */}
					<Image
						src="/icons/white_arrow.svg"
						width={200}
						height={200}
					/>
					<span>In the style of</span>
					<span>"8-bit"</span>
				</div>

				<div className={styles.imageContainer}>
					<img 
						src="/images/mj_8bit.png" 
						width={800}
						height={800}
					/>
				</div>
			</div>
			
		</main>
	)
}
