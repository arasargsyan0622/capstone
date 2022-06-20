import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  useHistory, useParams } from 'react-router-dom';
import { updateListing } from '../../store/listing';
import "./edit_listing.css"

function EditListing({ setShow }) {
    const history = useHistory();
    const dispatch = useDispatch();
    // const listings = Object.values(useSelector(state => state.listings));
    const listing = Object.values(useSelector(state => state.curr_listing))[0];
    // console.log("listing in edit", listing)

    const listingDescription = listing?.description;
    const listingPrice = listing?.price;
    const listingAvailability = listing?.is_available;
    const listingUrl1 = listing?.url1;
    const listingUrl2 = listing?.url2;
    const listingUrl3 = listing?.url3;
    // console.log("listingAvailability", listingAvailability)

    // console.log("thsi little shit", listingAvailability)
    // const [ title, setTitle ] = useState(listingTitle);
    const [ description, setDescription ] = useState(listingDescription);
    const [ price, setPrice ] = useState(`${listingPrice}`);
    const [ isAvailable, setIsAvailable ] = useState(listingAvailability);
    const [url1, setUrl1] = useState(listingUrl1);
    const [url2, setUrl2] = useState(listingUrl2);
    const [url3, setUrl3] = useState(listingUrl3);
    // const [ image, setImage ] = useState("");

    const { listingId } = useParams()

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            description,
            price,
            is_available: isAvailable,
            url1,
            url2,
            url3,
            // image,
            id: listingId
        }
        // console.log("payload in edit", payload)
        dispatch(updateListing(payload));
        history.push(`/listings`);
        setShow(false)
    }

    const handleCheckbox = () => {
        // console.log("data in hadlecheckbox", data)
        // console.log("is avaialble in hadnel", isAvailable)
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
                <input
                    type="text"
                    className="url1"
                    placeholder="Url1"
                    value={url1}
                    onChange={(e) => setUrl1(e.target.value)}
                />
                <input
                    type="text"
                    className="url2"
                    placeholder="Url2"
                    value={url2}
                    onChange={(e) => setUrl2(e.target.value)}
                />
                <input
                    type="text"
                    className="url3"
                    placeholder="Url3"
                    value={url3}
                    onChange={(e) => setUrl3(e.target.value)}
                />
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
                {/* {console.log("isavailable in jsx", isAvailable)} */}
                { isAvailable ? <input type="checkbox" className="edit-checkbox" defaultChecked value={isAvailable} onChange={handleCheckbox}/> :
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
