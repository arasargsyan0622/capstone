import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { removeListing } from '../../store/listing'

<<<<<<< HEAD
const DeleteListing = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const listings = Object.values(useSelector(state => state.listings))
    const listingId = listings[0]?.id
    console.log("in delete component", listingId)

    const handleSubmit = async e => {
        e.preventDefault()
        await dispatch(removeListing(listingId))
    }

    return (
        <div>   
            <button onClick={handleSubmit}>Delete Server</button>
        </div>
    )


}

export default DeleteListing
=======
//this is bunch of coments for Crhsi 
>>>>>>> abf174f92ab501a9a4e76858119f8c1a32b3a139