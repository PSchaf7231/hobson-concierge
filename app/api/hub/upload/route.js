import { handleUpload } from '@vercel/blob/client'
import { NextResponse } from 'next/server'

// Issues short-lived client tokens so the browser can upload straight to
// Vercel Blob (bypassing the ~4.5MB serverless request-body limit that would
// otherwise break anything but small files). Same shared-password auth as
// the rest of the Hub API.
export async function POST(request) {
  const hubPassword = process.env.HUB_PASSWORD
  if (!hubPassword) {
    return NextResponse.json({ error: 'Hub is not configured (set HUB_PASSWORD)' }, { status: 503 })
  }
  if (request.headers.get('x-hub-key') !== hubPassword) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => ({
        addRandomSuffix: true,
        // 500MB per file — comfortable for a handful of 3-5 minute videos
        // without leaving the door open to unbounded uploads.
        maximumSizeInBytes: 500 * 1024 * 1024
      }),
      onUploadCompleted: async () => {}
    })
    return NextResponse.json(jsonResponse)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
