import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
	return (
		<main className={styles.main}>
			<div className={styles.mainTitle}>
				<h2>Create stylized versions of your images</h2>
				<p>Powered by gpt4</p>
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
					<span>Transform</span>

					<ol>
					<l1>Style: 8bit</l1>
					<l1>Ethnicity: Asian</l1>
					<l1>Gender: Female</l1>
					</ol>
				</div>

				<div className={styles.imageContainer}>
					<img 
						src="/images/tswift_ghibli2.png" 
						width={800}
						height={800}
					/>
				</div>
				
			</div>
		</main>
	)
}
