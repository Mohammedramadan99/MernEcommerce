import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import noAccess from '../../Imgs/noAccess_3.png'
const useAuth = () =>
{
    const { user } = useSelector(state => state.auth.userInfo)

    return user && user._id
}

const ProductedUserRoute = () =>
{
    const isAuth = useAuth()
    return isAuth ? <Outlet /> : (
        <div className="accessDenied">
            <div className="container">
                <div className="img">
                    <img src={noAccess} alt="" />
                </div>
                <p>you have to login first to access this page</p>
            </div>
        </div>
    )
}
export default ProductedUserRoute

// anti virus : samadaf