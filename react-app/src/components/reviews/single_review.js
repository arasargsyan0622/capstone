import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import { getAgent } from '../../store/agent';
import { getReview, cleanCurrentReview } from '../../store/currReview';
import EditReviewModal from '../modal/EditReviewModal';
import DeleteReview from './delete_review';



function Review() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { agentId, reviewId } = useParams()
    const review = Object.values(useSelector(state => state.curr_review));
    const user = useSelector(state => state.session.user);
    const session = useSelector(state => state.session);
    const agent = useSelector(state => state.agents[agentId]);

    useEffect(() => {
        if (!session.user) {
            history.push('/login');
        }

        dispatch(getAgent(agentId)).then(() => dispatch(getReview(agentId, reviewId)))
        return () => {
            dispatch(cleanCurrentReview())
        }
    }, [dispatch]);

    return (
        <div className='everything'>
            {review.map(review => (
                <div className='single-reviews-container'>
                    <img className="img-agent" src={agent?.photo}></img>
                    <div className='except-img'>
                        <div className="single-comment-section" key={review?.id}>
                            <h1 className='comment-header'>{session.user.firstName}'s Review</h1>
                            <div className="single-comment-container">
                                <div className="single-comment">{review?.comment}</div>
                            </div>
                            <div className="single-rating-container">
                                <div className="single-rating">Rating: {review?.rating}</div>
                            </div>
                        </div>
                        <div className='singe-review-btns'>
                            <EditReviewModal review={review} user={user}></EditReviewModal>
                            { (user?.id === review?.user_id) ? <DeleteReview></DeleteReview> : <></> }
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Review
