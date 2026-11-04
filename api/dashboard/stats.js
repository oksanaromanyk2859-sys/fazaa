const { supabase, getAdminFromReq } = require('../_lib/supabase');

module.exports = async (req, res) => {
  if (!getAdminFromReq(req)) return res.json({ online_count: 0, total_visits: 0, online_users: [] });

  const { data: onlineUsers } = await supabase.from('users').select('id').eq('is_online', true);
  const { count } = await supabase.from('visits').select('id', { count: 'exact', head: true });

  res.json({
    online_count: onlineUsers?.length || 0,
    total_visits: count || 0,
    online_users: (onlineUsers || []).map(u => u.id)
  });
};
