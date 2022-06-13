import rfdc from "rfdc";
const clone = rfdc();

const LOAD_ALL_REVIEWS = "/api/reviews/LOAD_REVIEWS";

const allReviews = reviews => {
    return {
        type: LOAD_ALL_REVIEWS,
        reviews
    };
}

export const getReviews = (listingId) => async dispatch => {
    const response = await fetch(`/api/reviews/${listingId}`);
    if (response.ok) {
        const reviews = await response.json();
        dispatch(allReviews(reviews));
    }
}

const initialState = {}

const reviewReducer = (state = initialState, action) => {
    let newState = clone(state)
    switch (action.type) {
        case LOAD_ALL_REVIEWS:
            const reviews = action.reviews.reviews
            reviews.forEach(review => {
                newState[review.id] = review
            }
            )
            return newState
        default:
            return state
    }
}

export default reviewReducer
