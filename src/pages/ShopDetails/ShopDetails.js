import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useCallback, useMemo } from "react";
import classes from "../ShopDetails/ShopDetails.module.css";
import AddProduct from '../../components/AddProduct/AddProduct';
import SingleProduct from "../../components/SingleProduct/SingleProduct";
import { productsSliceActions } from "../../store/productsSlice";
import { shopSliceActions } from "../../store/shopSlice";
import { MdDelete } from 'react-icons/md';
import { homePath } from "../Home/homeInfo";

const getShopProducts = (products, shopId) => products.filter(product => product.shopId.includes(shopId));

const ShopDetails = () => {
    const addProductRef=useRef();
    const params = useParams();
    const dispatch=useDispatch();
    const shopId = params.shopId;
    const history = useHistory();

    const products = useSelector(state => state.products.products);
    const shopProducts = useMemo(() => getShopProducts(products, shopId), [products, shopId]);
    const shops = useSelector(state => state.shops);
    const selectedShop = shops.find(shop => shop.shopId === shopId);
    const productList = useMemo(() => [...shopProducts].sort((a, b) => {
        if (a.urgency === b.urgency) return 0;
        if (a.urgency === 'high') return -1;
        if (a.urgency === 'low') return 1;
        if (b.urgency === 'high') return 1;
        return -1;
    }), [shopProducts]);
   
    const editProduct = useCallback(product => {
        addProductRef.current.editInput(product);
    }, [addProductRef]);

    const deleteShopContent = () => {
        shopProducts.forEach(({productId}) => {
            dispatch(productsSliceActions.removeProduct(productId));
        });
        dispatch(shopSliceActions.removeShop(shopId));
        history.replace(homePath);
    }
    
    return<div className={classes.shopDetailsSection}>
        <AddProduct ref={addProductRef}/>
        <div className={classes.shopNameSection}>
            <h2 className={classes.shopName}>{selectedShop.shopName}</h2>
            <button className={classes.removeShopCta} onClick={deleteShopContent}>
                <MdDelete />
            </button>
        </div>
        <ul className={classes.productsList}>
            {productList.map(product => <li key={product.productId} className={classes.productLine}>
                <SingleProduct product={product} editProduct={editProduct}/>
            </li>)}
        </ul>
    </div>
}

export default ShopDetails;