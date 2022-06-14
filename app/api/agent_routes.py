from flask import Blueprint, jsonify, request
from app.models.user import User
from app.models.agent import Agent
from app.models.review import Review
from app.forms.agent_form import AgentCreateForm
from app.models import db

agent_routes = Blueprint("agent_routes", __name__)

@agent_routes.route("/")
def all_agents():
    agents = Agent.query.all()
    return {"agents": [agent.to_dict() for agent in agents]}

@agent_routes.route("/<int:id>")
def get_agent(id):
    agent = Agent.query.get(id)
    return agent.to_dict()


# reviews

@agent_routes.route("/<int:id>/reviews")
def all_reviews(id):
    agent = Agent.query.get(id)
    reviews = agent.reviews
    print("reviews in route ---------==-=-=-=-=-==============-=-=-=", reviews)
    return {"reviews" : [review.to_dict() for review in reviews]}

@agent_routes.route("/<int:id>/reviews", methods=["POST"])
def add_review(id):
    agent = Agent.query.get(id)
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

@agent_routes.route("/<int:id>/reviews/<int:review_id>", methods=["PUT"])
def update_review(agent_id, review_id):
    review = Review.query.get(review_id)
    form = ReviewUpdateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit:
        review.comment = form.comment.data
        review.rating = form.rating.data

        db.session.add(review)
        db.session.commit()
        agent = Agent.query.get(agent_id)
        reviews = agent.reviews

        return {"reviews": [review.to_dict() for review in reviews]}
    return jsonify(form.errors), 400

@agent_routes.route("/<int:id>/reviews/<int:review_id>", methods=["DELETE"])
def delete_review(agent_id, review_id):
    review = Review.query.get(review_id)
    db.session.delete(review)
    db.session.commit()
    agent = Agent.query.get(agent_id)
    reviews = agent.reviews
    return {"reviews": [review.to_dict() for review in reviews]}
