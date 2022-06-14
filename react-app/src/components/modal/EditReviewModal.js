import React, { useState } from "react";
import { Modal } from "../context/Modal";
import EditReview from "../reviews/edit_review";


function EditReviewModal({ review, user }) {
    const [show, setShow] = useState(false);
    return (
        <>
            { (user?.id === review?.user_id) ? <button onClick={() => setShow(true)}>Edit Review</button> : <></> }
            {show && (
                <Modal onClose={() => setShow(false)}>
                    <EditReview setShow={setShow}/>
                </Modal>
            )}
        </>
    )
}

export default EditReviewModal
