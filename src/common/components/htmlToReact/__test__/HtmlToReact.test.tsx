import React from 'react';

import { render, screen } from '../../../../utils/testUtils';
import HtmlToReact from '../HtmlToReact';

it('sanitizes and renders html string as react components', () => {
  render(
    <div>
      <HtmlToReact>
        {`<div>
            <h1>Otsikko</h1>
            <p>Leipäteksti</p>
          </div>`}
      </HtmlToReact>
    </div>
  );

  expect(
    screen.queryByRole('heading', { name: 'Otsikko' })
  ).toBeInTheDocument();
  expect(screen.queryByText('Leipäteksti')).toBeInTheDocument();

  const heading = document.querySelector('h1');
  expect(heading).toHaveTextContent('Otsikko');

  const paragraph = document.querySelector('p');
  expect(paragraph).toHaveTextContent('Leipäteksti');
});
