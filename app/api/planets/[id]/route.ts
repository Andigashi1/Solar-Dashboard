import { NextResponse } from "next/server"

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const res = await fetch(
    `https://api.le-systeme-solaire.net/rest/bodies/${params.id}`,
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