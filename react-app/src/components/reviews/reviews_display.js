import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useParams } from 'react-router-dom';

import { getReviews } from "../../store/review";

const ReviewDisplay = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { agentId } = useParams();

    const reviews = useSelector(state => state.reviews);
    // console.log("reviews", reviews)

    useEffect(() => {
        dispatch(getReviews(agentId));
    }
    , [dispatch]);


    return (
        <div>
            <h2>Reviews</h2>
            {/* <div>
                {reviews.map(review => (
                    <div review={review}>{review?.comment}</div>
                ))}
            </div> */}
        </div>
    )
}

export default ReviewDisplay;
