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

  res.status(404).json({ error: 'Not found' });
};
