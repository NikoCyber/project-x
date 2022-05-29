export async function parseJson(url) {
  const request = await fetch(url)
  const data = await request.json()
  return data
}
