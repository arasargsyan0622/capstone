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
    // console.log("currLisnting", listings)
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
                        <div className='single-btns'>
                            <EditListingModal listing={listing} user={user}></EditListingModal>
                            { (user?.id === listing?.user_id) ? <DeleteListing></DeleteListing> : <></> }
                        </div>
                        <div className='single-listing-header'>
                            <div className='address-icons'>
                                <div className='address-container-single'>
                                    <div className='single-address'>{listing?.address}</div>
                                    <div className='listing-city'>{listing?.city}, {listing?.state}</div>
                                </div>
                                <div className='bed-container'>
                                    <div className='single-bed'><FontAwesomeIcon icon={faBed} size="xl"/></div>
                                    <div className='listing-beds'>{listing?.bedrooms} Beds</div>
                                </div>
                                <div className='bath-container'>
                                    <div className='single-bath'><FontAwesomeIcon icon={faBath} size="xl"/></div>
                                    <div className='listing-baths'>{listing?.bathrooms} Baths </div>
                                </div>
                                <div className='sqft-container'>
                                    <div className='single-square'><FontAwesomeIcon icon={faVectorSquare} size="xl"/></div>
                                    <div className='listing-sqft'>{listing?.size} SQ FT</div>
                                </div>
                            </div>
                        </div>
                        <div className='images-container'>
                            {/* <div>IMAGES GOES HERE 440X450px</div> */}
                            <img className="single-url1" src={listing?.url1}></img>
                            <img className="single-url2" src={listing?.url2}></img>
                            <img className="single-url3" src={listing?.url3}></img>
                        </div>
                        <div className='property-info-container'>
                            <div className='property-info'>
                                <div className='desc-text'>Property Description</div>
                                <div className='property-description'>{listing?.description}</div>
                                <div className='property-details'>Property Details</div>
                                <div className='year-built-container-single'>
                                    <div className='year-built-text'>Year Built</div>
                                    <div className='year-built-num'>{listing?.year_built}</div>
                                </div>
                                <div className='house-size-container'>
                                    <div className='house-size-text'>House Size</div>
                                    <div className='house-size-num'>{listing?.size} SQ FT</div>
                                </div>
                                <div className='parking-container-single'>
                                    <div className='parking-text'>Parking</div>
                                    { listing?.parking ? <div className='parking-value'>Yes</div> :
                                    <div className='parking-value'>No</div> }
                                </div>
                                <div className='laundry-container-single'>
                                    <div className='laundry-text'>Laundry</div>
                                    { listing?.laundry ? <div className='laundry-value'>Yes</div> :
                                    <div className='laundry-value'>No</div> }
                                </div>
                                <div className='isAvailable-container-single'>
                                    <div className='isAvailable-text'>Is Available?</div>
                                    { listing?.is_available == true ? <div className='isAvailable-value'>Yes</div>
                                        : <div className='isAvailable-value'>No</div> }
                                </div>
                            </div>
                            <div className='price-agent-container'>
                                <div className='price-container-single'>
                                    <div className='price-num'>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(listing?.price)}</div>
                                </div>
                                <div className='find-container'>
                                    <Link to="/agents">
                                        <button className="find-btn" type="submit">Find an Agent</button>
                                    </Link>
                                </div>
                                {/* <div className='schedule-container'>
                                    <div className="bookin-btn" type='submit'>Schedule A Booking (In progress)</div>
                                </div> */}
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </div>
    )
}

export default Listing
