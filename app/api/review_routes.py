from flask import Blueprint, jsonify, request
from app.models.user import User
from app.models.review import Review
from app.forms.review_form import ReviewCreateForm, ReviewUpdateForm
from app.models import db

review_routes = Blueprint("review_routes", __name__)

@review_routes.route("/<int:id>")
def all_reviews(id):
    reviews = Review.query.filter(Review.listing_id == id)
    return {"reviews": [review.to_dict() for review in reviews]}


@review_routes.route("/", methods=["POST"])
def add_review():
    form = ReviewCreateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review(
            comment=form.comment.data,
            rating=form.rating.data,
            user_id=form.user_id.data,
            agent_id=form.agent_id.data
        )

        db.session.add(review)
        db.session.commit()

        return review.to_dict()
    return jsonify(form.errors), 400

@review_routes.route("/<int:id>", methods=["PUT"])
def update_review(id):
    review = Review.query.get(id)
    form = ReviewUpdateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit:
        review.comment = form.comment.data
        review.rating = form.rating.data

    db.session.add(review)
    db.session.commit()
    return review.to_dict()

@review_routes.route("/<int:id>", methods=["DELETE"])
def delete_review(id):
    review = Review.query.get(id)
    db.session.delete(review)
    db.session.commit()
    return review.to_dict()
