from flask import Blueprint, jsonify, request
from app.models.user import User
from app.models.review import Review
from app.forms.review_form import ReviewCreateForm, ReviewUpdateForm
from app.models import db

review_routes = Blueprint("review_routes", __name__)

@review_routes.route("/")
