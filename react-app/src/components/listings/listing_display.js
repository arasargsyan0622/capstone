import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getListings } from "../../store/listing"
import { getAgents } from "../../store/agent";
import NewListingModal from '../modal/NewListingModal';
import EditListingModal from '../modal/EditListingModal';
import DeleteListing from "./delete_listing"
import "./listingdisplay.css"

function Listings({agent}) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const listings = Object.values(useSelector(state => state.listings));
    const user = useSelector(state => state.session.user);
    const session = useSelector(state => state.session);

    useEffect(() => {
        if (!session.user) {
            history.push('/login');
        }

        dispatch(getAgents())
            .then(() => dispatch(getListings()))
    }, [dispatch]);

    return (
        // isLoaded ? (
        <div>
            <h1>Listings</h1>
            <div className="listing-container">
                {listings.map(listing => (
                    <>
                    <div className='listing-info' key={listing?.id}>
                        <a href={`/listings/${listing?.id}`}>Title: {listing?.title}</a>
                        <div className='listing-price'>${listing?.price}</div>
                        <div className='listing-bds-bas'>{listing?.bedrooms} bds {listing?.bathrooms} ba {listing?.size} sqft</div>
                        <div className='listing-address'>{listing?.address}, {listing?.city}, {listing?.state} {listing?.zipcode}</div>
                    </div>
                    {/* <EditListingModal listing={listing} user={user}></EditListingModal> */}
                    {/* { (user?.id === listing?.user_id) ? <DeleteListing></DeleteListing> : <></> } */}
                    </>
                ))}
                {/* <NewListingModal></NewListingModal> */}
            </div>
        </div>
        // ) : null
    );
}

export default Listings
