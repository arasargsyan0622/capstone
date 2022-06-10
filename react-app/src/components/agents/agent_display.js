import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAgents } from "../../store/agent";

function AgentDisplay() {
    const dispatch = useDispatch();
    const history = useHistory();
    const agents = Object.values(useSelector(state => state.agents));
    const session = useSelector(state => state.session);

    useEffect(() => {
        if (!session.user) {
            history.push('/login');
        }

        dispatch(getAgents());
    }, [dispatch]);

    return (
        <div>
            <h1>Agents</h1>
            <div>
                {agents.map(agent => (
                    <div key={agent.id}>
                        <a href={`/agents/${agent?.id}`}>Name: {agent?.first_name} {agent?.last_name}</a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AgentDisplay;
