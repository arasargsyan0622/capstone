import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateListing } from '../../store/listing';

function EditListing() {
    const history = useHistory();
    const dispatch = useDispatch();

    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ price, setPrice ] = useState("");
    const [ isAvailable, setIsAvailable ] = useState(false);
    const [ image, setImage ] = useState("");

    // const listingId = useSelector(state => state.listing)
    // console.log("listingId in component-------", listingId)
    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            title,
            description,
            price,
            isAvailable,
            image,
            id: "4"
        }
        dispatch(updateListing(payload));
        history.push("/listings");
    }

    return (
        <div>
            <h1>Edit Listing</h1>
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
            </form>
        </div>
    );
}

export default EditListing;
