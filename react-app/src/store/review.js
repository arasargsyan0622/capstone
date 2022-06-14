import rfdc from "rfdc";
const clone = rfdc();

const LOAD_ALL_REVIEWS = "/api/reviews/LOAD_REVIEWS";
const ADD_REVIEW = "/api/reviews/ADD_REVIEW";
const EDIT_REVIEW = "/api/reviews/EDIT_REVIEW"

const allReviews = reviews => {
    return {
        type: LOAD_ALL_REVIEWS,
        reviews
    };
}

const createReview = review => {
    return {
        type: ADD_REVIEW,
        review
    };
}

const editReview = review => {
    return {
        type: EDIT_REVIEW,
        review
    }
}

export const getReviews = (agentId) => async dispatch => {
    const response = await fetch(`/api/agents/${agentId}/reviews`);
    // console.log("response", response)
    if (response.ok) {
        const reviews = await response.json();
        console.log("reviews ini get reviews", reviews)
        dispatch(allReviews(reviews));
        return reviews;
    }
}

export const addReview = (data) => async dispatch => {
    // console.log("Data", data)
    const formData = new FormData()
    formData.append("comment", data.comment)
    formData.append("rating", data.rating)
    formData.append("agent_id", data.agent_id)
    formData.append("user_id", data.user_id);

    const response = await fetch(`/api/agents/${data.agent_id}/reviews`, {
        method: "POST",
        body: formData
    });
    if (response.ok) {
        const newReview = await response.json();
        dispatch(createReview(newReview));
        return newReview;
    }
}

export const updateReview = (data) => async dispatch => {
    const formData = new FormData()
    formData.append("comment", data.comment)
    formData.append("rating", data.rating)
    console.log("data", data)
    const response = await fetch(`/api/agents/${data.id}/reviews/${data.review_id}`, {
        method: "PUT",
        body: formData
    });
    if (response.ok) {
        const editedReview = await response.json();
        dispatch(editReview(editedReview));
        return editedReview;
    }
}

const initialState = {}

const reviewReducer = (state = initialState, action) => {
    let newState = clone(state)
    switch (action.type) {
        case LOAD_ALL_REVIEWS:
            const reviews = action.reviews.reviews
            // console.log("reviews in reduceer", reviews)
            reviews.forEach(review => {
                newState[review.id] = review
            })
            return newState
        case ADD_REVIEW:
            newState[action.review.id] = action.review;
            return newState
        case EDIT_REVIEW:
            delete newState[action.review.id]
            newState[action.review.id] = action.review;
            return newState
        default:
            return state
    }
}

export default reviewReducer
