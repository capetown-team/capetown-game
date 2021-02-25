import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { Button } from './Button';

describe('<Button />', () => {
  it('should renders correct <Button />', () => {
    const wrapper = shallow(<Button size="s">test</Button>);

    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
