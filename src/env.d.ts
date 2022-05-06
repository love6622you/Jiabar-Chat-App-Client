interface ImportMetaEnv {
  readonly VITE_APP_API: string;
  readonly VITE_APP_WSS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
