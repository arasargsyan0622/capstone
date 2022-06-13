import React from "react";
import "./agentCard.css"


function AgentCard({ agent }) {
    return (
        <div className="agents-list">
            <img className="agent-img" src={agent.photo}></img>
            <div className="agent-info">
                <h1 className="agent-name">{agent.first_name} {agent.last_name}</h1>
                <div className="agent-email">{agent.email}</div>
                <div className="agent-location">{agent.location}</div>
                <div className="agent-license-number">License #{agent.license_number}</div>
            </div>
       </div>
    )
}

export default AgentCard
