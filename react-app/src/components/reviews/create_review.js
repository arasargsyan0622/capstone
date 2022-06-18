import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addReview } from "../../store/review";
import "./addreview.css"

const NewReview = ({ setShow }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { agentId } = useParams();
    // console.log("agentId", agentId)
    const [errors, setErrors] = useState([])
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState("Choose a rating");
    const userId = useSelector(state => state.session.user?.id);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([])
        let errorArray = []

        if (comment.length < 3 || comment.length > 500) {
            errorArray.push("Comment must be between 3 and 500 characters")
        }

        if(rating === "Choose a rating") {
            errorArray.push(["Please choose a rating"])
        }

        if(errorArray.length) {
        setErrors(errorArray)
        return
        }

        const payload = {
            comment,
            rating,
            user_id: userId,
            agent_id: agentId
        };

        const createReview = await dispatch(addReview(payload));
        if (createReview) {
            history.push(`/agents/${agentId}`);
            setShow(false);
        }
    }

    return (
        <div>
            <form className="add-review-form" onSubmit={handleSubmit}>
                <div className="listing-errors">
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <label className="comment-label">Comment:</label>
                <textarea
                    className="comment-add-review"
                    name="comment"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <div className="rating-container">
                    <label className="rating-label">Rating:</label>
                    <select onChange={e=>setRating(e.target.value)}>
                        <option selected disabled>Choose a rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <button className="add-review-btn" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewReview
