import React, { useState } from 'react';
import { Modal } from '../context/Modal'
import NewListing from "../listings/add_listing"

function NewListingModal() {
  const [show, setShow] = useState(false);
    return (
        <>
            <button onClick={() => setShow(true)}>
                Add Listing
            </button>
            {show && (
                <Modal onClose={() => setShow(false)}>
                    <NewListing setShow={setShow}/>
                </Modal>
            )}
        </>
    )
}

export default NewListingModal;
