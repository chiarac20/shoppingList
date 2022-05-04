import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import classes from "../ShopDetails/ShopDetails.module.css";
import AddProduct from '../../components/AddProduct/AddProduct';

const ShopDetails = () => {
    const params = useParams();
    const products = useSelector(state => state.products.products);
    const shops = useSelector(state => state.shops);

    const shopProducts =  products.filter(product => product.shopId === params.shopId);

    return<div>
        <AddProduct />
        {shopProducts && shopProducts.map(product => 
            (<div key={product.productId} className={classes[`urgency-${product.urgency}`]}>
            {product.productName} {product.quantity} {product.unit || ''} {product.urgency}
        </div>))}
    </div>
}

export default ShopDetails;