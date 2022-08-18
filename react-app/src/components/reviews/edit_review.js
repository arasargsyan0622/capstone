import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  useHistory, useParams } from 'react-router-dom';
import { updateReview } from '../../store/review';
import "./editreview.css"
import { getReview } from "../../store/currReview";

function EditReview({ setShow }) {
    const history = useHistory();
    const dispatch = useDispatch();

    const { reviewId } = useParams()

    const reviews = Object.values(useSelector(state => state.reviews));
    const review = Object.values(useSelector(state => state.curr_review))[0]
    const reviewComment = review?.comment
    const reviewRating = review?.rating


    const [errors, setErrors] = useState([])
    const [comment, setComment] = useState(reviewComment);
    const [rating, setRating] = useState(reviewRating);

    const { agentId } = useParams()

    const handleSubmit = (e) => {
        e.preventDefault()
        let errorArray = []
        setErrors([])

        if (comment.length < 3 || comment.length > 500) {
            errorArray.push("Comment must be between 3 and 500 characters")
        }

        if(errorArray.length) {
        setErrors(errorArray)
        return
        }

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
                <div className="listing-errors">
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div className='comment-edit-container'>
                <label className='comment-label'>Change Your Comment:</label>
                <textarea
                    className='comment-edit-textarea'
                    name="comment"
                    value={comment}
                    required
                    onChange={(e) => setComment(e.target.value)}
                />
                </div>
                <div className='rating-container'>
                    <label className='rating-label'>Change Your Rating:</label>
                    <select value={rating} onChange={e=>setRating(e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <button className="edit-review-btn" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default EditReview
