const { supabase, getAdminFromReq } = require('../supabase');

module.exports = async (req, res) => {
  if (!getAdminFromReq(req)) return res.status(401).json({ error: 'unauthorized' });

  const { data } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });

  res.json(data || []);
};
