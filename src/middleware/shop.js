
import _products from './products.json'
const TIMEOUT = 1000

export default {
    getProducts: (dispatchAction, timeout) => setTimeout(() => dispatchAction(_products), timeout || TIMEOUT),
    buyProducts: (payload, dispatchAction, timeout) => setTimeout(() => {
        console.table({payload});
        dispatchAction()
    }, timeout || TIMEOUT),
}