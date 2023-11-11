import { useState, useEffect } from 'react'

import Image from 'next/image'
import styles from '../styles/upload.module.css'

const Upload = () => {
	const [status, setStatus] = useState("")
	const [uploadUrl, setUploadUrl] = useState("/images/tswift.jpg")
	const [uploadImg, setUploadedImg] = useState(null)
	const [createdImg, setCreatedImg] = useState("/images/tswift_ghibli2.png")

	const [style, setStyle] = useState("StudioGhibli")
	const [gender, setGender] = useState("female")
	const [race, setRace] = useState("white")

	useEffect(() => {
		imageUrlToFile(uploadUrl, "default")
	}, [])

	// Convert image url to file
	const imageUrlToFile = async (url, fileName) => {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error('Failed to fetch image');
			}
			const arrayBuffer = await response.arrayBuffer();
			const blob = new Blob([arrayBuffer], { type: response.headers.get('content-type') });
			// Create a File object with a specified name (optional)
			const file = new File([blob], fileName || 'imageFile', { type: blob.type });
			setUploadedImg(file)
		} catch (error) {
			console.error('Error converting image URL to file:', error);
			setUploadedImg(null)
		}
	}

	// Handle image upload
	const handleUpload = (e) => {
		const uploadedFile = e.target.files[0];
		setUploadUrl(URL.createObjectURL(uploadedFile))
		setUploadedImg(uploadedFile)
	}
	// Handle image download
	const handleDownload = (e) => {
		e.preventDefault();
    const downloadLink = document.createElement('a');
    downloadLink.download = 'whimsify.jpg';
    downloadLink.href = createdImg;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.removeChild(downloadLink);
  };

  // Functions for options
	const handleStyleChange = (e) => {
		setStyle(e.target.value)
	}
	const handleGenderChange = (e) => {
		setGender(e.target.value)
	}
	const handleRaceChange = (e) => {
		setRace(e.target.value)
	}

	// Create new version of the image
	const whimsify = async () => {
		if (uploadImg.size > 1024 * 1024){
			setStatus("Image should be less than 1MB")
			console.error('Image file greater than 1MB');
			return
		}

		// Prepare FormData to send to the API
		const formData = new FormData();
		formData.append('image', uploadImg);
		formData.append('style', style);
		formData.append('gender', gender);
		formData.append('race', race);

		const url = process.env.NEXT_PUBLIC_SERVER_URL + `/api/whimsy`

		setStatus("Generating image...")
		// Make an API call to whimsy api
		fetch(url, {
			method: 'POST',
			body: formData,
		})
		.then((response) => response.json())
		.then((data) => {
			// Handle the response from the API as needed
			const image_url = data["message"]["image_gen"]["data"][0]["url"]
			setCreatedImg(image_url);
			setStatus("")
		})
		.catch((error) => {
			setStatus("Image Generation Failed.")
			console.error('Error generating image:', error);
		});
	}
	
	return (
		<div className={styles.uploadContainer} id="upload">
			<div className={styles.uploadLeft}>
				<h3>Transform your photos</h3>

				<p>1. Upload your image (less than 1MB)</p>
				<input type="file" id="imageUpload" onChange={handleUpload} accept="image/*"/>

				<p>2. Choose your style</p>
				<div className={styles.uploadOptions}>
					<select value={style} onChange={handleStyleChange}>
						<option value="StudioGhibli">Studio Ghibli</option>
						<option value="8-Bit">8-Bit</option>
						<option value="Impressionism">Impressionism</option>
						<option value="random">Random</option>
					</select>
				</div>

				<p>3. Add other details</p>
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
					<label>Race:</label>
					<select value={race} onChange={handleRaceChange}>
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
				<button className={styles.download} onClick={whimsify}>Create</button>

				<p>5. Download your image</p>
				<button className={styles.download} onClick={handleDownload}>Download</button>
			</div>

			<div className={styles.uploadRight}>
				<div className={styles.imageContainer}>
					{uploadUrl && <img src={uploadUrl} alt="uploaded image"/>}
				</div>
				<Image className={styles.arrowDown} src="/icons/white_arrow.svg" width={50} height={50} alt="arrow pointing down" />
				<div className={styles.imageContainer}>
					{status != ""
						? <p>{status}</p>
						: <img src={createdImg} alt="created image"/>
					}
				</div>
			</div>

		</div>
	)
}

export default Upload