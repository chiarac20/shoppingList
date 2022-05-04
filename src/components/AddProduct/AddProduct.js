import { useRef } from "react";
import { useDispatch } from "react-redux";
import { productsSliceActions } from "../../store/productsSlice";

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
        console.log(product)
        dispatch(productsSliceActions.addProduct(product));
        inputRef.current.value="";
        quantityRef.current.value=1;
        unitRef.current.value="";
    }

    return <form onSubmit={addRunningLowProduct}>
        <div>
            <label htmlFor="product">Product name</label>
            <input type="text" id="product" ref={inputRef}/>
        </div>
        <div>
            <label htmlFor="quantity">Quantity</label>
            <input type="number" id="quantity" placeholder={1} ref={quantityRef}/>
        </div>
        <div> 
            <label htmlFor="unit">Unit</label>
            <input type="text" id="unit" ref={unitRef}/>
        </div>
        <div>
            <button type="button" onClick={() => addProduct('high')}>Urgent</button>
            <button type="submit">Running low</button>
            <button type="button" onClick={() => addProduct('low')}>Only if on sale</button>
        </div>
    </form>
}

export default AddProduct;