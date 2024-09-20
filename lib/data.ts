export async function getData(query: string) {
	const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '?query=' + encodeURIComponent(decodeURIComponent(query)))

	return res.json()
}
