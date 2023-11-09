import Script from 'next/script'
 
export function GTag() {
	return (
		<>
			<Script src="https://www.googletagmanager.com/gtag/js?id=G-SKFSREH5PY" />
			<Script id="google-analytics">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());

					gtag('config', 'G-SKFSREH5PY');
				`}
			</Script>
		</>
	)
}
