import { NextResponse } from "next/server"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const res = await fetch(
    `https://api.le-systeme-solaire.net/rest/bodies/${id}`,
    {
      next: { revalidate: 86400 },
      headers: {
        Authorization: `Bearer ${process.env.SOLAR_API_KEY}`,
      },
    }
  )
  const data = await res.json()
  return NextResponse.json(data)
}