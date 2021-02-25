import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { Registration } from './Registration';

describe('<Registration />', () => {
  it('should renders correct <Registration />', () => {
    const wrapper = shallow(<Registration />);

    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
