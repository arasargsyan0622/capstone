import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  useHistory, useParams } from 'react-router-dom';
import { updateReview } from '../../store/review';
import "./editreview.css"

function EditReview({ setShow }) {
    const history = useHistory();
    const dispatch = useDispatch();

    const reviews = Object.values(useSelector(state => state.reviews));
    let reviewComment
    let reviewRating
    let reviewId
    reviews.map((review) => {
        reviewComment = review.comment
        reviewRating = review.rating
        reviewId = review.id
    })
    const [comment, setComment] = useState(reviewComment);
    const [rating, setRating] = useState(reviewRating);

    const { agentId } = useParams()

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            comment,
            rating,
            id: agentId,
            review_id: reviewId
        }
        dispatch(updateReview(payload));
        history.push(`/agents/${agentId}`);
        setShow(false)
    }

    return(
        <div>
            <form className='edit-review-form' onSubmit={handleSubmit}>
                <div className='comment-edit-container'>
                <label className='comment-label'>Comment:</label>
                <textarea
                    className='comment-edit-textarea'
                    name="comment"
                    value={comment}
                    required
                    onChange={(e) => setComment(e.target.value)}
                />
                </div>
                <div className='rating-container'>
                    <label className='rating-label'>Rating:</label>
                    <select onChange={e=>setRating(e.target.value)}>
                        <option value={rating}>1</option>
                        <option value={rating}>2</option>
                        <option value={rating}>3</option>
                        <option value={rating}>4</option>
                        <option value={rating}>5</option>
                    </select>
                </div>
                <button className="edit-review-btn" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default EditReview
