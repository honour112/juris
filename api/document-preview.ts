import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.VITE_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

export default async function handler(request: Request) {
  if (request.method !== 'POST') return Response.json({ error: 'Method not allowed' }, { status: 405 });

  try {
    const { path } = await request.json();
    if (!path) return Response.json({ error: 'Missing document path.' }, { status: 400 });
    const { data, error } = await supabaseAdmin.storage.from('article-pdfs').createSignedUrl(path, 300);
    if (error || !data?.signedUrl) return Response.json({ error: 'Preview unavailable.' }, { status: 404 });
    return Response.json({ url: data.signedUrl });
  } catch (error) {
    console.error('Document preview failed', error);
    return Response.json({ error: 'Preview unavailable.' }, { status: 500 });
  }
}
