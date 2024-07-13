import { createPinia, setActivePinia } from 'pinia'
import { useCartStore } from '@/stores/cart'

describe('Cart', () => {
  let cartStore: ReturnType<typeof useCartStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    cartStore = useCartStore()
  })

  it('should initialize with an empty cart', () => {
    expect(cartStore.items.length).toBe(0)
    expect(cartStore.total).toBe(0)
  })

  it('should add an item to the cart', () => {
    cartStore.addItem({
      id: 1,
      book_id: 1,
      quantity: 1,
      book: {
        id: 1,
        title: 'Test Book',
        price: 9.99,
        image: 'test.jpg'
      }
    })

    expect(cartStore.items.length).toBe(1)
    expect(cartStore.total).toBe(9.99)
  })

  it('should remove an item from the cart', () => {
    cartStore.addItem({
      id: 1,
      book_id: 1,
      quantity: 1,
      book: {
        id: 1,
        title: 'Test Book',
        price: 9.99,
        image: 'test.jpg'
      }
    })

    cartStore.removeItem(1)

    expect(cartStore.items.length).toBe(0)
    expect(cartStore.total).toBe(0)
  })
})
