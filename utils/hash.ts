import crypto from "node:crypto";

export function createHash(hashify: any) {
  const hash = crypto.createHash("sha256").update(JSON.stringify(hashify)).digest("hex");
  return hash;
}
