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
                    <div key={listing?.id}>
                        <a href={`/listings/${listing?.id}`}>Title: {listing?.title}</a>
                    </div>
                ))}
            </div>
            <NewListingModal></NewListingModal>
            <EditListingModal></EditListingModal>
            <DeleteListing></DeleteListing>
        </div>
        // ) : null
    );
}

export default Listings
