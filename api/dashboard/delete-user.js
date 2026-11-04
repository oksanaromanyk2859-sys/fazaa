const { supabase, getAdminFromReq, parseBody } = require('../_lib/supabase');

module.exports = async (req, res) => {
  if (!getAdminFromReq(req)) return res.status(401).json({ success: false });

  const body = await parseBody(req);
  const userId = parseInt(body.userId || '0');
  if (!userId) return res.json({ success: false });

  await supabase.from('cards').delete().eq('user_id', userId);
  await supabase.from('users').delete().eq('id', userId);
  res.json({ success: true });
};
