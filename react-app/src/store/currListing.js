import rfdc from "rfdc"
const clone = rfdc()

const LOAD_LISTING = "/api/curr_listing/LOAD_LISTING"
const CLEAN_CURRENT_LISTING = "/api/curr_listing/CLEAN_CURRENT_LISTING"

const oneListing = listing => {
    return {
        type: LOAD_LISTING,
        listing
    }
}

export const getListing = id => async dispatch => {
    // console.log("in thunk of currlisting", id)
    const response = await fetch(`/api/listings/${id}`)
    if(response.ok) {
        const listing = await response.json()
        dispatch(oneListing(listing))
        return listing
    }
}

export const cleanCurrentListing = () => {
    return {
        type: CLEAN_CURRENT_LISTING
    }
}


const initialState = {}

const currListingReducer = (state = initialState, action) => {
    let newState = clone(state)
    switch(action.type) {
        case LOAD_LISTING:
            // console.log("in reducer of currlisting", newState)
            newState[action.listing.id] = action.listing
            return newState
        case CLEAN_CURRENT_LISTING:
            const cleanState = {}
            return cleanState
        default:
            return state
    }
}

export default currListingReducer
