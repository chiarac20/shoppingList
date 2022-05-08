import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classes from "../ShopDetails/ShopDetails.module.css";
import AddProduct from '../../components/AddProduct/AddProduct';
import { MdDelete } from 'react-icons/md';
import { productsSliceActions } from '../../store/productsSlice';

const ShopDetails = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const shops = useSelector(state => state.shops);
    const shop = shops.find(shop => shop.shopId === +params.shopId);
    const shopProducts = products.filter(product => product.shopId === +params.shopId);

    const modifyQuantity = (productInfo) => {
        dispatch(productsSliceActions.modifyQuantity(productInfo))
    }

    return<div>
        <AddProduct />
        <h3 className={classes.shopName}>{shop.shopName}</h3>
        {shopProducts && shopProducts.map(product => 
            (<div key={product.productId} className={classes[`urgency-${product.urgency}`]}>
            {product.productName} {product.quantity} {product.unit || ''} {product.urgency}
            <button onClick={() => modifyQuantity({productId:product.productId, modifier: 1})}>+</button>
            <button onClick={() => modifyQuantity({productId:product.productId, modifier: -1})}>-</button>
        </div>))}
        <button className={classes.removeShopCta}>
            <MdDelete />
        </button>
    </div>
}

export default ShopDetails;