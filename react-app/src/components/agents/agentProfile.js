import React from "react";
import "./agentInfo.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faInbox, faPhone,  } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { Link } from "react-router-dom";

function AgentProfile({ agent }) {
    return (
        <>
            <div className='agent-profile-info'>
                <div className="agent-left-side">
                    <div className="agent-profile-name">{agent?.first_name} {agent?.last_name}</div>
                    <div className="agent-profile-location"><FontAwesomeIcon icon={faLocationDot}/> {agent?.location}</div>
                    <div className="agent-profile-email"><FontAwesomeIcon icon={faInbox}/> {agent?.email}</div>
                    <div className="agent-profile-phone"><FontAwesomeIcon icon={faPhone}/> {agent?.phone}</div>
                    <div className="agent-profile-license">Agent License # {agent?.license_number}</div>
                    <div className="links">
                        <Link className="agent-github" to={agent?.github} target="_blank"><FontAwesomeIcon icon={faGithub}/></Link>
                        <Link className="agent-linkedin" to={agent?.linkedin} target="_blank"><FontAwesomeIcon icon={faLinkedin}/></Link>
                    </div>
                </div>
                <img className="agent-img" src={agent?.photo}></img>
            </div>
            <div className="agent-profile-bottom">
                <div className="agent-profile-bottom-name">About {agent?.first_name}</div>
                <div className="agent-profile-bio">{agent?.bio}</div>
            </div>
        </>
    )
}

export default AgentProfile
