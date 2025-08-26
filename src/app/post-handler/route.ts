export async function POST(request: Request) {
  if (!request.body) {
    return new Response("Bad request", { status: 400 });
  }
  const contentLengthHeaderRaw = request.headers.get("content-length");
  const contentLengthHeader =
    contentLengthHeaderRaw !== null
      ? Number.parseInt(contentLengthHeaderRaw)
      : null;

  // We're being loose with characters vs bytes here,
  // but as long as this plain ASCII text, that's fine
  const data = await request.text();
  const dataLength = data.length;
  console.log(
    `${
      dataLength === contentLengthHeader ? "SAME" : "DIFFERENT"
    } | String length: ${dataLength}, content-length: ${contentLengthHeader}`
  );

  return new Response(dataLength + "");
}
