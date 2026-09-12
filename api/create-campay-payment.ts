import { campayRequest } from './_lib/campay';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.VITE_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

export default async function handler(request: Request) {
  if (request.method !== 'POST') return Response.json({ error: 'Method not allowed' }, { status: 405 });
  if (!process.env.CAMPAY_USERNAME || !process.env.CAMPAY_PASSWORD) {
    return Response.json({ error: 'CamPay is not configured.' }, { status: 500 });
  }

  try {
    const { phoneNumber, articleId } = await request.json();
    if (!phoneNumber || !articleId) {
      return Response.json({ error: 'Missing payment details.' }, { status: 400 });
    }

    const { data: article, error: articleError } = await supabaseAdmin
      .from('articles')
      .select('id, title')
      .eq('id', articleId)
      .eq('status', 'published')
      .single();
    if (articleError || !article) return Response.json({ error: 'Article unavailable.' }, { status: 404 });

    const amount = Number(process.env.CAMPAY_ARTICLE_PRICE_XAF || 1000);
    const title = typeof article.title === 'object' && article.title !== null
      ? (article.title as { en?: string }).en || 'Document access'
      : 'Document access';

    const payment = await campayRequest('/collect/', {
      method: 'POST',
      body: JSON.stringify({
        amount: String(amount),
        currency: 'XAF',
        from: String(phoneNumber).replace(/\s+/g, ''),
        description: `Document access: ${title}`,
        external_reference: `article-${articleId}`
      })
    });

    return Response.json({ referenceCode: payment.reference_code, status: payment.status || 'PENDING' });
  } catch (error) {
    console.error('CamPay payment creation failed', error);
    return Response.json({ error: error instanceof Error ? error.message : 'Unable to start payment.' }, { status: 502 });
  }
}
