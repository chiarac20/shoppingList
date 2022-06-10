import classes from '../SingleShop/SingleShop.module.css';

const SingleShop = ({shop, onShopClicked}) => {
    const shopClasses = `${classes.shopName} ${shop.isSelected ? classes.selected : ''}`;

    return <div className={shopClasses} onClick={onShopClicked} selected={shop.isSelected}>
        {shop.shopName}
    </div>
}

export default SingleShop;