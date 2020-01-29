import React from 'react'
import ProductsContainer from './ProductsContainer'
import CartContainer from './CartContainer'
import {withRouter} from 'react-router-dom'

const ShoppingCart = ({products}) => {
    return (
        <div>
            <h2>Shopping Cart</h2>
            <hr />
            <ProductsContainer products={products} />
            <hr />
            <CartContainer />
        </div>
    )
}

export default withRouter(ShoppingCart)
