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

  const urlPath = req.url.replace(/^\/api\//, '').split('?')[0];
  const fallback = handlers[urlPath];
  if (fallback) {
    return fallback(req, res);
  }

  res.status(404).json({ error: 'Not found', debug: { path: pathSegments, url: req.url, route, urlPath } });
};
