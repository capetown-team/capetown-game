import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { PaginateType } from '@/types.d';
import { Pagination } from './Pagination';

describe('<Pagination />', () => {
  it('should renders correct <Button />', () => {
    const number = 1;
    const handlerPaginate: PaginateType = () => {
      return number + 2;
    };
    const wrapper = shallow(
      <Pagination
        usersPerPage={7}
        totalUsers={20}
        paginate={handlerPaginate}
        currentPage={1}
      />
    );

    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
