import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { reset, newCustomerRev } from '../redux/customer/customerSlice'
import { toast } from 'react-toastify'
import Spinner from '../Components/Layout/Spinner'
import AOS from 'aos'

export default function CustomerRevForm()
{
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.auth.userInfo)

  useEffect(() =>
  {
    AOS.init({
      duration: 2000
    });
  }, []);

  const { customerRevs, isLoading, isSuccess, revAdded, isError, message } = useSelector(state => state.customerRevs)
  const [email, setEmail] = useState("");
  const [name, setName] = useState(user.name);
  const [revContent, setRevContent] = useState("");
  const [rating, setRating] = useState(0);
  const [address, setAddress] = useState("");



  // const [imagePreview, setImgPreview] = useState("");

  // const createProductImageChange = (e) =>
  // {
  //   const reader = new FileReader();

  //   reader.onload = () =>
  //   {
  //     if (reader.readyState === 2)
  //     {
  //       setImgPreview(reader.result);
  //       setImg(reader.result);
  //     }
  //   };
  //   reader.readAsDataURL(e.target.files[0]);
  // };

  const createProductSubmitHandler = (e) =>
  {
    e.preventDefault();
    const customerRevsData = {
      name, email: user.email, address, revContent, rating, image: user?.personalImage?.url
    }
    console.log(customerRevsData)
    dispatch(newCustomerRev(customerRevsData));
  };

  useEffect(() =>
  {
    if (isError)
    {
      toast.error(message)
      dispatch(reset())
    }
    if (revAdded)
    {
      toast.success(`thanks ${user.name},we're happy for your review`)
      dispatch(reset())
      navigate('/')
    }
  }, [dispatch, toast, message, isError, isSuccess])

  useEffect(() =>
  {
    AOS.init({
      duration: 2000
    });
  }, []);

  return isLoading ? <Spinner /> : (
    <div className='customerRev_form' data-aos="zoom-in" >
      <div className="container">
        <form className="form" onSubmit={createProductSubmitHandler}>
          <div className="item">
            <label>name</label>
            <input type="text" value={user.name} name="name" onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="item">
            <label> rating </label>
            <input type="number" name="rating" onChange={(e) => setRating(e.target.value)} />
          </div>
          <div className="item">
            <label> your opinion </label>
            <textarea name="revContent" onChange={(e) => setRevContent(e.target.value)} />
          </div>

          <div className="item">
            <label> address </label>
            <input type="text" name="address" onChange={(e) => setAddress(e.target.value)} />
          </div>
          <input type="submit" />
        </form>

      </div>
    </div>
  )
}


