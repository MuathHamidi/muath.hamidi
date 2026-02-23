import { ab2b64, b642ab } from './utils.js';

export const deriveMasterKey = async (password, username) => {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        "raw", enc.encode(password), { name: "PBKDF2" }, false, ["deriveKey"]
    );
    return await crypto.subtle.deriveKey(
        { name: "PBKDF2", salt: enc.encode(username + "nexus_salt"), iterations: 100000, hash: "SHA-256" },
        keyMaterial, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]
    );
};

export const deriveVaultKey = async (password, saltBuffer) => {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        "raw", enc.encode(password), { name: "PBKDF2" }, false, ["deriveKey"]
    );
    return await crypto.subtle.deriveKey(
        { name: "PBKDF2", salt: saltBuffer, iterations: 200000, hash: "SHA-256" },
        keyMaterial, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]
    );
};

export const generateKeyPair = async () => {
    return await crypto.subtle.generateKey(
        { name: "RSA-OAEP", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" },
        true, ["encrypt", "decrypt"]
    );
};

export const generateContextKey = async () => {
    return await crypto.subtle.generateKey(
        { name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]
    );
};

export const exportKey = async (key) => {
    const exported = await crypto.subtle.exportKey(key.type === "private" ? "pkcs8" : (key.type === "public" ? "spki" : "raw"), key);
    return ab2b64(exported);
};

export const importKey = async (b64, type, algo) => {
    const format = type === "private" ? "pkcs8" : (type === "public" ? "spki" : "raw");
    const usages = type === "private" ? ["decrypt"] : (type === "public" ? ["encrypt"] : ["encrypt", "decrypt"]);
    return await crypto.subtle.importKey(format, b642ab(b64), algo, true, usages);
};