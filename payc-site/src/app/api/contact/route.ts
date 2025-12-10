import { NextRequest, NextResponse } from 'next/server'
// Optional: import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 })
    }

    // TODO: Wire to an email provider (Resend recommended)
    // const resendKey = process.env.RESEND_API_KEY
    // if (resendKey) {
    //   const resend = new Resend(resendKey)
    //   await resend.emails.send({
    //     from: 'PAYC <no-reply@yourdomain>',
    //     to: ['owner@yourdomain.com'],
    //     subject: `[PAYC] ${subject}`,
    //     reply_to: email,
    //     text: `From: ${name} <${email}>\n\n${message}`,
    //   })
    // }

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 })
  }
}
