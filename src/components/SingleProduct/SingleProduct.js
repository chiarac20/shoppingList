import { useDispatch } from 'react-redux';
import { useState } from 'react';

import classes from '../SingleProduct/SingleProduct.module.css';
import { MdOutlineModeEdit, MdDelete } from 'react-icons/md';
import { productsSliceActions } from '../../store/productsSlice';

const SingleProduct = ({product, editProduct}) => {
    const dispatch=useDispatch();
    const [checkboxState, setCheckboxState]=useState(false);

    const removeProduct = (id) => {
        dispatch(productsSliceActions.removeProduct(id));
    }

    return <div className={classes[`urgency-${product.urgency}`]}>
        <div className={classes.product}> 
            <input type="checkbox" checked={checkboxState} onChange={() => setCheckboxState(!checkboxState)}/>
            <div onClick={() => setCheckboxState(!checkboxState)}>
                <div>{product.productName}</div>
                <div>{product.quantity===1 && product.unit ? product.quantity : ''}</div>
                <div>{product.quantity>1 && product.quantity}</div> {product.unit || ''}
            </div>
            {checkboxState && <button className={classes.removeShopCta} onClick={() => removeProduct(product.productId)}><MdDelete /></button>}
            <div className={classes.edit} onClick={() => editProduct(product)}><MdOutlineModeEdit /></div>
        </div>   
    </div>
}

export default SingleProduct;