import { shallow } from 'enzyme';
import React from 'react';
import App from '../App';

it(`renders App with style`, () => {
  const styleProp = shallow(<App />).dive().prop('style');
  expect(styleProp !== undefined).toBe(true);
});