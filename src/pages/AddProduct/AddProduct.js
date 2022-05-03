import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Route } from 'react-router-dom';
import { useEffect } from "react";

import AddShop from "../AddShop/AddShop";
import { productsSliceActions } from "../../store/productsSlice";

let showShopsToSelect=false;

const AddProduct = () => {
    
    const inputRef=useRef();
    const selectRef=useRef();
    const dispatch=useDispatch();
    const shops=useSelector(state => state.shops);
    const products=useSelector(state => state.products);
    
    
    const addProduct = () => {  
        const product=inputRef.current.value;
        if(!product.trim()) {
            inputRef.current.focus();
            return;
        }
        dispatch(productsSliceActions.addProduct(product));
        inputRef.current.value="";
        showShopsToSelect=true;
    }

    const selectShop = () => {
        console.log(selectRef.current.value);
        selectRef.current.value="Select a shop";
        console.log(products.productAdded)
    }

    useEffect(() => {
        inputRef.current.focus();
    }, [])

    return <>
        {!showShopsToSelect && <div>
            <label htmlFor="product">Product name</label>
            <input type="text" id="product" ref={inputRef}/>
            <button onClick={addProduct}>Add</button>
        </div> }
        {showShopsToSelect && <div>
            Where would you like to buy {products.productAdded} ?
            <br></br>
        <br></br>
            <select ref={selectRef}>
                <option>Select a shop</option>
            {shops.map(shop => <option key={shop.shopId}>{shop.shopName}</option>)}
            </select>
            <button onClick={selectShop}>Confirm</button>
            <br></br>
            <br></br>
            <br></br>
        <Link to="/add-product/add-a-shop">Add a new shop to the list</Link>
        <br></br>
        <br></br>
        <br></br>
        <Route path="/add-product/add-a-shop">
            <AddShop />
        </Route>
            </div>}
        
    </>
}

export default AddProduct;