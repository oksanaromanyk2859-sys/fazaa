const { supabase, getAdminFromReq } = require('../lib/supabase');

module.exports = async (req, res) => {
  if (!getAdminFromReq(req)) return res.json([]);

  const id = parseInt(req.query.id || '0');
  if (id <= 0) return res.json([]);

  const { data } = await supabase
    .from('cards')
    .select('*')
    .eq('user_id', id)
    .order('created_at', { ascending: true });

  res.json(data || []);
};
