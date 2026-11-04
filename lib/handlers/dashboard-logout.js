const { clearCookie } = require('../lib/supabase');

module.exports = async (req, res) => {
  clearCookie(res, 'admin_token');
  res.writeHead(302, { Location: '/dashboard/login.html' });
  res.end();
};
