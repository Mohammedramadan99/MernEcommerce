import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allPosts } from '../redux/blog/blogSlice'
import { Person, PostAdd } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { Error } from '@mui/icons-material'
import { motion } from 'framer-motion/dist/es/index'
import Spinner from '../Components/Layout/Spinner'


export default function Blog()
{
    const dispatch = useDispatch()
    const { posts, filteredPosts, isLoading } = useSelector(state => state.blog)
    const { user } = useSelector(state => state.auth.userInfo)
    const [category, setCategory] = useState('')

    useEffect(() =>
    {
        dispatch(allPosts(category === 'all' ? '' : category))
    }, [category])

    const allCategories = []
    const pushCatsWithTrim = posts.map(item => item.categories.map(c => allCategories.push(c.trim())))
    // step_2. filter categories to remove duplecated values
    const uniqueCategories = allCategories.filter(function (item, pos)
    {
        return allCategories.indexOf(item) == pos;
    })
    console.log(uniqueCategories)
    console.log(allCategories)
    return (
        <div className="blog">
            <div className="PageTitle">
                mora blog
            </div>
            <div className="container">
                <div className="blog_bar">
                    <div className="item">
                        <strong> {posts.length} </strong>
                        <p>posts</p>
                    </div>
                    <div className="item">
                        <strong> <PostAdd /> </strong>
                        {user?.role === "admin" && <Link to="/blog/new"> write post </Link>}

                    </div>
                    <div className="item">
                        <strong> category </strong>
                        <select onChange={e => setCategory(e.target.value)}>
                            <option>all</option>
                            {uniqueCategories.map(c => <option> {c} </option>)}
                        </select>
                    </div>
                </div>
                <motion.div layout className={`${posts.length < 1 ? 'emptyBlog' : 'posts'} `} >
                    {isLoading ? <Spinner /> : posts && posts.length < 1 ? (
                        <>
                            <div className="icon">
                                <Error />
                            </div>
                            <p>there is no any posts to show</p>
                        </>
                    ) : filteredPosts.map(post => (
                        <motion.div layout animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} className="post">
                            <div className="img">
                                <div className="overlay">
                                    <div className="name">
                                        <Person />
                                        {post.username}
                                    </div>
                                </div>
                                {post?.postImg && <img src={post.postImg.url} alt="img" />}

                            </div>
                            <div className="info">
                                <div className="title"> {post.title} </div>
                                <div className="text">
                                    {post.paragraphs[0].desc.substring(0, 200)}...
                                </div>
                                <Link to={`/blog/${post._id}`} className="btn">read more</Link>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}