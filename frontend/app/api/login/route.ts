// app/api/login/route.ts

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { email, password } = body

  console.log('Received login:', { email, password })

  if (!email || !password) {
    return NextResponse.json({ success: false }, { status: 400 })
  }

  return NextResponse.json({ success: true }, { status: 200 })
}