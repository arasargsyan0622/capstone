import rfdc from "rfdc"
const clone = rfdc()

const LOAD_AGENTS = "/api/agents/LOAD_AGENTS"
const GET_AGENT = "api/agents/GET_AGENT"

const allAgents = agents => {
    return {
        type: LOAD_AGENTS,
        agents
    }
}

const oneAgent = agent => {
    return {
        type: GET_AGENT,
        agent
    }
}

export const getAgents = () => async dispatch => {
    const response = await fetch("/api/agents/")
    if(response.ok) {
        const agents = await response.json()
        dispatch(allAgents(agents))
    }
}

export const getAgent = (id) => async dispatch => {
    const response = await fetch(`/api/agents/${id}`)
    if(response.ok) {
        const agent = await response.json()
        dispatch(oneAgent(agent))
    }
}

const initialState = {}

const agentReducer = (state = initialState, action) => {
    let newState = clone(state)
    switch(action.type) {
        case LOAD_AGENTS:
            const agents = action.agents.agents
            agents.forEach(agent => {
                newState[agent.id] = agent
            })
            return newState
        case GET_AGENT:
            newState[action.agent.id] = action.agent
            return newState
        default:
            return state
    }
}

export default agentReducer
