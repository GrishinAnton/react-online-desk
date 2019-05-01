//Core
import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Composer from './'

configure({ adapter: new Adapter })

const result = mount(<Composer />)

describe('Composer component:', () => {
    test('should have 1 "section" element', () => {
        expect(result.find('section')).toHaveLength(1)
    })
})