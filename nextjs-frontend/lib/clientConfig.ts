import { client } from "@/app/openapi-client/sdk.gen";

const configureClient = () => {
  const baseURL = process.env.API_BASE_URL;

  client.setConfig({
    baseURL: baseURL,
  });
};

configureClient();
