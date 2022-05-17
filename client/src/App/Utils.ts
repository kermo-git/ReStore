// https://www.w3schools.com/js/js_cookies.asp

export function getCookie(key: string) {
	const searchKey = key + "="
	const decodedCookie = decodeURIComponent(document.cookie)
	const ca = decodedCookie.split(';')

	for(let i = 0; i < ca.length; i++) {
		let c = ca[i]
		while (c.charAt(0) === ' ') {
			c = c.substring(1)
		}
		if (c.indexOf(searchKey) === 0) {
			return c.substring(searchKey.length, c.length)
		}
	}
	return ""
}

export function formatPrice(price: number) {
	return (price / 100).toFixed(2) + "€"
}