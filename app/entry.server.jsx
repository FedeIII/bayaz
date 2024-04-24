import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";
import { createReadableStreamFromReadable } from "@remix-run/node";

export default function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) {
  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response(createReadableStreamFromReadable("<!DOCTYPE html>" + markup), {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
