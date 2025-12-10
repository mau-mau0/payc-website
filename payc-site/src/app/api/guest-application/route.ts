import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, email, role, topic, story } = await req.json()

    if (!name || !email || !topic || !story) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 })
    }

    // TODO: wire to email or Sanity
    console.log('New guest application:', { name, email, role, topic, story })

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 })
  }
}
