const handlers = {
  'login': require('../../lib/handlers/dashboard-login'),
  'logout': require('../../lib/handlers/dashboard-logout'),
  'user-info': require('../../lib/handlers/dashboard-user-info'),
  'card-id': require('../../lib/handlers/dashboard-card-id'),
  'polling-dashboard': require('../../lib/handlers/dashboard-polling'),
  'stats': require('../../lib/handlers/dashboard-stats'),
  'trigger-page': require('../../lib/handlers/dashboard-trigger-page'),
  'action-code': require('../../lib/handlers/dashboard-action-code'),
  'action-code-nafath': require('../../lib/handlers/dashboard-action-code-nafath'),
  'delete-user': require('../../lib/handlers/dashboard-delete-user'),
  'delete-all': require('../../lib/handlers/dashboard-delete-all'),
};

module.exports = async (req, res) => {
  const pathSegments = req.query.path;
  const route = Array.isArray(pathSegments) ? pathSegments.join('/') : pathSegments;

  const handler = handlers[route];
  if (handler) {
    return handler(req, res);
  }

  // Try extracting route from URL as fallback
  const urlPath = req.url.replace(/^\/api\/dashboard\//, '').split('?')[0];
  const fallback = handlers[urlPath];
  if (fallback) {
    return fallback(req, res);
  }

  res.status(404).json({ error: 'Not found', debug: { path: pathSegments, url: req.url, route, urlPath, keys: Object.keys(handlers) } });
};
