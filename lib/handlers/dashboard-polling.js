const { supabase, getAdminFromReq } = require('../supabase');

module.exports = async (req, res) => {
  if (!getAdminFromReq(req)) return res.json([]);

  const { data } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });

  res.json(data || []);
};
