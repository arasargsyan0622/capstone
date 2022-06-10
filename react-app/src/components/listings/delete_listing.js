import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { removeListing } from '../../store/listing'

const DeleteListing = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const { listingId } = useParams()

    const handleSubmit = async e => {
        e.preventDefault()
        await dispatch(removeListing(listingId))
        history.push("/listings")
    }

    return (
        <div>
            <button onClick={handleSubmit}>Delete Server</button>
        </div>
    )
}

export default DeleteListing
