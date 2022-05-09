import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { MdOutlineAddShoppingCart } from 'react-icons/md';
import classes from '../Home/Home.module.css';

const Home = () => {
    const shops=useSelector(state => state.shops);
    const products=useSelector(state => state.products.products);

    const filterProducts = (shopId) => {
        const filteredByShop = products.filter(product => product.shopId === shopId);
        const filteredByUrgency = filteredByShop.filter(product => product.urgency === 'high');
        return {filteredByShop, filteredByUrgency};
    }

    return <>
        <ul className={classes.shopList}>
        {shops.map(shop => {
            return <li key={shop.shopId} className={classes.shop} onClick={() => console.log('click shop')}>
                <div className={classes.shopName}>{shop.shopName}</div> 
                <div className={classes.urgentProducts}>
                    {filterProducts(shop.shopId).filteredByUrgency.length > 0 ? `${filterProducts(shop.shopId).filteredByUrgency.length} urgent` : ''}
                </div>
                {filterProducts(shop.shopId).filteredByShop.map(product => <div key={product.productId}>
                    {product.productName}
                </div>)}
            </li>
        })}
            <Link to="/add-shop" className={`${classes.shop} ${classes.trolley}`}> 
                <MdOutlineAddShoppingCart />
            </Link>
        </ul>      
    </>
}

export default Home;