// ReusableModal.js
import React from 'react';
import { Modal, Backdrop, Fade } from '@mui/material';
const ReusableModal = ({ open, onClose, children, className,hideBackdrop }) => {
  return (
    <>
      <Modal open={open} onClose={onClose} hideBackdrop={hideBackdrop} className={className}>
        {children}
      </Modal>  
    </>
  
  );
};

export default ReusableModal;
