import rfdc from "rfdc"
const clone = rfdc()

const LOAD_ALL_LISTING = "/api/listings/LOAD_LISTINGS"
const CREATE_LISTING = "/api/listings/CREATE_LISTING"
const EDIT_LISTING = "/api/listings/EDIT_LISTING"

const allListings = listings => {
    return {
        type: LOAD_ALL_LISTING,
        listings
    }
}

const addListing = listing => {
    return {
        type: CREATE_LISTING,
        listing
    }
}

const editListing = listing => {
    return {
        type: EDIT_LISTING,
        listing
    }
}

export const getListings = () => async dispatch => {
    const response = await fetch("/api/listings/")
    if(response.ok) {
        const listings = await response.json()
        dispatch(allListings(listings))
    }
}

export const createListing = data => async dispatch => {
    const formData = new FormData()
    formData.append("title", data.title)
    formData.append("description", data.description)
    formData.append("price", data.price)
    formData.append("size", data.size)
    formData.append("is_available", data.is_available)
    formData.append("year_built", data.year_built)
    formData.append("parking", data.parking)
    formData.append("laundry", data.laundry)
    formData.append("bedrooms", data.bedrooms)
    formData.append("bathrooms", data.bathrooms)
    formData.append("user_id", data.user_id);


    const response = await fetch("/api/listings/", {
        method: "POST",
        body: formData,
    });

    if(response.ok) {
        const listing = await response.json()
        dispatch(addListing(listing))
        return listing
    }
}

export const updateListing = data => async dispatch => {
    console.log()
    const formData = new FormData()
    formData.append("title", data.title)
    formData.append("description", data.description)
    formData.append("price", data.price)
    formData.append("is_available", data.is_available)
    formData.append("id", data.id)

    const response = await fetch(`/api/listings/${data.id}/`, {
        method: "PUT",
        body: formData
    })

    if(response.ok) {
        const editedListing = await response.json()
        dispatch(editListing(editedListing))
        return editedListing
    }
}

const initialState = {}

const listingReducer = (state = initialState, action) => {
    let newState = clone(state)
    switch(action.type) {
        case LOAD_ALL_LISTING:
            const listings = action.listings.listings
            console.log("listnigs in reducer", listings)
            listings.forEach(listing => {
                newState[listing.id] = listing
            })
            return newState
        case CREATE_LISTING:
            // console.log("newState", newState)
            // console.log("action", action)
            newState[action.listing.id] = action.listing;
            return newState;
        case EDIT_LISTING:
            delete newState[action.listing.id]
            newState[action.listing.id] = action.listing;
            return newState;
        default:
            return state
    }
}

export default listingReducer
