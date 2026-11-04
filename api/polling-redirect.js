const { supabase, getUserFromReq } = require('./_lib/supabase');

module.exports = async (req, res) => {
  const user = getUserFromReq(req);
  if (!user) return res.json({ redirect: false });

  const { data } = await supabase.from('users').select('page').eq('id', user.userId).limit(1);

  if (data && data[0] && data[0].page) {
    const page = data[0].page;
    const referer = req.headers.referer || '';
    const currentPage = referer.split('/').pop()?.split('?')[0] || '';

    if (page !== currentPage && page !== 'index-details.html') {
      return res.json({ redirect: page });
    }
  }

  res.json({ redirect: false });
};
