import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { MdOutlineAddShoppingCart } from 'react-icons/md';
import classes from '../Home/Home.module.css';
import { shopDetailsPath } from "../ShopDetails/shopDetailsInfo";

const Home = () => {
    const shops=useSelector(state => state.shops);
    const products=useSelector(state => state.products.products);

    const filterProducts = (shopId) => {
        const filteredByShop = products.filter(product => product.shopId === shopId);
        return filteredByShop.filter(product => product.urgency === 'high');
    }

    return <>
        <ul className={classes.shopList}>
        {shops.map(shop => {
            return <li key={shop.shopId}>
                <Link to={`/${shop.shopId}${shopDetailsPath}`} className={classes.shop}>
                    <div className={classes.shopName}>{shop.shopName}</div> 
                    <div className={classes.urgentProducts}>
                        {filterProducts(shop.shopId).length > 0 ? `${filterProducts(shop.shopId).length} urgent` : 'Nothing urgent'}
                    </div>
                </Link>
                
            </li>
        })}
        </ul>
        <Link to="/add-shop" className={`${classes.shop} ${classes.trolley}`}> 
            <MdOutlineAddShoppingCart />
        </Link>  
    </>
}

export default Home;