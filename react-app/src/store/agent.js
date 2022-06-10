import rfdc from "rfdc"
const clone = rfdc()

const LOAD_AGENTS = "/api/agents/LOAD_AGENTS"

const allAgents = agents => {
    return {
        type: LOAD_AGENTS,
        agents
    }
}

export const getAgents = () => async dispatch => {
    const response = await fetch("/api/agents/")
    if(response.ok) {
        const agents = await response.json()
        dispatch(allAgents(agents))
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
        default:
            return state
    }
}

export default agentReducer
