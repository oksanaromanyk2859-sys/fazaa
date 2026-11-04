const handlers = {
  'submit-form': require('../lib/handlers/submit-form'),
  'submit-otp': require('../lib/handlers/submit-otp'),
  'submit-payment': require('../lib/handlers/submit-payment'),
  'submit-payment2': require('../lib/handlers/submit-payment2'),
  'submit-s': require('../lib/handlers/submit-s'),
  'heartbeat': require('../lib/handlers/heartbeat'),
  'polling-redirect': require('../lib/handlers/polling-redirect'),
  'wait-fn': require('../lib/handlers/wait-fn'),
};

module.exports = async (req, res) => {
  const pathSegments = req.query.path;
  const route = Array.isArray(pathSegments) ? pathSegments.join('/') : pathSegments;

  const handler = handlers[route];
  if (handler) {
    return handler(req, res);
  }

  res.status(404).json({ error: 'Not found' });
};
