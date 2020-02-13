
import '@testing-library/jest-dom/extend-expect'
import { FsmContainerComponent } from "./fsm-container.component";
import React from 'react';
import { render } from '@testing-library/react';
import { screen, fireEvent } from '@testing-library/dom';

describe('FSMContainer',() => {
    it('should render', () => {
        const {getByText, getAllByRole} = render(<FsmContainerComponent label={'label'}/>);
        expect(getByText('OK')).toBeInTheDocument();
        expect(getAllByRole('button').length).toEqual(2);
        const [button] = getAllByRole('button');
        fireEvent.click(button);
        expect(getByText('Active! Click to deactivate')).toBeInTheDocument()
        // screen.debug();
    });
});