const { supabase, getAdminFromReq, parseBody } = require('../supabase');

module.exports = async (req, res) => {
  if (!getAdminFromReq(req)) return res.status(401).json({ success: false, error: 'Unauthorized' });

  const body = await parseBody(req);
  const userId = parseInt(body.userId || '0');
  const page = body.page || '';

  if (!userId || !page) return res.json({ success: false, error: 'Missing parameters' });

  await supabase.from('users').update({ page, updated_at: new Date().toISOString() }).eq('id', userId);
  res.json({ success: true });
};
