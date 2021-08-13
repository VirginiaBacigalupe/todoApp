import { shallow } from 'enzyme'
import React from 'react'

import { strings } from '../../strings'
import { PinkButton } from './index'

describe('PinkButton', () => {
  it('Pink button renders ok', () => {
    const onPressMock = jest.fn()
    const title = strings.clearAllButton
    const wrapper = shallow(<PinkButton title={title} onPress={onPressMock} />)
    expect(wrapper).toMatchSnapshot()
  })
})
