import { campayRequest } from './_lib/campay';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.VITE_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

export default async function handler(request: Request) {
  if (request.method !== 'POST') return Response.json({ error: 'Method not allowed' }, { status: 405 });
  try {
    const { referenceCode, articleId } = await request.json();
    if (!referenceCode || !articleId) return Response.json({ error: 'Missing access details.' }, { status: 400 });

    const { data: article, error: articleError } = await supabaseAdmin
      .from('articles')
      .select('pdf_path')
      .eq('id', articleId)
      .eq('status', 'published')
      .single();
    if (articleError || !article?.pdf_path) return Response.json({ error: 'Article unavailable.' }, { status: 404 });

    const payment = await campayRequest(`/transaction/${encodeURIComponent(referenceCode)}/`);
    const isPaid = ['SUCCESSFUL', 'COMPLETED', 'SUCCESS'].includes(String(payment.status).toUpperCase());
    const belongsToArticle = payment.external_reference === `article-${articleId}`;
    if (!isPaid || !belongsToArticle) return Response.json({ paid: false, status: payment.status || 'PENDING' }, { status: 403 });

    const { data, error } = await supabaseAdmin.storage.from('article-pdfs').createSignedUrl(article.pdf_path, 300);
    if (error || !data?.signedUrl) return Response.json({ error: 'Document unavailable.' }, { status: 404 });
    return Response.json({ paid: true, status: payment.status, url: data.signedUrl });
  } catch (error) {
    console.error('CamPay access verification failed', error);
    return Response.json({ paid: false, status: 'PENDING', error: 'Payment is still being confirmed.' }, { status: 202 });
  }
}
