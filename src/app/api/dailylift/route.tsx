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
  const date = searchParams.get('date');
  const image = await fetch('https://picsum.photos/496/496?blur=1')
    .then((res) => res.arrayBuffer());
  const imageUrl = `data:image/jpeg;base64,${arrayBufferToBase64(image)}`;
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
          background: 'linear-gradient(150deg, #0ea5e9, #0c4a6e)',
          padding: 32,
        }}
      >
        <header
          style={{
            color: "white",
            fontFamily: 'Hanken',
            fontSize: '16',
            fontWeight: 'bold',
            marginBottom: 16,
            paddingLeft: 16,
          }}
        >
          {date}
        </header>
        <img
          width="496"
          height="496"
          src={imageUrl}
          style={{
            borderRadius: '32px 32px 0 0',
          }}
        />
        <div
          style={{
            backgroundColor: 'white',
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            padding: '24px 32px 16px',
            borderRadius: '0 0 32px 32px',
          }}
        >
          <p
            style={{
              fontSize: 32,
              fontFamily: 'Hanken',
              whiteSpace: 'pre-wrap',
            }}
          >
            {content}
          </p>
          <hr
            style={{
              display: 'flex',
              borderColor: '#eee',
              borderStyle: 'solid',
              borderWidth: '1px 0 0',
              marginTop: 'auto',
              width: '100%',
            }}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <p
              style={{
                color: '#666',
                fontFamily: 'Lexend',
              }}
            >
              DailyLift.io
            </p>
            <p
              style={{
                color: '#666',
                fontWeight: 'light',
              }}
            >Thrive every day</p>
          </div>
        </div>
      </div>
    ),
    {
      width: 560,
      height: 1000,
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
