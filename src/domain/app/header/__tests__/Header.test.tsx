import { graphql } from 'msw';
import * as React from 'react';
import { vi } from 'vitest';
import { MenuItem } from 'react-helsinki-headless-cms';
import { MockedResponse } from '@apollo/client/testing';

import { MyProfileDocument } from '../../../../generated/graphql';
import { initCmsMenuItemsMocks } from '../../../../test/cmsMocks';
import { server } from '../../../../test/msw/server';
import { fakePage } from '../../../../utils/cmsMockDataUtils';
import { fakePerson } from '../../../../utils/mockDataUtils';
import { render, screen, userEvent } from '../../../../utils/testUtils';
import * as selectors from '../../../auth/selectors';
import Header from '../Header';
import {
  headerMenuMock,
  headerMenuQueryResponse,
} from '../../../../test/apollo-mocks/headerMenuMock';
import { languagesMock } from '../../../../test/apollo-mocks/languagesMock';

vi.mock('../../../auth/selectors', async () => {
  const actual = await vi.importActual('../../../auth/selectors');
  return {
    ...actual,
    isAuthenticatedSelector: vi.fn(),
  };
});
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
    graphql.query('Page', (req, res, ctx) => {
      return res(
        ctx.data({
          page: fakePage(),
        })
      );
    })
  );
});

it('Header matches snapshot', async () => {
  vi.spyOn(selectors, 'isAuthenticatedSelector').mockReturnValue(true);
  const { container } = render(<Header />, { mocks });
  await screen.findByText('Kulttuurikasvatus');
  expect(container.firstChild).toMatchSnapshot();
});

it('focuses skip link first', async () => {
  vi.spyOn(selectors, 'isAuthenticatedSelector').mockReturnValue(true);
  render(<Header />, { mocks });
  await userEvent.tab();
  const skipToContent = await screen.findByText('Siirry sisältöön');
  expect(skipToContent.tagName).toBe('SPAN');
  expect(skipToContent.parentElement?.tagName).toBe('A');
  expect(skipToContent.parentElement).toHaveFocus();
  expect(skipToContent.parentElement).toHaveAttribute('href', '#main-content');
});

const isButton = (
  element: Element | undefined | null
): element is HTMLButtonElement => element?.nodeName === 'BUTTON';

test('header renders cms menu items at top level and directly underneath', async () => {
  vi.spyOn(selectors, 'isAuthenticatedSelector').mockReturnValue(true);
  render(<Header />, { mocks });
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
      const link = await screen.findByRole('link', { name: menuItem.label });
      expect(menuItem.connectedNode.node.uri?.startsWith('/')).toBeTruthy();
      expect(link).toHaveAttribute(
        'href',
        `/fi/cms-page${menuItem.connectedNode.node.uri}`
      );

      if (menuItem.connectedNode.node.children?.nodes) {
        const buttonSiblings = Array.from(
          link.parentElement?.children ?? []
        ).filter(isButton);
        const dropdownButtonSibling = buttonSiblings.find((child) =>
          child.dataset.testid?.startsWith('dropdown-button')
        );
        expect(dropdownButtonSibling).toBeDefined();
        if (dropdownButtonSibling) {
          await userEvent.click(dropdownButtonSibling);
          for (const childItem of menuItem.connectedNode.node.children.nodes) {
            expect(childItem.__typename).toBe('Page');
            expect('title' in childItem && childItem.title).toBeTruthy();
            if (childItem.__typename === 'Page' && childItem.title) {
              const childItemLink = await screen.findByRole('link', {
                name: childItem.title,
              });
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
  }
});
