export async function uploadToR2(r2: R2Bucket, key: string, file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  await r2.put(key, buffer, {
    httpMetadata: { contentType: file.type },
  });
  return `/images/r2/${key}`;
}

export async function deleteFromR2(r2: R2Bucket, key: string) {
  const filename = key.split('/').pop() ?? key;
  await r2.delete(filename);
}
