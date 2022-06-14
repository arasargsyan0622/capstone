import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useParams } from 'react-router-dom';
import { getReviews } from "../../store/review";
import EditReviewModal from "../modal/EditReviewModal";
import DeleteReview from "./delete_review";


const ReviewDisplay = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { agentId } = useParams();
    const user = useSelector(state => state.session.user);
    const reviews = Object.values(useSelector(state => state.reviews));

    useEffect(() => {
        //make the cleanstate and dispatch before dispatching getReviews
        dispatch(getReviews(agentId));
    }
    , [dispatch]);


    return (
        <div>
            <h2>Reviews</h2>
            <div>
                {reviews.map(review => (
                    <>
                        <div key={review?.id}>
                            <a href={`/agents/${agentId}/reviews/${review?.id}`}>Comment: {review?.comment}</a>
                        </div>
                        <EditReviewModal review={review} user={user}></EditReviewModal>
                        { (user?.id === review?.user_id) ? <DeleteReview></DeleteReview> : <></> }
                    </>
                ))}
            </div>
        </div>
    )
}

export default ReviewDisplay;
