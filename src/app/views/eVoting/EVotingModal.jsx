import React from "react";
import Modal from "react-bootstrap/Modal";
import { modalColor } from "../../../utils/Theme";
import EVotingCreate from "./EVotingCreate";
import UpdateEVoting from "./UpdateEVoting";
const EVotingModal = ({ handleClose, show, clickValue, paramValue, size }) => {
   
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
                    {clickValue === "Add New Poll" && (
                        <EVotingCreate handleClose={handleClose} />
                    )
                    }
                    {clickValue === "Update Poll" && (
                        <UpdateEVoting handleClose={handleClose} paramValue={paramValue} />
                    )
                    }
      
                </Modal.Body>
            </Modal>
        </>
    );
};

export default React.memo(EVotingModal);
