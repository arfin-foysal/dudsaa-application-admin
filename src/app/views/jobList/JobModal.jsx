import React from "react";
import Modal from "react-bootstrap/Modal";
import { modalColor } from "../../../utils/Theme";
import JobCreate from "./JobCreate";
import UpdateJob from './UpdateJob';



const JobModal = ({ handleClose, show, clickValue, paramValue,size }) => {
    return (
        <>
            <Modal show={show} onHide={handleClose} size={size}>
                <Modal.Header
                    closeButton
                    className="text-white"
                    style={{ backgroundColor: modalColor?modalColor:"#0675F8" }}
                >
                    <Modal.Title>{clickValue}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {clickValue === "Add New Job" && (
                        <JobCreate handleClose={handleClose} />
                    )
                    }
                    {clickValue === "Update Job" && (
                        <UpdateJob handleClose={handleClose} paramValue={paramValue} />
                    )
                    }
      
                </Modal.Body>
            </Modal>
        </>
    );
};

export default React.memo(JobModal);
