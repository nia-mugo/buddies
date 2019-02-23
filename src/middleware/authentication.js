'use strict';

/**
 * Check For Protected Routes
 * 
 * @param {object} req 
 * @return {boolean}
 */
function isProtectedRoute(req) {
  const protectedRoutes = ['/'];
  for (const route of protectedRoutes) {
    if (route === req.path) {
      return true;
    }
  }
  return false;
}

/**
 * Check for Public Routes
 * 
 * @param {object} req 
 * @return {boolean} 
 */
function isPublicRoute(req) {
  const publicRoutes = ['/login', '/register'];
  for (const route of publicRoutes) {
    if (route === req.path) {
      return true;
    }
  }
  return false;
}

/**
 * Authentication Middleware
 * 
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 * 
 * TODO: Persist user sessions to db
 */
async function authenticationMiddleWare(req, res, next) {
  if(isProtectedRoute(req)) {
    if(!req.cookies.user_sid) {
      res.redirect('/login'); 
    }

    if (req.cookies.user_sid && !req.session.user) {
      res.clearCookie('user_sid');  
      res.redirect('/login');  
    }
  }

  if(isPublicRoute(req)) {
    if (req.cookies.user_sid && req.session.user) { 
      res.redirect('/');  
    }
  }

  if(req.path === '/logout') {
    res.clearCookie('user_sid');  
    res.redirect('/login');  
  }
  
  next();
}

module.exports = authenticationMiddleWare;