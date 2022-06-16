// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useHistory, Link, useParams } from 'react-router-dom';
// import { getListing } from "../../store/listing"
// import EditListingModal from '../modal/EditListingModal';
// import DeleteListing from "./delete_listing"

// function Listing() {
//     const history = useHistory();
//     const dispatch = useDispatch();
//     const { listingId } = useParams()
//     console.log("listingId", listingId)
//     const listings = Object.values(useSelector(state => state.listings));
//     const myListing = listings.filter(listing => listing.id === listingId);
//     console.log("myListing", myListing)
//     const user = useSelector(state => state.session.user);
//     const session = useSelector(state => state.session);

//     useEffect(() => {
//         if (!session.user) {
//             history.push('/login');
//         }

//         dispatch(getListing())
//     }, [dispatch]);

//     return(
//         <div>
//         </div>
//     )
// }

// export default Listing
