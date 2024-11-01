import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS',
      'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
    },
  });
}

function trimQuote(content: string): string {
  return content.endsWith('"') ? content.replace(/^"|"$/g, '') : content;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const content = searchParams.get('content') || '';
  const [body, author] = trimQuote(content).split(' - ');
  const width = Number(searchParams.get('width') || 750);
  const height = Number(searchParams.get('height') || 1334);
  const bg = searchParams.get('bg') || '';
  const isImage = /\.(png|jpg)$/.test(bg);
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
          padding: 120,
          position: 'relative',
        }}
      >
        {isImage && <img
          width={width}
          height={height}
          src={bg}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width,
            height,
            zIndex: -1,
            filter: 'blur(32px)',
          }}
        />}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width,
            height,
            backgroundColor: 'white',
            zIndex: 0,
            opacity: 0.8,
          }}
        />
        <div
          style={{
            color: '#000c',
            display: 'flex',
            fontSize: 72,
            marginTop: 'auto',
            marginBottom: 64,
            textAlign: 'center',
            position: 'relative',
            zIndex: 10,
            whiteSpace: 'pre-wrap',
          }}
        >
          {body}
        </div>
        {author && <div
          style={{
            color: '#000c',
            display: 'flex',
            fontSize: 48,
            position: 'relative',
            textAlign: 'center',
            zIndex: 10,
          }}
        >
          - {author}
        </div>}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 36,
            gap: 12,
            color: '#000c',
            marginTop: 'auto',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <img
            src={`${process.env.HOST_NAME}/DailyLift-logo-white.png`}
            alt="DailyLift"
            width={48}
            height={48}
          />
          DailyLift.io
        </div>
      </div>
    ),
    {
      width,
      height,
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
