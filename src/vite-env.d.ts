/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_FIREBASE_API_KEY: string,
    readonly VITE_FIREBASE_APP_ID: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}