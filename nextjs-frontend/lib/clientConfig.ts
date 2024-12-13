import { client } from "@/app/openapi-client/services.gen";


const configureClient = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  client.setConfig({
    baseUrl: baseUrl,
  });
};

configureClient();
