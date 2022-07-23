import React, { Fragment, useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import { reset, updateProfile, loadUser } from "../../redux/auth/authSlice";
import { toast } from "react-toastify";
import profileImg from '../../Imgs/Profile.png'
const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth.userInfo);
  const { isError, isUpdated, isLoading,message } = useSelector((state) => state.auth.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(profileImg);

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    // const myForm = new FormData();

    // myForm.set("name", name);
    // myForm.set("email", email);
    // myForm.set("avatar", avatar);
    const myForm = {name,email,avatar}
    
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (isError) {
      toast.error(message);
      dispatch(reset());
    }

    if (isUpdated) {
      toast.success("Profile Updated Successfully");
      dispatch(loadUser());

      navigate("/profile");

      dispatch(reset());
    }
  }, [dispatch, isError, toast, user, isUpdated]);
  return (
    <Fragment>
      {isLoading ? (
          <p>loading....</p>
      ) : (
          <div className="updateProfile">
            <div className="updateProfile__Box">

              <h2 className="updateProfile__Box__Heading">Update Profile</h2>
              <form
                className="updateProfile__Box__Form"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfile__Box__Form__Name">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfile__Box__Form__Email">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfile__Box__Form__Image">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    className="img"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfile__Box__Btn"
                />
              </form>
            </div>
          </div>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
