import React, { useState, Suspense, useEffect, lazy } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { AccountTree, Description, Storage, Spellcheck, AttachMoney } from '@mui/icons-material'
import { reset, updateProduct, getProductDetails } from '../../redux/product/productSlice'
const Sidebar = lazy(() => import("./Sidebar"));

export default function UpdateProduct()
{
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
    const { productDetails } = useSelector((state) => state.products);
    const [name, setName] = useState(productDetails.name ? productDetails.name : "");
    const [price, setPrice] = useState(productDetails.price);
    const [description, setDescription] = useState(productDetails.description);
    const [category, setCategory] = useState(productDetails.category);
    const [Stock, setStock] = useState(productDetails.Stock);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const { id } = useParams()

    console.log(productDetails)

    const categories = [
        'shirts',
        'coats',
        'bags',
        'sneakers',
        'glasses',
        'dresses'
    ];

    useEffect(() =>
    {
        if (isError)
        {
            toast.error(message);
            dispatch(reset());
        }

        if (isSuccess)
        {
            toast.success("Product Created Successfully");
            navigate("/admin/dashboard");
        }
        dispatch(getProductDetails(id));
    }, [dispatch, toast, isError, navigate, isSuccess, id]);

    const updateProductSubmitHandler = (e) =>
    {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", Stock);

        images.forEach((image) =>
        {
            myForm.append("images", image);
        });

        const updatedProductData = {
            name, price, description, category, Stock, images
        }
        const data = {
            id,
            updatedProductData
        }
        console.log(data)
        dispatch(updateProduct(data));
    };

    const updateProductImagesChange = (e) =>
    {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) =>
        {
            const reader = new FileReader();

            reader.onload = () =>
            {
                if (reader.readyState === 2)
                {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };
    useEffect(() =>
    {
    }, [dispatch, id])

    return (
        <>
            {/* <MetaData title="Create Product" /> */}
            <div className="admin">
                <Suspense fallback={<div>loading ... </div>}>
                    <Sidebar />
                </Suspense>

                <div className="updateProductContainer" data-aos="zoom-in">
                    <div className="updateProductContainer__Heading">update Product</div>
                    <form
                        className="updateProductContainer__Form"
                        encType="multipart/form-data"
                        onSubmit={updateProductSubmitHandler}
                    >

                        <div className="item">
                            <Spellcheck />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="item">
                            <AttachMoney />
                            <input
                                type="number"
                                placeholder="Price"
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div className="item">
                            <Description />

                            <textarea
                                placeholder="Product Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>

                        {/* category */}
                        <div className="item">
                            <AccountTree />
                            <select onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="item">
                            <Storage />
                            <input
                                type="number"
                                placeholder="Stock"
                                required
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>

                        {/* file upload */}
                        <div id="updateProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={updateProductImagesChange}
                                multiple
                            />
                        </div>

                        <div id="updateProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>

                        <button
                            id="updateProductBtn"
                            type="submit"
                            disabled={isLoading ? true : false}
                            className="updateProductContainer__Form__btn"
                        >
                            update
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
