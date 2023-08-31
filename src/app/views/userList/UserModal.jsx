import React from "react";
import Modal from "react-bootstrap/Modal";

import { modalColor } from "../../../utils/Theme";
import CreateStudent from "./CreateUser";
import UpdateUser from "./UpdateUser";
import ResetPassword from "./ResetPassword";
import MemberDetails from "./MemberDetails";
const UserModal = ({ handleClose, show, clickValue, paramValue,size }) => {
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
                    {clickValue === "Add New Member" && (
                        <CreateStudent handleClose={handleClose} />
                    )
                    }
                    {clickValue === "Update Member" && (
                        <UpdateUser handleClose={handleClose} paramValue={paramValue} />
                    )
                    }
                    {clickValue === "Reset Password" && (
                        <ResetPassword handleClose={handleClose} paramValue={paramValue} />
                    )
                    }
                    {clickValue === "Member Details" && (
                        <MemberDetails handleClose={handleClose} paramValue={paramValue} />
                    )
                    }
          
                </Modal.Body>
            </Modal>
        </>
    );
};

export default React.memo(UserModal);
