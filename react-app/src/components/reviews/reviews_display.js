import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useParams } from 'react-router-dom';
import { getReviews, cleanCurrentReview } from "../../store/review";
import EditReviewModal from "../modal/EditReviewModal";
import NewReviewModal from "../modal/NewReviewModal";
import DeleteReview from "./delete_review";

import "./reviews.css"


const ReviewDisplay = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { agentId } = useParams();
    const user = useSelector(state => state.session.user);
    const reviews = Object.values(useSelector(state => state.reviews));

    useEffect(() => {
        //make the cleanstate and dispatch before dispatching getReviews
        dispatch(getReviews(agentId))
        return () => {
            dispatch(cleanCurrentReview())
        }
    }, [dispatch]);


    return (
        <div>
            <div className="reviews-header-container">
                <div className="reviews-header-text">Reviews</div>
                <NewReviewModal />
            </div>
            <div className="reviews-container">
                {reviews.map(review => (
                    <Link to={`/agents/${agentId}/reviews/${review?.id}`} className="review-card">
                        <div className="comment-section" key={review?.id}>
                            <div className="comment">{review?.comment}</div>
                            <div className="rating">Rating: {review?.rating}</div>
                        </div>
                        <div className="review-btns">
                            <EditReviewModal className="meow" review={review} user={user}></EditReviewModal>
                            { (user?.id === review?.user_id) ? <DeleteReview></DeleteReview> : <></> }
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default ReviewDisplay;
