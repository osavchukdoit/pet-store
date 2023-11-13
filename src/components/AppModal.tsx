import React from "react";
import { Button, Modal } from "react-bootstrap";

export type AppModalProps = {
  show: boolean;
  setShow: (val: boolean) => void;
  title: React.ReactNode;
  body: React.ReactNode;
  closeTitle: string;
  processTitle: string;
  onClose?: () => void;
  onAccept?: () => void;
  onDecline?: () => void;
  backdrop?: "static" | boolean;
};

export const AppModal: React.FC<AppModalProps> = ({
  show,
  setShow,
  title,
  body,
  closeTitle = "Close",
  processTitle,
  onClose = () => {},
  onAccept = () => {},
  onDecline = () => {},
  backdrop = true,
}) => {
  const handleClose = () => {
    onClose();
    setShow(false);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop={backdrop}
      data-testid={"modal-window"}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button
          variant={"primary"}
          onClick={() => {
            handleClose();
            onDecline();
          }}
        >
          {closeTitle}
        </Button>
        <Button
          variant={"danger"}
          onClick={() => {
            handleClose();
            onAccept();
          }}
        >
          {processTitle}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
