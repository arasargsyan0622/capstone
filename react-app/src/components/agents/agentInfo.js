import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { getAgent } from "../../store/agent";
import AgentProfile from './agentProfile';


function SingleAgent() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { agentId } = useParams();
    const agents = Object.values(useSelector(state => state.agents));
    const session = useSelector(state => state.session);

    useEffect(() => {
        if (!session.user) {
            history.push('/login');
        }

        dispatch(getAgent(agentId));
    }, [dispatch]);

    return (
        <div>
            <div>
                <AgentProfile agent={agents[agentId-1]} />
            </div>
        </div>
    )
}

export default SingleAgent;
