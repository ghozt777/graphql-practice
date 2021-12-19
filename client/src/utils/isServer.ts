/**
 * Util Function that tells if a request is made on the server or not
 */
export const isServer = () => typeof window === "undefined";
