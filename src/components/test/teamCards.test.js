import { render, unmountComponentAtNode } from 'react-dom';
import React from 'react';
import act from 'react-dom';

import TeamCard from '../teamCards';

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders with a name', () => {
  act(() => {
    render(<TeamCard team='Shannon' />, container);
  });
  expect(container.textContent).toBe('Team Shannon!');
});
