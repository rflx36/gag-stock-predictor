/// <reference types="vite/client" />



interface ImportMetaEnv {
    readonly VITE_GAG_STOCK: string,
}


interface ImportMeta {
    readonly env: ImportMetaEnv
}