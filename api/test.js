module.exports = (req, res) => {
  res.json({ ok: true, env: !!process.env.SUPABASE_URL, node: process.version });
};
