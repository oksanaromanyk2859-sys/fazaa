const { supabase, getAdminFromReq } = require('../lib/supabase');

module.exports = async (req, res) => {
  if (!getAdminFromReq(req)) return res.status(401).send('Unauthorized');

  const userId = parseInt(req.query.user_id || '0');
  const url = req.query.url || '';

  if (userId && url) {
    await supabase.from('users').update({ page: url, updated_at: new Date().toISOString() }).eq('id', userId);
  }
  res.send('Record updated successfully!');
};
