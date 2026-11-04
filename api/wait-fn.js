const { supabase, getUserFromReq } = require('./_lib/supabase');

module.exports = async (req, res) => {
  const user = getUserFromReq(req);
  if (!user) return res.json({ status: 0, url: '' });

  const { data } = await supabase.from('users').select('page').eq('id', user.userId).limit(1);

  if (data && data[0] && data[0].page) {
    const page = data[0].page;
    if (page !== 'wait-payment.html' && page !== 's.html') {
      return res.json({ status: 1, url: page });
    }
  }

  res.json({ status: 0, url: '' });
};
