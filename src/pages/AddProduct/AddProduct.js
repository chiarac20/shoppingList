import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Route, useLocation, useHistory } from 'react-router-dom';

import AddShop from "../AddShop/AddShop";
import { shopSliceActions } from "../../store/shopSlice";
import { productsSliceActions } from "../../store/productsSlice";
import { addShopPath } from "../AddShop/addShopInfo";
import classes from './AddProduct.module.css';
import SingleShop from "../../components/SingleShop/SingleShop";

const AddProduct = () => {
    const inputRef=useRef();
    const dispatch=useDispatch();
    const location=useLocation();
    const history=useHistory();
    const shops=useSelector(state => state.shops);
    const shopsSelectionInfo = shops.map(shop => ({shopId: shop.shopId, isSelected: false}));
    const [shopsSelection, setShopsSelection]=useState(shopsSelectionInfo);
    let shopInfo;

    
    
    const onProductAdded = (evt) => { 
        evt.preventDefault(); 
        const productName=inputRef.current.value;
        if(!productName.trim()) {
            inputRef.current.focus();
            return;
        }
        const productId = Math.random().toFixed(8).substring(2);
        const productInfo = {productName, productQuantity: 1, productId, shopId: shopInfo.shopId, urgency: 'medium'}
        dispatch(productsSliceActions.addProduct(productInfo));
        dispatch(shopSliceActions.addShop(shopInfo));
        history.push("/homepage");
    }

    const shopClickHandler = (shopId) => {
        const updatedShopsSelection = shopsSelection.map(shop => (shopId === shop.shopId ? {...shop, isSelected: !shop.isSelected} : shop));
        setShopsSelection(updatedShopsSelection);
    }

    const getSelection = (shopId) => {
        const shop=shopsSelection.find(shop => shopId===shop.shopId);
        return shop.isSelected;
    }

    return <>
        <h2 className={classes.title}>Add a product to multiple shops</h2>
        <div className={classes.shopsSection}>
            {shops.map(shop => <SingleShop key={shop.shopId} shop={shop} onShopClicked={() => shopClickHandler(shop.shopId)} selected={getSelection(shop.shopId)}/>)}
            {location.pathname==={addShopPath} || <Link to={addShopPath} className={classes.addShopCta}>
                Add a new shop
            </Link>}
        </div>
        <Route path={addShopPath}>
            <AddShop  onShopAdded={(shopData) => shopInfo = shopData}/>
        </Route>
        <form onSubmit={(evt) => onProductAdded(evt)} className={classes.productInputSection}>
            <label htmlFor="product" className={classes.productInputLabel}>Add product</label>
            <input type="text" id="product" ref={inputRef} className={classes.productInput}/>
        </form>
    </>
}

export default AddProduct;