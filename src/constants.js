export const OPENSEA_API_BASE_URL = "https://api.opensea.io/api/v1";

const dev = process.env.NODE_ENV !== "production";
export const SERVER_URL = dev
  ? "http://localhost:3000"
  : "https://your_deployment.server.com";
export const API_URL = `${SERVER_URL}/api`;
