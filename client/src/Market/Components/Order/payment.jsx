import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import { toast } from 'react-toastify'
import CheckoutSteps from '../Cart/CheckoutSteps'
import { createOrder } from '../../redux/order/orderSlice'
import { clearCart } from '../../redux/cart/cartSlice'
import Spinner from '../Layout/Spinner'
import
{
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  PaymentElement,
  cardElement,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from 'axios'

export default function Payment()
{
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const elements = useElements();
  const stripe = useStripe();
  const payBtn = useRef(null);

  const KEY = "pk_test_51KU7PlKTQl5sdnSan4XZdyG8ROCvMps693X5fs4PDrQSR8UahyknWe9GPkuem5zqhyoLGE8GKmFa3fPRmq23joWV00XB7Rlte3"
  const { total } = useSelector(state => state.cart)
  const [stripeToken, setStripeToken] = useState(null)
  // const {shippingInfo} = useSelector(state => state.cart)
  const [nameOnCard, setNameOnCard] = useState("");
  const { user } = useSelector(state => state.auth.userInfo)
  const { isLoading } = useSelector(state => state.orders.newOrder)
  const order = JSON.parse(sessionStorage.getItem("orderInfo"));
  const onNameOnCard = (e) =>
  {
    setNameOnCard(e.target.value);
  };



  const onToken = (token) =>
  {
    setStripeToken(token)
  }


  const paymentData = {
    amount: Math.round(order.totalPrice * 100),
  };

  console.log(order)

  const submitHandler = async (e) =>
  {
    e.preventDefault();

    payBtn.current.disabled = true;
    const { shippingInfo } = order
    console.log(shippingInfo)
    try
    {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
      // ? before we make create order. we need to know does the payment 'succeed'? or not. case yes so we will create the order , else{ we won't create the order } 
      if (result.error)
      {
        payBtn.current.disabled = false;
        // ! case payment has error : toast this error 
        toast.error(result.error.message);
      } else
      {
        // * case payment succeeed : make the status = success and dispatch the create order action 
        if (result.paymentIntent.status === "succeeded")
        {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          console.log(result)
          dispatch(createOrder(order));
          dispatch(clearCart());

          navigate("/success");
        } else
        {
          toast.error("There's some issue while processing payment ");
        }
      }
    } catch (error)
    {
      payBtn.current.disabled = false;
      toast.error(error);
      console.log(error)
    }
  };


  // useEffect(() => {
  //     const makeRequest = async () => {
  //       try {
  //         const res = await userRequest.post("/checkout/payment", {
  //           tokenId: stripeToken.id,
  //           amount: total * 100,
  //         });
  //         navigate.push("/success",{data:res.data})
  //       } catch  {}
  //     };
  //     stripeToken && makeRequest()
  // }, [stripeToken,navigate,total]);

  return (
    <div className='payment'>
      <div className="container">
        <CheckoutSteps step1 step2 step3 step4 />
        <div className="h3">
          pay with card
        </div>
        <div className="payment__form">
          <form className='payment__form__name'>
            <input
              name="nameOnCard"
              className="stripe-pay__row-input"
              type="text"
              value={nameOnCard}
              onChange={(e) => onNameOnCard(e)}
              placeholder="Name"
              required={true}
            />
          </form>
          <form className="payment__form__stripe" onSubmit={(e) => submitHandler(e)}>

            <div>
              {/* <CreditCardIcon /> */}
              <CardNumberElement className="payment__form__stripe__input" />
            </div>
            <div>
              {/* <EventIcon /> */}
              <CardExpiryElement className="payment__form__stripe__input" />
            </div>
            <div>
              {/* <VpnKeyIcon /> */}
              <CardCvcElement className="payment__form__stripe__input" />
            </div>

            {isLoading ? (
              <Spinner />
            ) : (
              <input
                type="submit"
                ref={payBtn}
                className="payment__form__stripe__btn"
                value='submit payment'
              />
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
