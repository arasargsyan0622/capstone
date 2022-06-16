import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import { cleanCurrentListing } from '../../store/currListing';
import { getListing } from "../../store/currListing"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faBath, faVectorSquare  } from '@fortawesome/free-solid-svg-icons'
import EditListingModal from '../modal/EditListingModal';
import DeleteListing from "./delete_listing"
import "./singlelisting.css"


function Listing() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { listingId } = useParams()
    const listings = Object.values(useSelector(state => state.curr_listing));
    console.log("currLisnting", listings)
    const user = useSelector(state => state.session.user);
    const session = useSelector(state => state.session);

    useEffect(() => {
        if (!session.user) {
            history.push('/login');
        }

        dispatch(getListing(listingId))
        return () => {
            dispatch(cleanCurrentListing())
        }
    }, [dispatch]);

    return(
        <div>
            <div className='single-listing-header-container'>
                {listings.map(listing => (
                    <>
                        <EditListingModal listing={listing} user={user}></EditListingModal>
                        { (user?.id === listing?.user_id) ? <DeleteListing></DeleteListing> : <></> }
                        <div className='single-listing-header'>
                            <div className='address-icons'>
                                <div>{listing?.address}</div>
                                <div><FontAwesomeIcon icon={faBed}/></div>
                                <div><FontAwesomeIcon icon={faBath}/></div>
                                <div><FontAwesomeIcon icon={faVectorSquare}/></div>
                            </div>
                            <div className='city-numbers'>
                                <div>{listing?.city}, {listing?.state} {listing?.zipcode}</div>
                                <div>{listing?.bedrooms} Beds {listing?.bathrooms} Baths {listing?.size} SQ FT</div>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </div>
    )
}

export default Listing
