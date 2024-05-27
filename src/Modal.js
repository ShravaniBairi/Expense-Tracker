import React from 'react';
import './ExpenseSlider.css'; // Create a CSS file to handle modal styling

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                
                {children}
            </div>
        </div>
    );
};

export default Modal;