import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getListings } from "../../store/listing"
import NewListingModal from '../modal/NewListingModal';

function Listings() {
    const history = useHistory();
    const dispatch = useDispatch();

    const listings = Object.values(useSelector(state => state.listings));
    const session = useSelector(state => state.session);

    useEffect(() => {
        if (!session.user) {
            history.push('/login');
        }

        dispatch(getListings());

        // return () => {
        //     dispatch(clearListings());
        // }
    }, [dispatch, history, session]);

    return (
        <div>
            <h1>Listings</h1>
            <ul>
                {listings.map(listing => (
                    <li key={listing.id}>
                        <a href={`/listings/${listing.id}`}>{listing.title}</a>
                    </li>
                ))}
            </ul>
            <NewListingModal></NewListingModal>
        </div>
    );
}

export default Listings
