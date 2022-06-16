import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  useHistory, useParams } from 'react-router-dom';
import { updateListing } from '../../store/listing';
import "./edit_listing.css"

function EditListing({ setShow }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const listings = Object.values(useSelector(state => state.listings));
    const listing = Object.values(useSelector(state => state.curr_listing));
    console.log("listing in edit", listing)
    // let listingTitle
    let listingDescription
    let listingPrice
    let listingAvailability

    listings.map((listing) => {
        // listingTitle = listing.title
        listingDescription = listing.description
        listingPrice = listing.price
        listingAvailability = listing.is_available
    })

    console.log("thsi little shit", listingAvailability)
    // const [ title, setTitle ] = useState(listingTitle);
    const [ description, setDescription ] = useState(listingDescription);
    const [ price, setPrice ] = useState(`${listingPrice}`);
    const [ isAvailable, setIsAvailable ] = useState(listingAvailability);
    // const [ image, setImage ] = useState("");

    const { listingId } = useParams()

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            description,
            price,
            is_available: isAvailable,
            // image,
            id: listingId
        }
        console.log("payload in edit", payload)
        dispatch(updateListing(payload));
        history.push(`/listings`);
        setShow(false)
    }

    const handleCheckbox = (data) => {
        console.log("data in hadlecheckbox", data)
        console.log("is avaialble in hadnel", isAvailable)
        if (isAvailable === false) setIsAvailable(true);
        else setIsAvailable(false)

    };

    return (
        <div>
            <form className="edit-form" onSubmit={handleSubmit}>
                {/* <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                /> */}
                <label>Description:</label>
                <input
                    type="text"
                    className="edit-description-input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label>Price:</label>
                <input
                    type="text"
                    className="edit-price-input"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <div>
                <label className="available-label">Is Available:</label>
                {console.log("isavailable in jsx", isAvailable)}
                { isAvailable ? <input type="checkbox" className="edit-checkbox" value={isAvailable} defaultChecked onChange={handleCheckbox}/> :
                                <input type="checkbox" className="edit-checkbox" value={isAvailable} onChange={handleCheckbox}/> }
                </div>
                {/* <label>Image:</label> */}
                {/* <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                /> */}
                <button className="edit-btn" type="submit">Submit</button>
                <></>
            </form>
        </div>
    );
}

export default EditListing;
