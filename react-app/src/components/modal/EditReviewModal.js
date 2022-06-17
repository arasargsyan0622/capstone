import React, { useState } from "react";
import { Modal } from "../context/Modal";
import EditReview from "../reviews/edit_review";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'


function EditReviewModal({ review, user }) {
    const [show, setShow] = useState(false);
    return (
        <>
            { (user?.id === review?.user_id) ? <button className="edit-btn-review" onClick={() => setShow(true)}><FontAwesomeIcon icon={faEdit}/></button> : <></> }
            {show && (
                <Modal onClose={() => setShow(false)}>
                    <EditReview setShow={setShow}/>
                </Modal>
            )}
        </>
    )
}

export default EditReviewModal
