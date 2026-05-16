import { NextResponse } from "next/server"

export async function GET() {
  const key = process.env.NASA_API_KEY

  if (!key) {
    return NextResponse.json({ error: "NASA_API_KEY is undefined" }, { status: 500 })
  }

  try {
    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${key}`,
      { next: { revalidate: 86400 } }
    )
    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json({ error: `NASA error: ${res.status}`, body: text }, { status: 500 })
    }
    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}