import { client } from "@/app/openapi-client/sdk.gen";


const configureClient = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  client.setConfig({
    baseURL: baseUrl,
  });
};

// client.interceptors.request.use((request, options) => {
//   const jsonBody = JSON.stringify(options.body);
//   const contentLength = Buffer.byteLength(jsonBody).toString()
//   if (contentLength) {
//     request.headers.set("Content-Length", contentLength);
//   }
//
//   return request;
// });

configureClient();
