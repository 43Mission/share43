// lib/firebaseAdmin.js
import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Decode the Base64 service account JSON from your environment variable
function getServiceAccount() {
    const b64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
    if (!b64) {
        throw new Error("Missing FIREBASE_SERVICE_ACCOUNT_BASE64 environment variable");
    }

    // Convert from base64 → JSON string → object
    const json = Buffer.from(b64, "base64").toString("utf8");
    return JSON.parse(json);
}

if (!getApps().length) {
    const serviceAccount = getServiceAccount();

    initializeApp({
        credential: cert(serviceAccount)
    });
}

export const db = getFirestore();
