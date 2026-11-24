const MEDIA_BASE_URL = (
  process.env.NEXT_PUBLIC_MEDIA_BASE_URL ?? ""
).replace(/\/+$/, "");

const LOCAL_MEDIA_BASE_URL = "/fotos/lizelin";

export function mediaUrl(filename: string) {
  const path = filename
    .replace(/^\/+/, "")
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `${MEDIA_BASE_URL || LOCAL_MEDIA_BASE_URL}/${path}`;
}
