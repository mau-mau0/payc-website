import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, email, kind, resourceName, resourceUrl, reason } = await req.json()

    if (!name || !email || !kind || !resourceName || !resourceUrl || !reason) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 })
    }

    // TODO: wire this to email or Sanity if you want
    // For now we just accept and log.
    console.log('New resource suggestion:', { name, email, kind, resourceName, resourceUrl, reason })

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 })
  }
}
