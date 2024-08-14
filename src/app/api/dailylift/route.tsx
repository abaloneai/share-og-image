import { ImageResponse } from 'next/og';

function arrayBufferToBase64(arrayBuffer: ArrayBuffer): string {
  const buffer = Buffer.from(arrayBuffer);
  return buffer.toString('base64');
}

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS',
      'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
    },
  });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  let content = searchParams.get('content') || '';
  content = content.replace(' - ', '\n\n-- ');
  const bg = searchParams.get('bg') || '';
  const Lexend = await fetch(process.env.HOST_NAME + '/Lexend.ttf')
    .then((res) => res.arrayBuffer());
  const Hanken = await fetch(process.env.HOST_NAME + '/HankenGrotesk.ttf')
    .then((res) => res.arrayBuffer());
  const hasReference = req.headers.has('Referer');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 64,
          position: 'relative',
        }}
      >
        {bg && (
          <img
            width={750}
            height={1334}
            src={bg}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 750,
              height: 1334,
              zIndex: -1,
              filter: 'blur(4px)',
            }}
          />
        )}
        {bg && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 750,
              height: 1334,
              backgroundColor: '#0006',
              zIndex: 0,
            }}
          />
        )}
        <div
          style={{
            color: 'white',
            fontSize: 56,
            fontFamily: 'Hanken',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
            whiteSpace: 'pre-wrap',
          }}
        >
          {content}
        </div>
        <div
          style={{
            backgroundColor: '#9333ea99',
            borderRadius: 8,
            padding: '8px 16px',
            fontSize: 32,
            color: '#fff',
            marginTop: 64,
            fontFamily: 'Lexend',
            position: 'relative',
            zIndex: 1,
          }}
        >
          DailyLift.io
        </div>
      </div>
    ),
    {
      width: 750,
      height: 1334,
      fonts: [
        {
          name: 'Lexend',
          data: Lexend,
          style: 'normal',
        },
        {
          name: 'Hanken',
          data: Hanken,
          style: 'normal',
        },
      ],
      headers: { // allow CORs
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,OPTIONS',
        'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
        ...hasReference && {
          'Content-Description': 'File Transfer',
          'Content-Disposition': 'attachment; filename="dailylift-share-quote.png"',
        },
      },
    },
  )
}
