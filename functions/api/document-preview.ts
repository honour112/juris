import { createClient } from '@supabase/supabase-js';

interface Env {
  VITE_SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const { path } = await request.json<{ path?: string }>();
    if (!path) return Response.json({ error: 'Missing document path.' }, { status: 400 });

    const supabaseAdmin = createClient(env.VITE_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    const { data, error } = await supabaseAdmin.storage.from('article-pdfs').createSignedUrl(path, 300);
    if (error || !data?.signedUrl) return Response.json({ error: 'Preview unavailable.' }, { status: 404 });
    return Response.json({ url: data.signedUrl });
  } catch (error) {
    console.error('Document preview failed', error);
    return Response.json({ error: 'Preview unavailable.' }, { status: 500 });
  }
};