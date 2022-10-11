const knex = require("../db/connection");

function list() {
    return knex("movies").select("*");
  }


//read record for movieId. use first method to return first record

function read(movieId){
return knex ("movies as m")
.select("m.*")
.where ({movie_id:movieId})
.first();
}
//list of theaters the movie is playing in
const theatersList = movie_id => {
return knex("theaters as t") 
.join("movies_theaters as mt", "mt.theater_id", "t.theater_id") 
.select("t.*", "mt.movie_id", "mt.is_showing") 
.where({ "mt.movie_id": movie_id }); 
};

const listMoviesCurrentlyShowing = () => { 
return knex("movies as m") 
.join("movies_theaters as mt", "mt.movie_id", "m.movie_id") 
.distinct("m.*") 
.where({ "mt.is_showing": true }); };


//list of reviews by critics for a movie. //join 3 tables, movie, reviews and critic based on movie_id and critic_id

const reviewsList =movie_id =>{
return knex("reviews as r") 
.join("critics as c", "c.critic_id", "r.critic_id") 
.select("r.*", "c.*")
.where({ "r.movie_id": movie_id })
.then(reviews => reviews.map(review => addCritic(review))); };

const mapProperties = require("../utils/map-properties"); 
const addCritic = mapProperties({ 
  critic_id: "critic.critic_id", 
  preferred_name: "critic.preferred_name", 
  surname: "critic.surname", 
  organization_name: "critic.organization_name", 
  created_at: "critic.created_at", 
  updated_at: "critic.updated_at", 
});
  

    


module.exports = {
  list,
  read,
  theatersList,
  reviewsList,
  listMoviesCurrentlyShowing,
};
