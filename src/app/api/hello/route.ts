import pkg from '../../../../package.json' assert { type: 'json' };

export async function GET() {
  return new Response('Hello, world! v.' + pkg.version);
}
