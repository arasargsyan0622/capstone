import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { getListings } from "../../store/listing"
import { getAgents } from "../../store/agent";
import NewListingModal from '../modal/NewListingModal';
import EditListingModal from '../modal/EditListingModal';
import DeleteListing from "./delete_listing"
import "./listingdisplay.css"

function Listings() {
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
            <div className='listing-header'>
                <h1>Listings</h1>
                <NewListingModal></NewListingModal>
            </div>
            <div className="listing-container">
                {listings.map(listing => (
                    <>
                    <div className='listing-info' key={listing?.id}>
                        <Link to={`/listings/${listing.id}`}><img className="listing-image" src={listing?.url1} alt="check-your-url"></img></Link>
                        <div className='listing-info-container'>
                            { (user?.id === listing?.user_id) ? <Link className='listing-address' to={`/listings/${listing.id}`}>* {listing?.address}, {listing?.city}, {listing?.state} {listing?.zipcode}</Link>
                            : <Link className='listing-address' to={`/listings/${listing.id}`}>{listing?.address}, {listing?.city}, {listing?.state} {listing?.zipcode}</Link>}
                            <div className='listing-price'>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(listing?.price)}</div>
                            <div className='listing-bds-bas'>{listing?.bedrooms} bds {listing?.bathrooms} ba {listing?.size.toLocaleString("en-US")} sqft</div>
                            {/* <EditListingModal listing={listing} user={user}></EditListingModal>
                            { (user?.id === listing?.user_id) ? <DeleteListing></DeleteListing> : <></> } */}
                        </div>
                    </div>
                    </>
                ))}
            </div>
        </div>
        // ) : null
    );
}

export default Listings
