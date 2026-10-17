/** Public file URL under the archive's base path (/previous/scitech-2025/). */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
