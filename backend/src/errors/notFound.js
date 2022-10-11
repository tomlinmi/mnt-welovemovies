/**
 * Express API "Not found" handler. "request is made to a route that does not exist"
 */
 function notFound(req, res, next) {
    next({ status: 404, message: `Path not found: ${req.originalUrl}` });
  }
  
  module.exports = notFound;
  