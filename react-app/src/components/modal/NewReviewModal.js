import React, { useState } from 'react';
import { Modal } from '../context/Modal'
import NewReview from '../reviews/create_review';

function NewReviewModal() {
    const [show, setShow] = useState(false);
    return (
        <>
            <button className="add-review" onClick={() => setShow(true)}>
                Add Review
            </button>
            {show && (
                <Modal onClose={() => setShow(false)}>
                    <NewReview setShow={setShow}/>
                </Modal>
            )}
        </>
    )
}

export default NewReviewModal
