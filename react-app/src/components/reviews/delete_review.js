import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { deleteReview } from '../../store/review'

const DeleteReview = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const { reviewId, agentId } = useParams()

    const handleSubmit = async e => {
        e.preventDefault()
        await dispatch(deleteReview(reviewId))
        history.push(`/agents/${agentId}`)
    }

    return (
        <div>
            <button onClick={handleSubmit}>Delete Review</button>
        </div>
    )
}

export default DeleteReview
