import React from 'react';
import {render} from '@testing-library/react';
import Cell from './index';

test('renders learn react link', () => {
    const {getByText} = render(<Cell/>);
    const linkElement = getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
