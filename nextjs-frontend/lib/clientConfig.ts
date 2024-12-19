import { client } from "@/app/openapi-client/services.gen";


const configureClient = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  client.setConfig({
    baseUrl: baseUrl,
  });
};

client.interceptors.request.use((request, options) => {
  const jsonBody = JSON.stringify(options.body);
  const contentLength = Buffer.byteLength(jsonBody).toString()
  if (contentLength) {
    request.headers.set("Content-Length", contentLength);
  }

  return request;
});

configureClient();
