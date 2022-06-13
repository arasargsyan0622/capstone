from flask import Blueprint, jsonify, request
from app.models.user import User
from app.models.agent import Agent
from app.forms.agent_form import AgentCreateForm
from app.models import db

agent_routes = Blueprint("agent_routes", __name__)

@agent_routes.route("/")
def all_agents():
    agents = Agent.query.all()
    print("in agent route", agents)
    return {"agents": [agent.to_dict() for agent in agents]}

@agent_routes.route("/<int:id>")
def get_agent(id):
    agent = Agent.query.get(id)
    return agent.to_dict()
    
