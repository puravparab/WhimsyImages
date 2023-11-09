'use client'

import { useState, useEffect } from 'react'

import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
	const [tswift, setTswift] = useState(0)
	const [tswiftStyle, setTswiftStyle] = useState("Studio Ghibli")
	const [mj, setMj] = useState(0)
	const [mjStyle, setMjStyle] = useState("8-Bit")

	useEffect(() => {
		// Change tswift image every 5 seconds
		const tswiftInterval = setInterval(() => {
			handleImgChange("tswift", (tswift + 1) % 3);
		}, 4000);
		// Clean up intervals when the component is unmounted
		return () => {
			clearInterval(tswiftInterval);
		};
	}, [tswift]);

	useEffect(() => {
		// Change mj image every 7 seconds
		const mjInterval = setInterval(() => {
			handleImgChange("mj", (mj + 1) % 2);
		}, 12000);

		// Clean up intervals when the component is unmounted
		return () => {
			clearInterval(mjInterval);
		};
	}, [mj]);
	
	// example: tswift, mj
	// number: 0, 1, 2, etc
	const handleImgChange = (example, number) => {
		console.log(number)
		if (example == "tswift"){
			if (number == 0 || number == 2){setTswiftStyle("Studio Ghibli")}
			else {setTswiftStyle("8-Bit")}
			setTswift(number)
		} else if (example == "mj"){
			if (number == 1){setMjStyle("8-Bit")}
			else {setMjStyle("Studio Ghibli")}
			setMj(number)
		}
	}


	return (
		<main className={styles.main}>
			<div className={styles.mainTitle}>
				<h2>Reimagine your Images</h2>
				<p>Powered by gpt4 and dalle-3</p>
			</div>

			<div className={styles.mainExample}>
				<div className={styles.imageContainer}>
					<Image src="/images/tswift.jpg" width={790} height={699} alt="Taylor swift" priority/>
				</div>
				<div className={styles.exampleTransition}>
					<Image
						src="/icons/white_arrow.svg"
						width={200}
						height={200}
						alt="arrow pointing right"
					/>
					<span>In the style of</span>
					<span>&quot;{tswiftStyle}&quot;</span>
				</div>

				<div className={styles.imageContainer}>
					{tswift === 0 && <Image src="/images/tswift_ghibli2.png" width={800} height={800} alt=""/>}
					{tswift === 1 && <Image src="/images/tswift_8bit.png" width={800} height={800} alt="" />}
					{tswift === 2 && <Image src="/images/tswift_ghibli.png" width={800} height={800} alt="" />}
				</div>
			</div>

			{/* <button onClick={() => {handleImgChange("tswift", (tswift + 1) % 3)}}>Next</button> */}

			<div className={styles.mainExample}>
				<div className={styles.imageContainer}>
					<Image src="/images/mj.jpg" width={512} height={376} alt="Michael Jordan"/>
				</div>
				<div className={styles.exampleTransition}>
					<Image
						src="/icons/white_arrow.svg"
						width={200}
						height={200}
						alt="arrow pointing right"
					/>
					<span>In the style of</span>
					<span>&quot;{mjStyle}&quot;</span>
				</div>

				<div className={styles.imageContainer}>
					{mj === 0 && <Image src="/images/mj_8bit.png" width={800} height={800} alt=""/>}
					{mj === 1 && <Image src="/images/mj_ghibli.png" width={800} height={800} alt=""/>}
				</div>
			</div>

			{/* <button onClick={() => {handleImgChange("mj", (mj + 1) % 2)}}>next</button> */}

		</main>
	)
}
