import React from "react";
import "./agentInfo.css"


function AgentProfile({ agent }) {
    return (
        <>
            <div className='agent-profile-info'>
                <div>{agent?.first_name} {agent?.last_name}</div>
                <div>{agent?.location}</div>
                <div>{agent?.email}</div>
                <div>{agent?.phone}</div>
                <div>{agent?.license_number}</div>
                <img className="agent-img" src={agent?.photo}></img>
            </div>
            <div>{agent?.bio}</div>
        </>
    )
}

export default AgentProfile
