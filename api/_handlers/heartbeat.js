const { supabase, getUserFromReq, parseBody } = require('../_lib/supabase');

module.exports = async (req, res) => {
  const user = getUserFromReq(req);
  if (!user) return res.status(200).end();

  const userId = user.userId;

  if (req.method === 'POST') {
    const body = await parseBody(req);
    if (body.action === 'offline') {
      await supabase.from('users').update({ is_online: false, updated_at: new Date().toISOString() }).eq('id', userId);
      return res.status(200).end();
    }
  }

  await supabase.from('users').update({
    is_online: true,
    last_input_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }).eq('id', userId);

  res.status(200).end();
};
