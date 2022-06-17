import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { deleteReview } from '../../store/review'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

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
            <button className="delete-btn-review" onClick={handleSubmit}><FontAwesomeIcon icon={faTrash}/></button>
        </div>
    )
}

export default DeleteReview
