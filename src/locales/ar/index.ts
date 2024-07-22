import header from './header.json'
import home from './home.json'
import common from './common.json'
import cart from './cart.json'
import checkout from './checkout.json'
import shipping from './shipping.json'

const ar = {
  ...header,
  ...common,
  ...cart,
  ...checkout,
  ...shipping,
  ...home
}

export default ar
