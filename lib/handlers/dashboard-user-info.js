const { supabase, getAdminFromReq } = require('../supabase');

module.exports = async (req, res) => {
  if (!getAdminFromReq(req)) return res.status(401).json({ error: 'Unauthorized' });

  const id = parseInt(req.query.id || '0');
  if (id <= 0) return res.json({ error: 'Invalid ID' });

  const { data, error } = await supabase.from('users').select('*').eq('id', id).limit(1);

  if (error || !data || data.length === 0) {
    return res.json({ error: 'User not found' });
  }
  res.json(data[0]);
};
