import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { updateListing } from '../../store/listing';

function EditListing({ setShow }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const listings = Object.values(useSelector(state => state.listings));
    let listingTitle
    let listingDescription
    let listingPrice
    let listingAvailability

    listings.map((listing) => {
        listingTitle = listing.title
        listingDescription = listing.description
        listingPrice = listing.price
        listingAvailability = listing.is_available
    })

    const [ title, setTitle ] = useState(listingTitle);
    const [ description, setDescription ] = useState(listingDescription);
    const [ price, setPrice ] = useState(listingPrice);
    const [ isAvailable, setIsAvailable ] = useState(listingAvailability);
    const [ image, setImage ] = useState("");

    const { listingId } = useParams()

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            title,
            description,
            price,
            isAvailable,
            // image,
            id: listingId
        }
        dispatch(updateListing(payload));
        history.push(`/listings/${listingId}`);
        setShow(false)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Description:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label>Price:</label>
                <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <label>Is Available:</label>
                <input
                    type="checkbox"
                    value={isAvailable}
                    onChange={(e) => setIsAvailable(e.target.value)}
                />
                {/* <label>Image:</label> */}
                {/* <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                /> */}
                <button type="submit">Submit</button>
                <></>
            </form>
        </div>
    );
}

export default EditListing;
