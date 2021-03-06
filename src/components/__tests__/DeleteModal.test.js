import React from 'react';
import { mount } from 'enzyme';
import { Root } from 'components/Root';
import DeleteModal from 'components/DeleteModal';

describe('DeleteModal', () => {
  let component;
  let mockAcceptHandler = jest.fn();

  beforeEach(() => {
    component = mount(
      <Root>
        <DeleteModal acceptHandler={mockAcceptHandler} />
      </Root>
    );
  });

  it('renders correctly', () => {
    expect(component.exists()).toEqual(true);
  });

  it('shows a content div', () => {
    expect(component.find('div.modal-content').length).toEqual(1);
  });

  it('shows a footer', () => {
    expect(component.find('div.modal-footer').length).toEqual(1);
  });

  it('shows an accept and a cancel button', () => {
    let buttons = component.find('button.modal-close');
    expect(buttons.length).toEqual(2);
    expect(buttons.get(0).textContent).toEqual('Accept');
    expect(buttons.get(1).textContent).toEqual('Cancel');
  });
});
