import { dequal } from 'dequal';
import { graphql } from 'msw';
import React from 'react';

import { ROUTES } from '../../../domain/app/routes/constants';
import { PageIdType } from '../../../generated/graphql-cms';
import { server } from '../../../test/msw/server';
import { fakePage } from '../../../utils/cmsMockDataUtils';
import {
  act,
  renderWithRoute,
  screen,
  userEvent,
  waitFor,
  within,
} from '../../../utils/testUtils';
import { normalizeCmsUri } from '../../utils';
import CmsPage, { breadcrumbsContainerTestId } from '../CmsPage';
import { cmsNavigationContainerTestId } from '../CmsPageNavigation';

const wait = () => act(() => new Promise((res) => setTimeout(res, 500)));

type PageHierarchy = {
  title: string;
  uri: string;
  content?: string;
  children?: PageHierarchy[];
};

const mainPageTitle = 'Pääsivun aliotsikko';
const mainPageContent = 'Pääsivun kontentti';
const subPageTitle = 'Alisivun otsikko';
const subPageContent = 'Alisivun kontentti';

const searchablePages = [
  {
    title: 'Oppimateriaali1',
    uri: '/paasivu/oppimateriaalit/oppimateriaali1/',
  },
  {
    title: 'Oppimateriaali2',
    uri: '/paasivu/oppimateriaalit/oppimateriaali2/',
  },
  {
    title: 'Oppimateriaali3',
    uri: '/paasivu/oppimateriaalit/oppimateriaali3/',
  },
  {
    title: 'Oppimateriaali4',
    uri: '/paasivu/oppimateriaalit/oppimateriaali4/',
  },
  {
    title: 'Oppimateriaali5',
    uri: '/paasivu/oppimateriaalit/oppimateriaali5/',
  },
  {
    title: 'Oppimateriaali6',
    uri: '/paasivu/oppimateriaalit/oppimateriaali6/',
  },
];

const learningMaterialsPage = {
  title: 'Oppimateriaalit',
  uri: '/paasivu/oppimateriaalit/',
  content: `<p>Kaikki opimateriaalit</p>`,
  children: searchablePages,
};

const pageHierarchy: PageHierarchy[] = [
  {
    title: 'Pääsivu',
    uri: '/paasivu/',
    content: `<h2>${mainPageTitle}</h2><p>${mainPageContent}</p>`,
    children: [
      {
        title: 'Alisivu1',
        uri: '/paasivu/alisivu1/',
        content: `<h2>${subPageTitle}</h2><p>${subPageContent}</p>`,
        children: [
          {
            title: 'Alisivu1 alisivu1',
            uri: '/paasivu/alisivu1/ali2sivu1/',
            content: '<p>Sisältö</p>',
            children: [
              {
                title: 'Alisivu1 alisivu1 alisivu1',
                uri: '/paasivu/alisivu1/ali2sivu1/ali3sivu1/',
                content: '<p>Sisältö</p>',
              },
              {
                title: 'Alisivun1 alisivu1 alisivu2',
                uri: '/paasivu/alisivu1/ali2sivu1/ali3sivu2/',
              },
              {
                title: 'Alisivun1 alisivu1 alisivu3',
                uri: '/paasivu/alisivu1/ali2sivu1/ali3sivu3/',
              },
            ],
          },
          {
            title: 'Alisivu1 alisivu2',
            uri: '/paasivu/alisivu1/ali2sivu2/',
          },
          {
            title: 'Alisivu1 alisivu3',
            uri: '/paasivu/alisivu1/ali2sivu3/',
          },
        ],
      },
      learningMaterialsPage,
      {
        title: 'Alisivu3',
        uri: '/paasivu/alisivu3/',
      },
      {
        title: 'Alisivu4',
        uri: '/paasivu/alisivu4/',
      },
    ],
  },
];

function initializeMocks(pageHierarchy: PageHierarchy[]) {
  const mocks = {
    Page: [],
    SubPagesSearch: [
      {
        variables: {
          first: 10,
          id: '/paasivu/oppimateriaalit/',
          idType: 'URI',
          search: '',
        },
        response: {
          page: {
            id: 'page',
            children: {
              pageInfo: {
                endCursor: 10,
                hasNextPage: false,
              },
              edges: searchablePages.map((p) => ({
                cursor: '',
                node: fakePage({ title: p.title, uri: p.uri }),
              })),
            },
          },
        },
      },
    ],
  };
  function addMock(page: PageHierarchy) {
    mocks.Page.push({
      variables: {
        id: normalizeCmsUri(page.uri),
        idType: PageIdType.Uri,
      },
      response: {
        page: fakePage({
          title: page.title,
          uri: page.uri,
          content: page.content,
          children: {
            nodes: page.children
              ? page.children.map((child) =>
                  fakePage({
                    uri: child.uri,
                    title: child.title,
                    content: child.content,
                  })
                )
              : [],
          },
        }),
      },
    });
    page.children?.forEach((child) => addMock(child));
  }
  pageHierarchy.forEach((page) => addMock(page));
  return mocks;
}

