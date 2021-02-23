import React from 'react';
import Button from './Button';
import renderer from 'react-test-renderer';
import { test, expect } from 'jest';

test('First snapshot test', ()=>{
 const component = renderer.create(
  <Button/>
 );
 let tree = component.toJSON();

 expect(tree).toMatchSnapshot();
})
