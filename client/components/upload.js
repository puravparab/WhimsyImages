
import { useState } from 'react'

import Image from 'next/image'
import styles from '../styles/upload.module.css'

const Upload = () => {
	const [uploadImg, setUploadedImg] = useState("/images/tswift.jpg")
	const [createdImg, setCreatedImg] = useState("/images/tswift_ghibli2.png")
	const [style, setStyle] = useState("Studio Ghibli")
	const [gender, setGender] = useState("female")
	const [ethnicity, setEthnicity] = useState("white")
	

	const handleUpload = (e) => {
		const uploadedFile = e.target.files[0];
		setUploadedImg(URL.createObjectURL(uploadedFile));
	}
	const handleStyleChange = (e) => {
		setStyle(e.target.value)
	}
	const handleGenderChange = (e) => {
		setGender(e.target.value)
	}
	const handleEthnicityChange = (e) => {
		setEthnicity(e.target.value)
	}
	
	return (
		<div className={styles.uploadContainer} id="upload">
			<div className={styles.uploadLeft}>
				<h3>Transform your photos</h3>

				<p>1. Upload your image</p>
				<input type="file" id="imageUpload" onChange={handleUpload} />

				<p>2. Choose your style</p>
				<div className={styles.uploadOptions}>
					<select value={style} onChange={handleStyleChange}>
						<option value="Studio Ghibli">Studio Ghibli</option>
						<option value="8-Bit">8-Bit</option>
						<option value="Impressionism">Impressionism</option>
						<option value="random">Random</option>
					</select>
				</div>

				<p>3. Add other details (if neccesary)</p>
				<div className={styles.uploadOptions}>
					<label>Gender:</label>
					<select value={gender} onChange={handleGenderChange}>
						<option value="none">None</option>
						<option value="female">Female</option>
						<option value="male">Male</option>
						<option value="nb">Non-Binary</option>
						<option value="other">Other</option>
						<option value="random">Random</option>
					</select>
				</div>
				<div className={styles.uploadOptions}>
					<label>Ethnicity:</label>
					<select value={ethnicity} onChange={handleEthnicityChange}>
						<option value="none">None</option>
						<option value="aian">American Indian and Alaska Native</option>
						<option value="black">Black</option>
						<option value="ea">East Asian</option>
						<option value="his">Hispanic</option>
						<option value="sa">South Asian</option>
						<option value="white">White</option>
						<option value="random">Random</option>
					</select>
				</div>
				
				<p>4. Create your image</p>
				<button className={styles.download}>Create</button>

				<p>5. Download your image</p>
				<button className={styles.download}>Download</button>

			</div>
			<div className={styles.uploadRight}>
				<div className={styles.imageContainer}>
					{uploadImg && <img src={uploadImg} alt="uploaded image"/>}
				</div>
				<Image className={styles.arrowDown} src="/icons/white_arrow.svg" width={50} height={50} alt="arrow pointing down" />
				<div className={styles.imageContainer}>
					{createdImg && <img src={createdImg} alt="created image"/>}
				</div>
			</div>
		</div>
	)
}

export default Upload