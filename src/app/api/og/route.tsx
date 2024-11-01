import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 128,
          background: 'lavender',
      }}
    >
      Hello!
        <img src={'https://blog.meathill.com/avatar.jpg'} width={160} height={160} />
      </div>
    )
  )
}
