import rfdc from "rfdc"
const clone = rfdc()

const LOAD_ALL_LISTING = "/api/listings/LOAD_LISTINGS"
const LOAD_LISTING = "/api/listings/LOAD_LISTING"
const CREATE_LISTING = "/api/listings/CREATE_LISTING"
const EDIT_LISTING = "/api/listings/EDIT_LISTING"
const DELETE_LISTING = "/api/listings/DELETE_LISTING"

const allListings = listings => {
    return {
        type: LOAD_ALL_LISTING,
        listings
    }
}

const oneListing = listing => {
    return {
        type: LOAD_LISTING,
        listing
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

const deleteListing = listing => {
    return {
        type: DELETE_LISTING,
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

export const getListing = id => async dispatch => {
    const response = await fetch(`/api/listings/${id}`)
    if(response.ok) {
        const listing = await response.json()
        dispatch(oneListing(listing))
    }
}

export const createListing = data => async dispatch => {
    const formData = new FormData()
    // formData.append("title", data.title)
    formData.append("description", data.description)
    formData.append("price", data.price)
    formData.append("size", data.size)
    formData.append("is_available", data.is_available)
    formData.append("year_built", data.year_built)
    formData.append("parking", data.parking)
    formData.append("laundry", data.laundry)
    formData.append("bedrooms", data.bedrooms)
    formData.append("bathrooms", data.bathrooms)
    formData.append("address", data.address)
    formData.append("country", data.country)
    formData.append("city", data.city)
    formData.append("state", data.state)
    formData.append("zipcode", data.zipcode)
    formData.append("url1", data.url1)
    formData.append("url2", data.url2)
    formData.append("url3", data.url3)
    formData.append("user_id", data.user_id);
    formData.append("agent_id", data.agent_id);
    // formData.append("images_of_listing", data.images_of_listing)
    // console.log("data in thunk", data)

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
    const formData = new FormData()
    // formData.append("title", data.title)
    formData.append("description", data.description)
    formData.append("price", data.price)
    formData.append("is_available", data.is_available)
    formData.append("url1", data.url1)
    formData.append("url2", data.url2)
    formData.append("url3", data.url3)
    // console.log("data", data)
    const response = await fetch(`/api/listings/${data.id}`, {
        method: "PUT",
        body: formData
    })

    if(response.ok) {
        const editedListing = await response.json()
        dispatch(editListing(editedListing))
    }
}
export const removeListing = id => async dispatch => {
    const response = await fetch(`/api/listings/${id}`, {
        method: "DELETE"
    })

    if(response.ok) {
        const listingId = await response.json()
        // console.log("listingid in thunk", listingId)
        dispatch(deleteListing(listingId))
    }
}

const initialState = {}

const listingReducer = (state = initialState, action) => {
    let newState = clone(state)
    switch(action.type) {
        case LOAD_ALL_LISTING:
            const listings = action.listings.listings
            listings.forEach(listing => {
                newState[listing.id] = listing
            })
            return newState
        case LOAD_LISTING:
            newState[action.listing.id] = action.listing
            return newState
        case CREATE_LISTING:
            newState[action.listing.id] = action.listing;
            return newState;
        case EDIT_LISTING:
            delete newState[action.listing.id]
            newState[action.listing.id] = action.listing;
            return newState;
        case DELETE_LISTING:
            delete newState[action.listing.id]
            return newState
        default:
            return state
    }
}

export default listingReducer
