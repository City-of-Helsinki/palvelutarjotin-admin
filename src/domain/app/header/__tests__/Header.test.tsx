import { MockedResponse } from '@apollo/client/testing';
import { waitFor, within, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import * as HdsReact from 'hds-react';
import { graphql, HttpResponse } from 'msw';
import * as React from 'react';
import { MenuItem } from 'react-helsinki-headless-cms';
import { vi } from 'vitest';

import { MyProfileDocument } from '../../../../generated/graphql';
import {
  headerMenuMock,
  headerMenuQueryResponse,
} from '../../../../test/apollo-mocks/headerMenuMock';
import { languagesMock } from '../../../../test/apollo-mocks/languagesMock';
import { initCmsMenuItemsMocks } from '../../../../test/cmsMocks';
import { server } from '../../../../test/msw/server';
import { fakePage } from '../../../../utils/cmsMockDataUtils';
import { fakePerson } from '../../../../utils/mockDataUtils';
import { customRender } from '../../../../utils/testUtils';
import Header from '../Header';

vi.mock('hds-react', async () => {
  const actual = await vi.importActual('hds-react');
  return {
    ...actual,
    logoFi: 'mocked hds-react logoFi',
  };
});

const profileResponse = {
  data: {
    myProfile: fakePerson({ name: 'John Doe' }),
  },
};

const mocks: MockedResponse[] = [
  {
    request: {
      query: MyProfileDocument,
    },
    result: profileResponse,
  },
  { ...headerMenuMock },
  { ...languagesMock },
];

beforeEach(() => {
  initCmsMenuItemsMocks();
  server.use(
    graphql.query('Page', () => {
      return HttpResponse.json({
        data: {
          page: fakePage(),
        },
      });
    })
  );
});

it('Header matches snapshot', async () => {
  vi.spyOn(HdsReact, 'useOidcClient').mockImplementation(
    () =>
      ({
        isAuthenticated: () => true,
        isRenewing: () => false,
      }) as any
  );
  const { container } = customRender(<Header />, { mocks });
  await screen.findByText('Kulttuurikasvatus');
  expect(container.firstChild).toMatchSnapshot();
});

it('focuses skip link first', async () => {
  vi.spyOn(HdsReact, 'useOidcClient').mockImplementation(
    () =>
      ({
        isAuthenticated: () => true,
        isRenewing: () => false,
      }) as any
  );
  customRender(<Header />, { mocks });
  await screen.findByText('Kulttuurikasvatus');
  await userEvent.tab();
  const skipToContent = await screen.findByText('Siirry sisältöön');
  expect(skipToContent.tagName).toBe('SPAN');
  expect(skipToContent.parentElement?.tagName).toBe('A');
  expect(skipToContent.parentElement).toHaveFocus();
  expect(skipToContent.parentElement).toHaveAttribute('href', '#main-content');
});

test('header renders cms menu items at top level and directly underneath', async () => {
  vi.spyOn(HdsReact, 'useOidcClient').mockImplementation(
    () =>
      ({
        isAuthenticated: () => true,
        isRenewing: () => false,
      }) as any
  );
  customRender(<Header />, { mocks });
  await screen.findByRole('button', { name: 'Suomi' });
  await screen.findByText('Kulttuurikasvatus');

  const topLevelMenuItems: MenuItem[] =
    headerMenuQueryResponse.data.menu.menuItems.nodes.filter(
      (item: MenuItem) => item.parentId === null
    );

  for (const menuItem of topLevelMenuItems) {
    expect(menuItem.connectedNode?.node?.__typename).toBe('Page');
    expect(menuItem.label).toBeTruthy();
    if (menuItem.connectedNode?.node?.__typename === 'Page' && menuItem.label) {
      // Check that top-level menu items are visible and have correct links
      const link = await screen.findByRole('link', { name: menuItem.label });
      expect(menuItem.connectedNode.node.uri?.startsWith('/')).toBeTruthy();
      expect(link).toHaveAttribute(
        'href',
        `/fi/cms-page${menuItem.connectedNode.node.uri}`
      );
      expect(link).toHaveAttribute('id', menuItem.id);
      const linkParent = link.parentElement;
      expect(linkParent).toBeTruthy();

      if (menuItem.connectedNode.node.children?.nodes && linkParent) {
        // Find the dropdown menu opening button
        const dropdownButton: HTMLButtonElement = await within(
          linkParent
        ).findByRole('button', { name: /avaa alasvetovalikko/i });

        // Make sure the dropdown menu is closed
        await waitFor(() =>
          expect(dropdownButton).toHaveAttribute('aria-expanded', 'false')
        );

        // Check that dropdown menu's sub-items are not yet visible
        for (const childItem of menuItem.connectedNode.node.children.nodes) {
          expect(childItem.__typename).toBe('Page');
          expect('title' in childItem && childItem.title).toBeTruthy();
          if (childItem.__typename === 'Page' && childItem.title) {
            expect(
              await screen.findByRole('link', {
                name: childItem.title,
                hidden: true,
              })
            ).not.toBeVisible();
          }
        }

        // Open the dropdown menu
        await userEvent.click(dropdownButton);

        // Make sure the dropdown menu is open
        await waitFor(() =>
          expect(dropdownButton).toHaveAttribute('aria-expanded', 'true')
        );

        // Check that dropdown menu's sub-items are now visible
        // and have correct links
        for (const childItem of menuItem.connectedNode.node.children.nodes) {
          expect(childItem.__typename).toBe('Page');
          expect('title' in childItem && childItem.title).toBeTruthy();
          if (childItem.__typename === 'Page' && childItem.title) {
            const childItemLink = await screen.findByRole('link', {
              name: childItem.title,
            });
            expect(childItemLink).toBeVisible();
            expect(childItem.uri?.startsWith('/')).toBeTruthy();
            expect(childItemLink).toHaveAttribute(
              'href',
              `/fi/cms-page${childItem.uri}`
            );
          }
        }
      }
    }
  }
});
