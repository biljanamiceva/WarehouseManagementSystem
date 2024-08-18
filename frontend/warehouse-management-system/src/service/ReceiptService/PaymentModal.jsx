import React from "react";
import { useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const PaymentModal = ({ isOpen, onClose, onPaymentSubmit, handleInputChange, paymentDetails, selectedReceipt }) => {
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (selectedReceipt) {
      handleInputChange({
        target: {
          name: 'amount',
          value: selectedReceipt.amount,
        },
      });
      handleInputChange({
        target: {
          name: 'cardHolderName',
          value: '', // Reset cardHolderName if needed
        },
      });
    }
  }, [selectedReceipt]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error("Payment error:", error);
    } else {

      console.log(selectedReceipt.receiptId);
        console.log(paymentDetails.cardHolderName);
        console.log(paymentDetails.email);
        console.log(paymentMethod.id);
       onPaymentSubmit(selectedReceipt.receiptId, paymentDetails.email, paymentMethod.id);
    }
  };

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <div className="box">
          <h2>Payment Details</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="cardHolderName">Card Holder's Name:</label>
            <input
              type="text"
              id="cardHolderName"
              name="cardHolderName"
              value={paymentDetails.cardHolderName}
              onChange={handleInputChange}
              required
            />
             <label htmlFor="email">Email:</label> {/* Add email input */}
            <input
              type="email"
              id="email"
              name="email"
              value={paymentDetails.email}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="cardElement">Card Details:</label>
            <CardElement id="cardElement" />
            <button type="submit">Pay Now</button>
          </form>
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={onClose}>X</button>
    </div>
  );
};

export default PaymentModal;
