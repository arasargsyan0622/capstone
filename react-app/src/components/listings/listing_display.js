import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getListings } from "../../store/listing"
import { getAgents } from "../../store/agent";
import NewListingModal from '../modal/NewListingModal';
import EditListingModal from '../modal/EditListingModal';
import DeleteListing from "./delete_listing"

function Listings() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const listings = Object.values(useSelector(state => state.listings));
    const user = useSelector(state => state.session.user);
    console.log("listings", listings)
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
            <div>
                {listings.map(listing => (
                    <>
                    <div key={listing?.id}>
                        <a href={`/listings/${listing?.id}`}>Title: {listing?.title}</a>
                    </div>
                    <EditListingModal listing={listing} user={user}></EditListingModal>
                    { (user?.id === listing?.user_id) ? <DeleteListing></DeleteListing> : <></> }
                    </>
                ))}
                <NewListingModal></NewListingModal>
            </div>
        </div>
        // ) : null
    );
}

export default Listings
