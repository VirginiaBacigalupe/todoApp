import { shallow } from 'enzyme'
import React from 'react'

import { Spinner } from './index'

describe('Spinner', () => {
  it('Show spinner', () => {
    const wrapper = shallow(<Spinner loading={true} />)
    expect(wrapper).toMatchSnapshot()
  })
  it('Do not show spinner', () => {
    const wrapper = shallow(<Spinner loading={false} />)
    expect(wrapper).toMatchSnapshot()
  })
})
