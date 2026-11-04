const { supabase, getAdminFromReq } = require('../supabase');

module.exports = async (req, res) => {
  if (!getAdminFromReq(req)) return res.status(401).json({ success: false });

  await supabase.from('cards').delete().gt('id', 0);
  await supabase.from('users').delete().gt('id', 0);
  res.json({ success: true });
};
