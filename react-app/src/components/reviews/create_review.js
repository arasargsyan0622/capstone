import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addReview } from "../../store/review";

const NewReview = ({ setShow }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { agentId } = useParams();
    console.log("agentId", agentId)
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const userId = useSelector(state => state.session.user?.id);



    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            comment,
            rating,
            user_id: userId,
            agent_id: agentId
        };

        await dispatch(addReview(payload));
        history.push(`/agents/${agentId}`);
        setShow(false);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Comment:</label>
                <textarea
                    name="comment"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <label>Rating:</label>
                <select onChange={e=>setRating(e.target.value)}>
                    <option value="1" >1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewReview
