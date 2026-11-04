const { supabase, signToken, setCookie, parseBody } = require('../_lib/supabase');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const body = await parseBody(req);
  const email = body.email || '';
  const password = body.password || '';

  const { data, error } = await supabase
    .from('admins')
    .select('*')
    .eq('email', email)
    .eq('password', password)
    .limit(1);

  if (error || !data || data.length === 0) {
    return res.status(401).json({ success: false, error: 'بيانات الدخول غير صحيحة' });
  }

  const token = signToken({ admin: true, email });
  setCookie(res, 'admin_token', token);
  res.json({ success: true });
};
