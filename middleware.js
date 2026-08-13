import { rewrite } from "@vercel/edge";

const CRAWLER_PATTERNS = [
  "twitterbot",
  "facebookexternalhit",
  "facebookcatalog",
  "slackbot",
  "slack-imgproxy",
  "linkedinbot",
  "whatsapp",
  "telegrambot",
  "discordbot",
  "pinterest",
  "redditbot",
  "skypeuripreview",
  "vkshare",
  "embedly",
];

export default function middleware(request) {
  const userAgent = (request.headers.get("user-agent") || "").toLowerCase();
  const isCrawler = CRAWLER_PATTERNS.some((pattern) =>
    userAgent.includes(pattern)
  );

  if (!isCrawler) {
    return;
  }

  const url = new URL(request.url);
  const match = url.pathname.match(/^\/pass\/([^/]+)/);
  if (!match) {
    return;
  }

  const builderId = match[1];
  return rewrite(new URL(`/api/og/${builderId}`, request.url));
}

export const config = {
  matcher: ["/pass/:builderId*"],
};