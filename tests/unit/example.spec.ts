import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import YourComponent from '@/components/YourComponent.vue'

describe('YourComponent', () => {
  it('renders properly', () => {
    const wrapper = mount(YourComponent, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
