import { useRef } from "react";
import { useDispatch } from "react-redux";
import { productsSliceActions } from "../../store/productsSlice";
import classes from '../AddProduct/AddProduct.module.css';

const AddProduct = () => {
    const inputRef=useRef();
    const quantityRef=useRef();
    const unitRef=useRef();
    const dispatch=useDispatch();

    const decorateProduct = (urgencyValue) => {
        const productName=inputRef.current.value;
        const quantity=+quantityRef.current.value || 1;
        const unit=unitRef.current.value || '';
        const productId=Math.random().toFixed(6).substring(2);
        return {productName, quantity, unit, productId, urgency: urgencyValue, shopId: 1};
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
        const product=decorateProduct(urgency);
        dispatch(productsSliceActions.addProduct(product));
        inputRef.current.value="";
        quantityRef.current.value=1;
        unitRef.current.value="";
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
            <button type="submit">Running low</button>
            <button type="button" onClick={() => addProduct('low')}>Only if on sale</button>
        </div>
    </form>
}

export default AddProduct;