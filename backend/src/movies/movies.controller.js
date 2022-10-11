
const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


//returns list where is_showing is true
async function list(req, res) {
if (req.query) { 
  req.query.is_showing === "true" && res.json({ data: await service.listMoviesCurrentlyShowing() 
                                              }); 
} res.json({ data: await service.list() 
           });
}

async function movieExists(req, res, next) {
    const { movieId } = req.params;
  
    const movie = await service.read(movieId);
    if (movie) {
      res.locals.movie = movie;
      return next();
    }
    return next({ status: 404, message: `Movie cannot be found.` });
  }



async function read(req, res, next) {
    const knexInstance = req.app.get("db");
    const {movie } = res.locals;
    res.json({ data: movie });
  }


async function theatersList(req, res, next) {
const movie = res.locals.movie.movie_id; 
  res.json({ data: await service.theatersList (movie) });
    }


async function reviewsList(req, res, next) {
const movie = res.locals.movie.movie_id; 
  res.json({ data: await service.reviewsList (movie) });
    }
      
      
  
    

module.exports = {
  list: asyncErrorBoundary(list),
  theatersList: [ asyncErrorBoundary(movieExists), asyncErrorBoundary(theatersList), ],
  reviewsList: [ asyncErrorBoundary(movieExists), asyncErrorBoundary(reviewsList), ],
  read: [asyncErrorBoundary(movieExists), read],

};