const mocks = initializeMocks(pageHierarchy);

beforeEach(() => {
  server.use(
    graphql.query('Page', (req, res, ctx) => {
      const mock = mocks.Page.find(({ variables }) => {
        return dequal(variables, req.variables);
      });

      if (mock) {
        return res(ctx.data(mock.response));
      }

      // eslint-disable-next-line no-console
      console.error('Missing mock with variables: ', req.variables);
      return res(
        ctx.errors([
          {
            message: `Missing mock for the following query: \n\r\n\rquery: Page \n\rvariables: ${JSON.stringify(
              req.variables,
              null,
              2
            )}`,
          },
        ])
      );
    }),
    graphql.query('SubPagesSearch', (req, res, ctx) => {
      const mock = mocks.SubPagesSearch.find(({ variables }) => {
        return dequal(variables, req.variables);
      });

      if (mock) {
        return res(ctx.data(mock.response));
      }

      // eslint-disable-next-line no-console
      console.error('Missing mock with variables: ', req.variables);
      return res(
        ctx.errors([
          {
            message: `Missing mock for the following query: \n\r\n\rquery: Page \n\rvariables: ${JSON.stringify(
              req.variables,
              null,
              2
            )}`,
          },
        ])
      );
    })
  );
});

const getBreadcrumbsContainer = () =>
  within(screen.getByTestId(breadcrumbsContainerTestId));
const getCmsNavigationContainer = () =>
  within(screen.getByTestId(cmsNavigationContainerTestId));

