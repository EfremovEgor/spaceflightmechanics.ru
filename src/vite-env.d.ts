/// <reference types="vite/client" />

interface ImportMetaEnv {
	/** Base URL of the backend API, "/api" in production. */
	readonly VITE_API_URL: string;
	/** "true" turns the Russian version on. */
	readonly VITE_RU_ENABLED?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
