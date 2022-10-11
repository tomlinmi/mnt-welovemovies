const service = require("./reviews.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function list(req, res, next) {
    // your solution here
    res.json({ data: await service.list() });
  }


async function read(req, res, next) {
    const knexInstance = req.app.get("db");
    const {review } = res.locals;
    res.json({ data: review });
  }



//read handler required
async function reviewIsValid(req, res, next) {
const { reviewId } = req.params;
const matchingReview = await service.read(reviewId);
if (matchingReview) {
res.locals.review = matchingReview;
return next();
}
return next({ status: 404, message: "Review cannot be found." });
}

//update handler
async function update(req, res) {
const updatedReview = { ...res.locals.review, ...req.body.data };
await service.update(updatedReview);
const reviewToReturn = await service.getReviewWithCritic(
res.locals.review.review_id
);
res.json({ data: reviewToReturn });
}
 
async function destroy(req, res) {
await service.delete(res.locals.review.review_id);
    res.sendStatus(204);
  }


module.exports = {
delete: [asyncErrorBoundary(reviewIsValid), asyncErrorBoundary(destroy)],
update: [asyncErrorBoundary(reviewIsValid), asyncErrorBoundary(update)],
};