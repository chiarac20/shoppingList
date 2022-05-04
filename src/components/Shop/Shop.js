import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { MdDelete } from 'react-icons/md';
import classes from '../Shop/Shop.module.css';

const Shop = ({shop, removeShop}) => {
    const products = useSelector(state => state.products.products);
    const shopProducts = products.filter(product => product.shopId === shop.shopId);
    const urgentProducts =  shopProducts.filter(product => product.urgency === "high");
   
    return <Link to={`/${shop.shopId}/add-product`} className={classes.shop}>
        <div className={classes.shopOverview}>
            <div className={classes.shopName}>{shop.shopName}</div>
            <div className={classes['urgency-high']}>{urgentProducts.length || ''}</div>
            <button onClick={() => removeShop(shop.shopId)} className={classes.removeShopCta}>
                <MdDelete />
            </button>     
        </div>  
        {<div className={classes.shopDetails}>
                
            </div>} 
    </Link>  
}

export default Shop;

