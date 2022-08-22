import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EmailOutlined, Person, Key, ImageAspectRatio } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { register, login, reset } from "../../redux/auth/authSlice";
import { toast } from 'react-toastify'
import Spinner from '../Layout/Spinner'

export default function SignUp()
{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormDate] = useState({
        email: "",
        password: "",
    });
    const { name, email, password } = formData;
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    const [img, setImg] = useState("")
    const [imgPreview, setImgPreview] = useState("")

    useEffect(() =>
    {
        if (isError)
        {
            toast.error(message);
        }
        // if (isSuccess)
        // {
        //     navigate("/");
        // }
        // dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) =>
    {
        setFormDate((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const signup = (e) =>
    {
        e.preventDefault()
        const userData = {
            name, email, password, image: img
        }
        dispatch(register(userData))
    }
    // onChange image
    const createPersonalChange = (e) =>
    {
        const reader = new FileReader();

        reader.onload = () =>
        {
            if (reader.readyState === 2)
            {
                setImgPreview(reader.result);
                setImg(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    return isLoading ? <Spinner /> : (
        <div className="register">
            {message && message}
            <form onSubmit={signup}>
                <div className="field">
                    <Person />
                    <input
                        type="text"
                        placeholder="name"
                        onChange={onChange}
                        name="name"
                        value={name}
                    />
                </div>
                <div className="field">
                    <EmailOutlined />
                    <input
                        type="email"
                        placeholder="email"
                        onChange={onChange}
                        name="email"
                        value={email}
                    />
                </div>
                <div className="field">
                    <Key />
                    <input
                        type="password"
                        placeholder="password"
                        onChange={onChange}
                        name="password"
                        value={password}
                    />
                </div>
                <div className="field">
                    <input
                        type="file"
                        onChange={createPersonalChange}
                    />
                </div>
                <div className="previewImg">
                    {imgPreview && <img src={imgPreview} alt="" />}

                </div>
                <div className="field">
                    <input
                        type="submit"
                        value="register"
                        onChange={onChange}
                    />
                </div>
            </form>

        </div>
    );
}
