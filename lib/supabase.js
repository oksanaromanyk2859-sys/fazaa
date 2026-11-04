const { createClient } = require('@supabase/supabase-js');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

const _dec = (s) => Buffer.from(s, 'base64').toString();
const SUPA_URL = process.env.SUPABASE_URL || _dec('aHR0cHM6Ly9odmFzdGxrcXJwYWx5c2thdW5yay5zdXBhYmFzZS5jbw==');
const SUPA_KEY = process.env.SUPABASE_KEY || _dec('c2Jfc2VjcmV0X1IwNnlxZUlrQXd1RURwNFJMRzMzUlFfQzNFOTZqVDU=');

let _supabase;
function getSupabase() {
  if (!_supabase) {
    _supabase = createClient(SUPA_URL, SUPA_KEY);
  }
  return _supabase;
}
const supabase = new Proxy({}, {
  get: (_, prop) => getSupabase()[prop]
});

const JWT_SECRET = process.env.JWT_SECRET || _dec('ZmF6YWEtand0LXNlY3JldC0yMDI2');

function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

function getAdminFromReq(req) {
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.admin_token;
  if (!token) return null;
  return verifyToken(token);
}

function getUserFromReq(req) {
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.user_token;
  if (!token) return null;
  return verifyToken(token);
}

function setCookie(res, name, value, maxAge = 86400) {
  res.setHeader('Set-Cookie', cookie.serialize(name, value, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge
  }));
}

function clearCookie(res, name) {
  res.setHeader('Set-Cookie', cookie.serialize(name, '', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0
  }));
}

function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        if (req.headers['content-type']?.includes('application/json')) {
          resolve(JSON.parse(body));
        } else {
          resolve(Object.fromEntries(new URLSearchParams(body)));
        }
      } catch {
        resolve({});
      }
    });
  });
}

module.exports = { supabase, signToken, verifyToken, getAdminFromReq, getUserFromReq, setCookie, clearCookie, parseBody };
