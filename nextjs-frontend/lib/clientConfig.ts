import { client } from "@/app/openapi-client/sdk.gen";


const configureClient = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  client.setConfig({
    baseURL: baseUrl,
  });
};

configureClient();
