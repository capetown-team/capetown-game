import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { Input } from './Input';

describe('<Input />', () => {
  it('should renders correct <Input />', () => {
    const wrapper = shallow(<Input>test</Input>);

    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
