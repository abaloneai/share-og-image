import { ImageResponse } from 'next/og';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const content = searchParams.get('content');
  const date = searchParams.get('date');
  const image = await fetch('https://picsum.photos/496/496/?blur=1')
    .then((res) => res.arrayBuffer());
  const Lexend = await fetch('http://localhost:3000/Lexend.ttf')
    .then((res) => res.arrayBuffer());
  const Hanken = await fetch('http://localhost:3000/HankenGrotesk.ttf')
    .then((res) => res.arrayBuffer());

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
          src={image}
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
    },
  )
}