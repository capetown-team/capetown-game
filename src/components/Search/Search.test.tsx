import React, { ChangeEvent } from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { Search } from './Search';

describe('<Search />', () => {
  it('should renders correct <Button />', () => {
    const value = { text: '' };
    const wrapper = shallow(
      <Search
        searchHandler={(event: ChangeEvent<HTMLInputElement>) => {
          value.text = event.target.value;
        }}
      />
    );

    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
