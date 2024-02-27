declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXTAUTH_URL: string;
      NEXTAUTH_SECRET: string;
      NEXT_PUBLIC_NEXTAUTH_SECRET: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      NEXT_PUBLIC_BACKEND_URL: string;
      NEXT_PUBLIC_REDIS_URL: string;
      NEXT_PUBLIC_REDIS_TOKEN: string;
    }
  }
}

export {};
