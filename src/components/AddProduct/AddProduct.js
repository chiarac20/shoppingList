import { useRef, useImperativeHandle, forwardRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { productsSliceActions } from "../../store/productsSlice";
import { shopSliceActions } from "../../store/shopSlice";
import classes from '../AddProduct/AddProduct.module.css';

const AddProduct = forwardRef((props, ref) => {
    const [productToEdit, setProductToEdit]=useState();
    const inputRef=useRef();
    const quantityRef=useRef();
    const unitRef=useRef();
    const dispatch=useDispatch();
    const params=useParams();
    const history=useHistory();
    const shopId=params?.shopId || null;

    useImperativeHandle(ref, () => ({
        editInput: (product) => {
          setProductToEdit(product);
          inputRef.current.value=product.productName;
          quantityRef.current.value=product.quantity;
          unitRef.current.value=product.unit;
        },
    }));
    
    const editProduct = (product) => {
        dispatch(productsSliceActions.editProduct(product));
        inputRef.current.value="";
        quantityRef.current.value=1;
        unitRef.current.value="";
    }

    const getEnteredInput = (urgencyValue) => {
        const productName=inputRef.current.value;
        const quantity=+quantityRef.current.value || 1;
        const unit=unitRef.current.value || '';
        return {productName, quantity, unit, urgency: urgencyValue};
    }

    const decorateProduct = (urgencyValue) => {
        const product = getEnteredInput(urgencyValue);
        const productId=Math.random().toFixed(6).substring(2);
        return shopId ? {...product, productId, urgency: urgencyValue, shopId: [shopId]}
        : {...product, productId, urgency: urgencyValue, shopId: props.shopIds};
    }

    const addRunningLowProduct = (evt) => {
        evt.preventDefault();
        addProduct('medium');
    };
    const addProduct = (urgency) => {
        const productName=inputRef.current.value;
        if(!productName.trim()) {
            inputRef.current.focus();
            return;
        }
        if(!shopId && !props.shopIds.length) {
            alert('Select a shop')
            return;
        }
        if(productToEdit) {
            const enteredValues=getEnteredInput(urgency);
            const editedProduct= {
                ...productToEdit, 
                productName: enteredValues.productName, 
                quantity: enteredValues.quantity, 
                unit: enteredValues.unit, 
                urgency: enteredValues.urgency
            };
            editProduct(editedProduct);
            return;
        }
        const product=decorateProduct(urgency);
        dispatch(productsSliceActions.addProduct(product));
        dispatch(shopSliceActions.unselectAll());
        inputRef.current.value="";
        quantityRef.current.value=1;
        unitRef.current.value="";
        if(!shopId) {
            history.push("/homepage");
        }
    }

    return <form onSubmit={addRunningLowProduct}>
        <div className={classes.inputSectionWrapper}>
            <div className={classes.inputSection}>
                <span className={classes.inputLabel}><label htmlFor="product">Name</label></span>
                <input type="text" id="product" ref={inputRef} className={classes.input}/>
            </div>
            <div className={classes.inputSection}>
                <label htmlFor="quantity" className={classes.inputLabel}>Quantity</label>
                <input type="number" id="quantity" placeholder={1} ref={quantityRef} className={classes.input}/>
            </div>
            <div className={classes.inputSection}> 
                <label htmlFor="unit" className={classes.inputLabel}>Unit</label>
                <input type="text" id="unit" ref={unitRef} className={classes.input}/>
            </div>
        </div>
        <div className={classes.urgencyCtas}>
            <button type="button" onClick={() => addProduct('high')}>Urgent</button>
            <button type="button" onClick={() => addProduct('medium')}>Running low</button>
            <button type="button" onClick={() => addProduct('low')}>Only if on sale</button>
        </div>
    </form>
})

export default AddProduct;