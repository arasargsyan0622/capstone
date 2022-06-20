import rfdc from "rfdc"
const clone = rfdc()

const LOAD_REVIEW = "/api/curr_review/LOAD_REVIEW"
const CLEAN_CURRENT_REVIEW = "/api/curr_review/CLEAN_CURRENT_REVIEW"


const oneReview = review => {
    return {
        type: LOAD_REVIEW,
        review
    }
}

export const getReview = (id, reviewId) => async dispatch => {
    // console.log("id in single review thunk", id)
    const response = await fetch(`/api/agents/${id}/reviews/${reviewId}`)
    if(response.ok) {
        const review = await response.json()
        dispatch(oneReview(review))
        return review
    }
}

export const cleanCurrentReview = () => {
    return {
        type: CLEAN_CURRENT_REVIEW
    }
}


const initialState = {}

const currReviewReducer = (state = initialState, action) => {
    let newState = clone(state)
    switch(action.type) {
        case LOAD_REVIEW:
            newState[action.review.id] = action.review
            return newState
        case CLEAN_CURRENT_REVIEW:
            const cleanState = {}
            return cleanState
        default:
            return state
    }
}

export default currReviewReducer
