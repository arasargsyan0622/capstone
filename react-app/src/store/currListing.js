import rfdc from "rfdc"
const clone = rfdc()

const LOAD_LISTING = "/api/listings/LOAD_LISTING"

const oneListing = listing => {
    return {
        type: LOAD_LISTING,
        listing
    }
}

export const getListing = id => async dispatch => {
    const response = await fetch(`/api/listings/${id}`)
    if(response.ok) {
        const listing = await response.json()
        dispatch(oneListing(listing))
    }
}

const initialState = {}

const currListingReducer = (state = initialState, action) => {
    let newState = clone(state)
    switch(action.type) {
        case LOAD_LISTING:
            newState[action.listing.id] = action.listing
            return newState
        default:
            return state
    }
}

export default currListingReducer