test('renders CMS page and navigation flow works', async () => {
  const { container } = renderWithRoute(<CmsPage />, {
    routes: [`/fi${ROUTES.CMS_PAGE.replace(':slug', 'paasivu')}`],
    path: `/fi${ROUTES.CMS_PAGE}+`,
  });
  await wait();
  await testLevel1Navigation();
  await testLevel2Navigation();
  await testLevel3Navigation();
  await testLevel4Navigation();
  await testBreadcrumbNavigation();

  async function testLevel1Navigation() {
    // all level 1 navigation links should be rendered
    pageHierarchy[0].children.forEach(({ title }) => screen.getByText(title));

    // level 2 navigation links shouldn't be rendered yet
    pageHierarchy[0].children[0].children.forEach(({ title }) =>
      expect(screen.queryByText(title)).not.toBeInTheDocument()
    );

    // level 1 navigation breadcrumbs
    const breadcrumbs = getBreadcrumbsContainer();
    breadcrumbs.getByRole('link', { name: /kotisivu/i });
    breadcrumbs.getByText('Pääsivu');

    // main page title and content should be rendered
    screen.getByRole('heading', { name: mainPageTitle });
    screen.getByText(mainPageContent);
  }

  async function testLevel2Navigation() {
    userEvent.click(await screen.findByText(/alisivu1/i));
    await wait();

    // all level 1 and 2 navigation links shuld be rendered
    pageHierarchy[0].children.forEach(({ title }) =>
      getCmsNavigationContainer().getByText(title)
    );
    pageHierarchy[0].children[0].children.forEach(({ title }) =>
      getCmsNavigationContainer().getByText(title)
    );

    // first child should be active after navigating to it
    const firstNavigationChild = screen.getByRole('link', {
      name: pageHierarchy[0].children[0].title,
    });
    expect(firstNavigationChild).toHaveClass('activeLink');

    // level 2 navigation breadcrumbs
    const breadcrumbs = getBreadcrumbsContainer();
    breadcrumbs.getByRole('link', { name: 'Kotisivu' });
    breadcrumbs.getByRole('link', { name: 'Pääsivu' });
    breadcrumbs.getByText('Alisivu1');

    // sub page title and content should be rendered
    screen.getByRole('heading', { name: subPageTitle });
    screen.getByText(subPageContent);
  }

  async function testLevel3Navigation() {
    userEvent.click(await screen.findByText(/alisivu1 alisivu1/i));
    await wait();

    // all level 1 and 2 and 3  navigation links shuld be rendered
    pageHierarchy[0].children.forEach(({ title }) =>
      getCmsNavigationContainer().getByText(title)
    );
    pageHierarchy[0].children[0].children.forEach(({ title }) =>
      getCmsNavigationContainer().getByText(title)
    );
    pageHierarchy[0].children[0].children[0].children.forEach(({ title }) =>
      getCmsNavigationContainer().getByText(title)
    );

    const navigation = getCmsNavigationContainer();
    // two navigation links should be active after navigating
    const firstNavigationChild = navigation.getByRole('link', {
      name: pageHierarchy[0].children[0].title,
    });
    const secondNavigationChild = navigation.getByRole('link', {
      name: pageHierarchy[0].children[0].children[0].title,
    });
    expect(firstNavigationChild).toHaveClass('activeLink');
    expect(secondNavigationChild).toHaveClass('activeLink');

    // level 3 navigation breadcrumbs
    const breadcrumbs3 = getBreadcrumbsContainer();
    breadcrumbs3.getByRole('link', { name: 'Kotisivu' });
    breadcrumbs3.getByRole('link', { name: 'Pääsivu' });
    breadcrumbs3.getByRole('link', { name: 'Alisivu1' });
    breadcrumbs3.getByText('Alisivu1 alisivu1');
  }

  async function testLevel4Navigation() {
    userEvent.click(await screen.findByText(/alisivu1 alisivu1 alisivu1/i));
    await wait();

    // all level 1 and 2 and 3 navigation links should still be rendered
    pageHierarchy[0].children.forEach(({ title }) =>
      getCmsNavigationContainer().getByText(title)
    );
    pageHierarchy[0].children[0].children.forEach(({ title }) =>
      getCmsNavigationContainer().getByText(title)
    );
    pageHierarchy[0].children[0].children[0].children.forEach(({ title }) =>
      getCmsNavigationContainer().getByText(title)
    );

    // three navigation links should be active after navigating
    const navigation = getCmsNavigationContainer();
    const firstNavigationChild = navigation.getByRole('link', {
      name: pageHierarchy[0].children[0].title,
    });
    const secondNavigationChild = navigation.getByRole('link', {
      name: pageHierarchy[0].children[0].children[0].title,
    });
    const thirdNavigationChild = navigation.getByRole('link', {
      name: pageHierarchy[0].children[0].children[0].children[0].title,
    });
    expect(firstNavigationChild).toHaveClass('activeLink');
    expect(secondNavigationChild).toHaveClass('activeLink');
    expect(thirdNavigationChild).toHaveClass('activeLink');

    // level 4 navigation breadcrumbs
    const breadcrumbs = getBreadcrumbsContainer();
    breadcrumbs.getByRole('link', { name: 'Kotisivu' });
    breadcrumbs.getByRole('link', { name: 'Pääsivu' });
    breadcrumbs.getByRole('link', { name: 'Alisivu1' });
    breadcrumbs.getByRole('link', { name: 'Alisivu1 alisivu1' });
    breadcrumbs.getByText('Alisivu1 alisivu1 alisivu1');

    expect(container).toMatchSnapshot();
  }

  async function testBreadcrumbNavigation() {
    // Test breadcrumb navigation
    const breadcrumbs = getBreadcrumbsContainer();
    const breadcrumbLink = breadcrumbs.getByRole('link', {
      name: 'Alisivu1 alisivu1',
    });
    userEvent.click(breadcrumbLink);
    await waitFor(() => {
      expect(
        breadcrumbs.queryByText('Alisivu1 alisivu1 alisivu1')
      ).not.toBeInTheDocument();
    });
    // should be as link in the document because it is the current page
    expect(
      breadcrumbs.queryByRole('link', { name: 'Alisivu1 alisivu1' })
    ).not.toBeInTheDocument();
    // but text should be found as it is the current page
    breadcrumbs.getByText('Alisivu1 alisivu1');
  }
});

test('CMS sub pages can be searched', async () => {
  const { history } = renderWithRoute(<CmsPage />, {
    routes: [`/fi${ROUTES.CMS_PAGE.replace(':slug', 'paasivu')}`],
    path: `/fi${ROUTES.CMS_PAGE}+`,
  });

  userEvent.click(await screen.findByRole('link', { name: 'Oppimateriaalit' }));

  await screen.findByRole('heading', { name: /oppimateriaalit/i });
  await screen.findByText(/kaikki opimateriaalit/i);
  await screen.findByRole('textbox', { name: /haku/i });

  for (const page of searchablePages) {
    await screen.findByRole('heading', { name: page.title });
  }

  // navigation works from page card
  userEvent.click(
    screen.getByRole('link', {
      name: /oppimateriaali1/i,
    })
  );

  await wait();

  const breadcrumbs = getBreadcrumbsContainer();
  breadcrumbs.getByText('Oppimateriaali1');
  screen.getByRole('heading', { name: 'Oppimateriaali1' });

  expect(history.location.pathname).toBe(
    '/fi/cms-page/paasivu/oppimateriaalit/oppimateriaali1/'
  );
});
