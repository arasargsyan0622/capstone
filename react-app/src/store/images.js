import rfdc from 'rfdc';
const clone = rfdc();

const POST_IMAGE = '/api/images/POST_IMAGE';

const addImage = image => {
    return {
        type: POST_IMAGE,
        image
    }
}

export const postImage = (image, listingId) => async dispatch => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('listing_id', listingId);
    const response = await fetch('/api/images/POST_IMAGE', {
        method: 'POST',
        body: formData
    });
    if (response.ok) {
        const image = await response.json();
        dispatch(addImage(image));
    }
}
