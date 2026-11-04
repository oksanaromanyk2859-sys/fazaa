const { supabase, getAdminFromReq } = require('../supabase');

module.exports = async (req, res) => {
  if (!getAdminFromReq(req)) return res.status(401).json({ error: 'unauthorized' });

  const cutoff = new Date(Date.now() - 10000).toISOString();
  const { data: onlineUsers } = await supabase
    .from('users')
    .select('id')
    .eq('is_online', true)
    .gt('updated_at', cutoff);
  const { count } = await supabase.from('visits').select('id', { count: 'exact', head: true });

  res.json({
    online_count: onlineUsers?.length || 0,
    total_visits: count || 0,
    online_users: (onlineUsers || []).map(u => u.id)
  });
};
