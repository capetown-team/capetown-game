import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { ItemForum } from './ItemForum';

describe('<Authorization />', () => {
  it('should renders correct <ItemForum />', () => {
    const wrapper = shallow(<ItemForum />);

    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
