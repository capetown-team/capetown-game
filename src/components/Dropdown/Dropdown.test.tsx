import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { DropNavType, Dropdown } from '@/components/Dropdown/Dropdown';

describe('<Authorization />', () => {
  it('should renders correct <Dropdown />', () => {
    const dropLists: DropNavType[] = [
      {
        redirect: '/profile',
        name: 'Профиль'
      },
      {
        redirect: '/exit',
        name: 'Выйти'
      }
    ];

    const wrapper = shallow(
      <Dropdown name="Клава" avatar="test" nav={dropLists} />
    );

    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
