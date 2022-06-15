import React, { useState } from "react";
import { Modal } from "../context/Modal";
import EditListing from "../listings/edit_listing";

function EditListingModal({listing, user}) {
    const [show, setShow] = useState(false);
    return (
        <>
            { (user?.id === listing?.user_id) ? <button onClick={() => setShow(true)}>Edit Listing</button> : <></> }
            {show && (
                <Modal onClose={() => setShow(false)}>
                    <EditListing setShow={setShow}/>
                </Modal>
            )}
        </>
    )
}

export default EditListingModal;
