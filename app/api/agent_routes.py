from flask import Blueprint, jsonify, request
from app.models.user import User
from app.models.agent import Agent
from app.forms.agent_form import AgentCreateForm
from app.models import db

agent_routes = Blueprint("agent_routes", __name__)

@agent_routes.route("/")
def all_agents():
    agents = Agent.query.all()
    return {"agents": [agent.to_dict() for agent in agents]}

