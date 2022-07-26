import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { createPost, reset } from '../../redux/blog/blogSlice'

export default function NewPost()
{
    const dispatch = useDispatch()
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth.userInfo)
    const { postDetails, postCreated } = useSelector(state => state.blog)
    const { title } = postDetails
    const [postTitle, setPostTitle] = useState(title)
    const [descHead, setDescHead] = useState("")
    const [descText, setDescText] = useState("")
    const [categories, setCategories] = useState("")
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState("");

    const createPostImageChange = (e) =>
    {
        const reader = new FileReader();

        reader.onload = () =>
        {
            if (reader.readyState === 2)
            {
                setImagePreview(reader.result);
                setImage(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const writePostHandler = (e) =>
    {
        e.preventDefault()
        const categoriesArray = categories.trim().split(',')
        const descItem = {
            title: descHead,
            desc: descText
        };

        const paragraphs = [];
        paragraphs.push(descItem)

        const data = {
            user: user._id,
            username: user.name,
            title: postTitle,
            paragraphs,
            categories: categoriesArray,
            postImg: image
        }

        dispatch(createPost(data))

        console.log(data)
    }

    useEffect(() =>
    {
        if (postCreated)
        {
            dispatch(reset())
            navigate('/blog')
        }
    }, [postCreated])

    return (
        <div className='blog__new__post'>
            <div className="h3">
                write a post
            </div>
            <div className="container">
                <form className="form" onSubmit={writePostHandler}>
                    <div className="item title">
                        <label>title</label>
                        <input type="text" name="name" value={postTitle} placeholder="post title" onChange={(e) => setPostTitle(e.target.value)} />
                    </div>

                    <label> post content </label>
                    <div className="content">
                        <div className="item heading">
                            <input type="text" name="descHead" placeholder='heading' onChange={(e) => setDescHead(e.target.value)} />
                        </div>
                        <div className="item desc">
                            <textarea name="descText" placeholder='description' onChange={(e) => setDescText(e.target.value)} />
                        </div>
                    </div>
                    <div className="item">
                        <label>category</label>
                        <input type="text" name="categories" placeholder='category' onChange={(e) => setCategories(e.target.value)} />
                    </div>
                    <div className="item">
                        <label> image </label>
                        <input
                            type="file"
                            name="avatar"
                            className="imageField"
                            accept="image/*"
                            onChange={createPostImageChange}
                            multiple
                        />
                        <div className="img_preview">
                            <div className="img">
                                {imagePreview && <img src={imagePreview} alt="Product Preview" />}

                            </div>
                        </div>
                    </div>
                    <div className="submit">
                        <input type="submit" />
                    </div>
                </form>
            </div>
        </div>
    )
}
