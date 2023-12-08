import StripeCheckout from 'react-stripe-checkout';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const STRIPE_PUBLISHABLE_KEY="pk_test_51NHRjRSEF1K1KdgAJ0cnspbMiSduDmgOBtbOc31cmzzBpy0dLyf3r6t9sas8XRQ6qBcNoqWyrL5xeswFr6U3SX6p00LGN9Kyjr";

export const Pay = () => {
    const [stripeToken, setStripeToken] = useState(null);
    const navigate = useNavigate();

    const onToken = (token) => {
        setStripeToken(token);
    };

    useEffect(() => {
        const makeRequest = async () => {
            try {
                // if (stripeToken) {
                    const res = await axios.post(
                        "http://localhost:5000/api/checkout/payment",
                        {
                          tokenId: stripeToken.id,
                          amount: 2000,
                        }
                    );
                    console.log(res.data);
                // } 
                // // else {
                // //     console.log("Stripe token is null. Unable to make the request.");
                // // }
                navigate.push("/success")
            } catch (err) {
                // console.error("Error making the request:", err.message);
                console.log(err); 
            }
        };
        stripeToken && makeRequest()
        // makeRequest();
    }, [stripeToken, navigate]);

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {stripeToken ? (<span>Processing. Please wait...</span>) : (

                <StripeCheckout
                name="UNITON"
                image="https://avatars.githubusercontent.com/u/125210638?v=4"
                billingAddress
                shippingAddress
                description="Your total is $20"
                amount={2000}  // Amount in cents (corresponding to $20)
                token={onToken}
                stripeKey={STRIPE_PUBLISHABLE_KEY}
                >
                <button
                    style={{
                        border: "none",
                        width: 120,
                        borderRadius: 5,
                        padding: "20px",
                        backgroundColor: "black",
                        color: "white",
                        fontWeight: "600",
                        cursor: "pointer",
                    }}
                    >
                    Pay Now
                </button>
            </StripeCheckout>
        )}
        </div>
    );
};

export default Pay;
