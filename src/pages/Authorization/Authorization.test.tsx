import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { Authorization } from './Authorization';

describe('<Authorization />', () => {
  it('should renders correct <Authorization />', () => {
    const wrapper = shallow(<Authorization />);

    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
