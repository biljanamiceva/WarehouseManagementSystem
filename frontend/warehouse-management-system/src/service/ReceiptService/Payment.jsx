import React, { useEffect, useState } from "react";
import axios from "axios";

const Payment = ({ amount, currency, supplierName, receiptId }) => {
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [refreshComponent, setRefreshComponent] = useState(false); // State to trigger component refresh
  useEffect(() => {
    const stripeScript = document.createElement("script");
    stripeScript.src = "https://checkout.stripe.com/checkout.js";
    stripeScript.async = true;
    document.body.appendChild(stripeScript);

    return () => {
      document.body.removeChild(stripeScript);
    };
  }, []);

  const handleCheckout = async () => {
    const handler = window.StripeCheckout.configure({
      key: 'pk_test_51P4UHaK3FUrzM0bh0DTq0DSsXh93c6hyuwn8ENv9bsBUXpmFx6HZQiFbq3HLC3teLDaM0vJn940AnPLWBT5TwiRU00PSPF5OI3',
      locale: 'auto',
      token: async function (token) {
        console.log("ReceiptId", receiptId);
        try {
          const paymentResponse = await axios.put(
            `https://localhost:7076/api/receipt/${receiptId}/create-payment`
          );
          console.log(paymentResponse.data.message);

          handleReceiptStatus(); // Call handleReceiptStatus after successful payment
          setRefreshComponent(true)
        } catch (error) {
          console.error("Error processing payment:", error);
        }
      },
    });

    handler.open({
      name: 'Stockify',
      description: `Payment for ${supplierName}`,
      amount: amount * 100, // Amount in cents, assuming amount is in MKD
      currency: currency,
    });
  };

  const handleReceiptStatus = (newStatus) => {
    console.log("New Status:", newStatus);
 console.log("Refreshing component...");
    axios
      .put(
        `https://localhost:7076/api/receipt/${selectedReceipt.receiptId}/markAs`,
        {
          receiptStatus: newStatus,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        console.log("Success response:", response);
        const updatedReceipt = {
          ...selectedReceipt,
          receiptStatus: newStatus,
        };

        setSupplier((prevSupplier) => {
          const updatedReceipts = (
            prevSupplier.responseSingleSupplierReceipts || []
          ).map((receipt) =>
            receipt.receiptId === selectedReceipt.receiptId
              ? updatedReceipt
              : receipt
          );

          return {
            ...prevSupplier,
            responseSingleSupplierReceipts: updatedReceipts,
          };
        });
  
        fetchData();
      })
      .catch((error) => {
        console.error("Error changing status:", error);
      });
  };
  useEffect(() => {
    if (refreshComponent) {
      // Perform any actions needed for component refresh
      console.log("Component refreshed.");
      setRefreshComponent(false); // Reset the state after refresh
    }
  }, [refreshComponent]);


  return (
    <div>
      <button onClick={() => { handleCheckout(); handleReceiptStatus(); }} className="payBtn">Pay {amount} MKD</button>
    </div>
  );
};

export default Payment;
