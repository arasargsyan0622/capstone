import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getAgents } from "../../store/agent";
import ReviewDisplay from '../reviews/reviews_display';
import AgentCard from './agentsCard';


function AgentDisplay() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [ isLoaded, setIsLoaded ] = useState(false)
    useEffect(() => {
        if (!session.user) {
            history.push('/login');
        }

        dispatch(getAgents());
        setIsLoaded(true)
    }, [dispatch]);

    const agents = Object.values(useSelector(state => state.agents));
    const session = useSelector(state => state.session);

    if(!isLoaded) return null

    return (
        isLoaded && (
            <div className='agent-body'>
                <div className='agent-display-header'>
                    <h1 className='agent-header'>Find an Agent Who Knows Your Market Best</h1>
                    {/* <div className='search'>Search (in progress)</div> */}
                </div>
                <div className='agent container'>
                    {agents.map(agent => (
                        <div className="daddy-container" key={agent.id}>
                            <Link className="agent-name" to={`/agents/${agent.id}`}><AgentCard agent={agent}/></Link>
                        </div>
                    ))}
                </div>
            </div>
        )
    )
}

export default AgentDisplay;
