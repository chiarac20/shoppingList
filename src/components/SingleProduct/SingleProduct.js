import { useDispatch } from 'react-redux';

import classes from '../SingleProduct/SingleProduct.module.css';
import { MdOutlineModeEdit, MdDelete } from 'react-icons/md';
import { productsSliceActions } from '../../store/productsSlice';

const SingleProduct = ({product}) => {
    const dispatch=useDispatch();

    const removeProduct = (id) => {
        dispatch(productsSliceActions.removeProduct(id));
    }
    return <div className={classes[`urgency-${product.urgency}`]}>
        <div className={classes.product}> 
            <div>{product.productName}</div>
            <div>
                {product.quantity===1 && product.unit ? product.quantity : ''}
                {product.quantity>1 && product.quantity}
                {product.unit || ''}
            </div> 
            <div className={classes.edit}><MdOutlineModeEdit /></div>
            <button className={classes.removeShopCta} onClick={() => removeProduct(product.productId)}><MdDelete /></button>
        </div>   
    </div>
}

export default SingleProduct;