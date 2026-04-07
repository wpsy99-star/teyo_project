import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, company, email, phone, services, budget, message } = req.body;

  if (!name || !email || !phone || !services || !message) {
    return res.status(400).json({ error: '필수 항목이 누락되었습니다.' });
  }

  const db = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  const { error } = await db.from('contacts').insert({
    name,
    company: company || null,
    email,
    phone,
    services,
    budget: budget || null,
    message,
  });

  if (error) {
    console.error('Supabase error:', error);
    return res.status(500).json({ error: '저장 중 오류가 발생했습니다.' });
  }

  return res.status(200).json({ success: true });
}
