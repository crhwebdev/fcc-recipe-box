import React from "react";
import { shallow, mount } from "enzyme";
import Header  from "components/Header";
import AddButton from 'components/Buttons/AddButton';
import DeleteModal from 'components/DeleteModal';

var component;

describe("Header", () =>{
    beforeEach(() => {
        component = shallow(
            <Header />                
        );
    });

    it('renders correctly', () => {
        expect(component.exists()).toEqual(true);
    });

    it('shows an add button', () => {
        expect(component.find('AddButton').length).toEqual(1);                 
    });
    
});