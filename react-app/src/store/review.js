import rfdc from "rfdc";
const clone = rfdc();

const LOAD_ALL_REVIEWS = "/api/reviews/LOAD_REVIEWS";

const allReviews = reviews => {
    return {
        type: LOAD_ALL_REVIEWS,
        reviews
    };
}

export const getReviews = (agentId) => async dispatch => {
    const response = await fetch(`/api/agents/${agentId}`);
    if (response.ok) {
        const reviews = await response.json();
        dispatch(allReviews(reviews));
        return reviews;
    }
    return agentId
}

const initialState = {}

const reviewReducer = (state = initialState, action) => {
    let newState = clone(state)
    switch (action.type) {
        case LOAD_ALL_REVIEWS:
            // const reviews = action.reviews.reviews
            // console.log("reviews in reduceer", reviews)
            // reviews.forEach(review => {
            //     newState[review.id] = review
            // })
            return newState
        default:
            return state
    }
}

export default reviewReducer
