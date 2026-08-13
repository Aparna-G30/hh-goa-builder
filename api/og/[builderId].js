function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default async function handler(req, res) {
  const { builderId } = req.query;

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
  const siteUrl = `https://${req.headers.host}`;
  const pageUrl = `${siteUrl}/pass/${builderId}`;

  const fallback = () => {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(`<!doctype html>
<html><head>
<meta charset="utf-8" />
<meta property="og:title" content="HH Goa 2026 Builder Pass" />
<meta property="og:description" content="Meet me at Hacker House Goa. #FrameInGoa" />
<meta property="og:url" content="${pageUrl}" />
<meta name="twitter:card" content="summary" />
<meta http-equiv="refresh" content="0; url=${pageUrl}" />
</head><body>Redirecting to <a href="${pageUrl}">${pageUrl}</a></body></html>`);
  };

  if (!supabaseUrl || !supabaseAnonKey || !builderId) {
    fallback();
    return;
  }

  try {
    const apiUrl = `${supabaseUrl}/rest/v1/builders?builder_id=eq.${encodeURIComponent(
      builderId
    )}&select=*`;

    const response = await fetch(apiUrl, {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
    });

    const rows = await response.json();
    const builder = Array.isArray(rows) ? rows[0] : null;

    if (!builder) {
      fallback();
      return;
    }

    const title = `${escapeHtml(builder.name)} — ${escapeHtml(
      builder.title
    )} | HH Goa 2026`;
    const description = `${escapeHtml(builder.role)} · ${escapeHtml(
      builder.tech_stack
    )} — Meet me at Hacker House Goa. #FrameInGoa`;
    const image = escapeHtml(builder.image_url || "");

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(`<!doctype html>
<html><head>
<meta charset="utf-8" />
<title>${title}</title>
<meta name="description" content="${description}" />

<meta property="og:type" content="website" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:url" content="${pageUrl}" />
${image ? `<meta property="og:image" content="${image}" />` : ""}

<meta name="twitter:card" content="${image ? "summary_large_image" : "summary"}" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
${image ? `<meta name="twitter:image" content="${image}" />` : ""}

<meta http-equiv="refresh" content="0; url=${pageUrl}" />
</head><body>Redirecting to <a href="${pageUrl}">${pageUrl}</a></body></html>`);
  } catch (err) {
    console.error("OG handler failed:", err);
    fallback();
  }
}