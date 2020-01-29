import React from 'react'
import PropTypes from 'prop-types'
import ProductList from '../components/ProductList'
import ProductItem from '../components/ProductItem'
import { addToCart } from '../actions'
import {connect} from 'react-redux'
import { getAllProducts } from '../actions/shopping'
import { getVisibleProducts } from '../reducers/shopping'
import { bindActionCreators } from 'redux'

const ProductsContainer = ({ products, addToCart }) => 
    <ProductList title="Products">
        {products.map(product =>
            <ProductItem
                key={product.id}
                product={product}
                onAddToCartClicked={() => { addToCart(product.id) }}
            />
        )
        }
    </ProductList>

ProductsContainer.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        inventory: PropTypes.number.isRequired
    })).isRequired,
    addToCart: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    const products = getVisibleProducts(state.products)
    return {
        products
    }    
}

const mapDispatchToProps = dispatch => {
    dispatch(getAllProducts())
    const actions = bindActionCreators({addToCart}, dispatch)
    return {
        ...actions,
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer)