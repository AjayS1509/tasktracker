export async function POST(req) {
  const body = await req.json();
  console.log("body", body);
  return Response.json(true);
}
