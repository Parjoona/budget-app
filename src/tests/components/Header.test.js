import React from 'react'
import { shallow } from 'enzyme'

// import ReactShallowRenderer from 'react-test-renderer/shallow'

import { Header } from '../../components/Header'

///////////////////////////////////////////
/////// Shallow rendering
// Takes a look at the component
/////// Snapshot rendering
// Tracks changes in data from components

test('Should render correctly', () => {
    // const renderer = new ReactShallowRenderer()
    // renderer.render(<Header />)
    // expect(renderer.getRenderOutput()).toMatchSnapshot()

    const wrapper = shallow(<Header startLogout={() => {}}/>)
    // expect(wrapper.find('h1').length).toBe(1)
    expect(wrapper).toMatchSnapshot()
})

test('Should call startLogout on button click', () => {
    const startLogout = jest.fn()
    const wrapper = shallow(<Header startLogout={startLogout}/>)
    wrapper.find('button').simulate('click')
    expect(startLogout).toHaveBeenCalled()
})