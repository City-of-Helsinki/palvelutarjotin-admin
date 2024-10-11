import * as HdsReact from 'hds-react';
import { MockedResponse } from '@apollo/client/testing';
import { dequal } from 'dequal';
import { graphql, GraphQLContext, ResponseComposition } from 'msw';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';

import AppRoutes from '../../../domain/app/routes/AppRoutes';
import { ROUTES } from '../../../domain/app/routes/constants';
import { MyProfileDocument } from '../../../generated/graphql';
import { PageIdType } from '../../../generated/graphql-cms';
import { initCmsMenuItemsMocks } from '../../../test/cmsMocks';
import { server } from '../../../test/msw/server';
import {
  fakeMediaItem,
  fakePage,
  fakePost,
} from '../../../utils/cmsMockDataUtils';
import {
  fakeOrganisations,
  fakePerson,
  pageInfoMock,
} from '../../../utils/mockDataUtils';
import {
  act,
  render,
  screen,
  userEvent,
  waitFor,
  within,
} from '../../../utils/testUtils';
import { normalizeCmsUri } from '../../utils';
import CmsPage, { breadcrumbsContainerTestId } from '../CmsPage';

const wait = () => act(() => new Promise((res) => setTimeout(res, 500)));

type PageHierarchy = {
  title: string;
  uri: string;
  sidebar?: any;
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
  content: `<p>Kaikki oppimateriaalit</p>`,
  children: searchablePages,
};

const sidebarLayoutLinkList = {
  __typename: 'LayoutLinkList' as const,
  title: 'Tärkeimmät linkit',
  description: 'Tsekkaa nämä linkit ja löydä mahtavaa sisältöä!',
  anchor: 'important-links',
  links: [
    {
      target: '_blank',
      // eslint-disable-next-line max-len
      url: 'https://kultus-ui.test.hel.ninja/cms-page/oppimateriaalit/ylakoulu-ja-toinen-aste/koulujen-elokuvaviikko-elokuvan-kotitehtavat-etaopetukseen',
      title: 'Elokuvaviikon etäkotitehtävät',
    },
    {
      // eslint-disable-next-line max-len
      url: 'https://kultus-ui.test.hel.ninja/cms-page/oppimateriaalit/ylakoulu-ja-toinen-aste/koulujen-elokuvaviikko-elokuvan-kotitehtavat-etaopetukseen',
      title: 'Ideoita elokuvaviikon tunneille',
      target: '',
    },
  ],
};

const sidebarLayoutPage = fakePage({
  title: 'Oppimateriaalit elokuvajuhlia varten',
  uri: '/oppimateriaalit-elokuvajuhlia-varten',
  featuredImage: {
    node: fakeMediaItem({
      mediaItemUrl: 'https://hkih.production.geniem.io/i/1245',
      altText: 'Kirjoja eri väreissä',
    }),
  },
});
const sidebarLayoutPages = {
  __typename: 'LayoutPages' as const,
  pages: [sidebarLayoutPage],
};
const sidebarLayoutArticle = fakePost({
  title: 'Kevät tulee, tuo luonto osaksi opetusta',
  uri: '/kevat-tulee-tuo-luonto-osaksi-opetusta',
});
const sidebarLayoutArticles = {
  __typename: 'LayoutArticles' as const,
  articles: [sidebarLayoutArticle],
};

const pageHierarchy: PageHierarchy[] = [
  {
    title: 'Pääsivu',
    uri: '/paasivu/',
    content: `<h2>${mainPageTitle}</h2><p>${mainPageContent}</p>`,
    sidebar: [sidebarLayoutLinkList, sidebarLayoutPages, sidebarLayoutArticles],
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

const subPagesMocks = [
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
        __typename: 'Page',
        children: {
          pageInfo: {
            endCursor: 10,
            hasNextPage: false,
          },
          edges: searchablePages.map((p) => ({
            cursor: '',
            node: fakePage({
              title: p.title,
              uri: p.uri,
            }),
          })),
        },
      },
    },
  },
  {
    variables: {
      first: 10,
      id: '/paasivu/oppimateriaalit/',
      idType: 'URI',
      search: 'haku',
    },
    response: {
      page: {
        id: 'page2',
        __typename: 'Page',
        children: {
          pageInfo: {
            endCursor: 10,
            hasNextPage: false,
          },
          edges: [
            {
              cursor: '',
              node: fakePage({ title: 'Haettu sivu' }),
            },
          ],
        },
      },
    },
  },
];

const authenticatedInitialState = {
  authentication: {
    tunnistamo: {
      user: { profile: { email: 'test@test.fi' }, access_token: 'token' },
    },
    token: { apiToken: 'token' },
  },
};

function initializeMocks(pageHierarchy: PageHierarchy[]) {
  const mocks: { Page: any[]; SubPagesSearch: typeof subPagesMocks } = {
    Page: [],
    SubPagesSearch: subPagesMocks,
  };
  pageHierarchy.forEach((page) => addMock(page));
  return mocks;

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
          sidebar: page.sidebar ?? [],
          children: {
            edges: [],
            nodes: page.children
              ? page.children.map((child) =>
                  fakePage({
                    uri: child.uri,
                    title: child.title,
                    content: child.content,
                  })
                )
              : [],
            pageInfo: {
              ...pageInfoMock,
              __typename:
                'HierarchicalContentNodeToContentNodeChildrenConnectionPageInfo',
            },
          },
        }),
      },
    });
    page.children?.forEach((child) => addMock(child));
  }
}

// authenticated user needs a profile
const apolloMocks: MockedResponse[] = [
  {
    request: {
      query: MyProfileDocument,
    },
    result: {
      data: {
        myProfile: fakePerson({
          isStaff: true,
          name: 'Test User',
          organisations: fakeOrganisations(1, [
            { name: 'Kulttuuri- ja vapaa-aikalautakunnan kulttuurijaosto' },
          ]),
        }),
      },
    },
  },
];

const mocks = initializeMocks(pageHierarchy);

vi.mock('hds-react', async () => {
  const actual = await vi.importActual('hds-react');
  return {
    ...actual,
  };
});

const handleMockError = ({
  query,
  variables,
  ctx,
  res,
}: {
  query: string;
  variables: any;
  ctx: GraphQLContext<Record<string, any>>;
  res: ResponseComposition<any>;
}) => {
  // eslint-disable-next-line no-console
  console.error('Missing mock with variables: ', variables);
  return res(
    ctx.errors([
      {
        message: `Missing mock for the following query: \n\r\n\rquery: ${query} \n\rvariables: ${JSON.stringify(
          variables,
          null,
          2
        )}`,
      },
    ])
  );
};

beforeEach(() => {
  server.use(
    graphql.query('Page', (req, res, ctx) => {
      const mock = mocks.Page.find(({ variables }) => {
        return dequal(variables, req.variables);
      });

      if (mock) {
        return res(ctx.data(mock.response));
      }

      return handleMockError({
        res,
        ctx,
        variables: req.variables,
        query: 'Page',
      });
    }),
    graphql.query('SubPagesSearch', (req, res, ctx) => {
      const mock = mocks.SubPagesSearch.find(({ variables }) => {
        return dequal(variables, req.variables);
      });

      if (mock) {
        return res(ctx.data(mock.response));
      }

      return handleMockError({
        res,
        ctx,
        variables: req.variables,
        query: 'SubPagesSearch',
      });
    })
  );
});

const getBreadcrumbsContainer = () =>
  within(screen.getByTestId(breadcrumbsContainerTestId));

// FIXME: The pages are not refreshing the content for some reason
test.skip('renders CMS page and navigation flow works', async () => {
  const { menuItems } = initCmsMenuItemsMocks();
  const { container } = render(<AppRoutes />, {
    routes: [`/fi${ROUTES.CMS_PAGE.replace(':slug', 'paasivu')}`],
    initialState: authenticatedInitialState,
    mocks: apolloMocks,
  });
  await wait();
  await testHeaderLinks();
  await testLevel1Navigation();
  await testLevel2Navigation();
  await testLevel3Navigation();
  await testLevel4Navigation();
  await testBreadcrumbNavigation();

  async function testHeaderLinks() {
    for (const menuItem of menuItems) {
      if (menuItem.children) {
        const dropdownButton = await screen.findByRole('button', {
          name: menuItem.title,
        });
        await userEvent.click(dropdownButton);
        for (const childItem of menuItem.children) {
          await screen.findByRole('link', {
            name: childItem.title,
            hidden: true,
          });
        }
        await userEvent.click(dropdownButton);
      } else {
        const link = await screen.findByRole('link', { name: menuItem.title });
        expect(link).toHaveAttribute('href', `/fi/cms-page/${menuItem.slug}`);
      }
    }
  }

  async function testLevel1Navigation() {
    // level 1 navigation breadcrumbs
    expect(window.location.pathname).toBe('/fi/cms-page/paasivu');
    const breadcrumbs = getBreadcrumbsContainer();
    await breadcrumbs.findByRole('link', { name: /kotisivu/i });
    await breadcrumbs.findByText('Pääsivu');
    // main page title and content should be rendered
    screen.getByRole('heading', { name: mainPageTitle });
    screen.getByText(mainPageContent);
  }

  async function testLevel2Navigation() {
    window.history.pushState({}, '', '/fi/cms-page/paasivu/alisivu1');
    await wait();
    expect(window.location.pathname).toBe('/fi/cms-page/paasivu/alisivu1');
    // level 2 navigation breadcrumbs
    const breadcrumbs = getBreadcrumbsContainer();
    await breadcrumbs.findByRole('link', { name: 'Kotisivu' });
    await breadcrumbs.findByRole('link', { name: 'Pääsivu' });
    await breadcrumbs.findByText('Alisivu1');

    // sub page title and content should be rendered
    screen.getByRole('heading', { name: subPageTitle });
    screen.getByText(subPageContent);
  }

  async function testLevel3Navigation() {
    window.history.pushState(
      {},
      '',
      '/fi/cms-page/paasivu/alisivu1/ali2sivu1/'
    );
    await wait();

    // level 3 navigation breadcrumbs
    const breadcrumbs3 = getBreadcrumbsContainer();
    await breadcrumbs3.findByRole('link', { name: 'Kotisivu' });
    await breadcrumbs3.findByRole('link', { name: 'Pääsivu' });
    await breadcrumbs3.findByRole('link', { name: 'Alisivu1' });
    await breadcrumbs3.findByText('Alisivu1 alisivu1');
  }

  async function testLevel4Navigation() {
    window.history.pushState(
      {},
      '',
      '/fi/cms-page/paasivu/alisivu1/ali2sivu1/ali3sivu1/'
    );
    await wait();

    // level 4 navigation breadcrumbs
    const breadcrumbs = getBreadcrumbsContainer();
    await breadcrumbs.findByRole('link', { name: 'Kotisivu' });
    await breadcrumbs.findByRole('link', { name: 'Pääsivu' });
    await breadcrumbs.findByRole('link', { name: 'Alisivu1' });
    await breadcrumbs.findByRole('link', { name: 'Alisivu1 alisivu1' });
    await breadcrumbs.findByText('Alisivu1 alisivu1 alisivu1');
    expect(container).toMatchSnapshot();
  }

  async function testBreadcrumbNavigation() {
    // Test breadcrumb navigation
    const breadcrumbs = getBreadcrumbsContainer();
    const breadcrumbLink = breadcrumbs.getByRole('link', {
      name: 'Alisivu1 alisivu1',
    });
    await userEvent.click(breadcrumbLink);
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
  render(
    <Routes>
      <Route path={`/fi${ROUTES.CMS_PAGE}`} element={<CmsPage />} />
      <Route path={`/fi${ROUTES.CMS_PAGE}/:subslug`} element={<CmsPage />} />
      <Route
        path={`/fi${ROUTES.CMS_PAGE}/:subslug/:subsubslug`}
        element={<CmsPage />}
      />
      <Route
        path={`/fi${ROUTES.CMS_PAGE}/:subslug/:subsubslug/:subsubsubslug`}
        element={<CmsPage />}
      />
    </Routes>,
    {
      routes: [
        `/fi${ROUTES.CMS_PAGE.replace(':slug', 'paasivu')}/oppimateriaalit`,
      ],
    }
  );

  await wait();
  await screen.findByRole('heading', { name: /oppimateriaalit/i });
  await screen.findByText(/kaikki oppimateriaalit/i);
  await screen.findByRole('textbox', { name: /haku/i });

  for (const page of searchablePages) {
    await screen.findByRole('heading', { name: page.title });
  }

  await userEvent.type(screen.getByRole('textbox', { name: /haku/i }), 'haku');

  await screen.findByText('Haettu sivu');

  for (const page of searchablePages) {
    await waitFor(() => {
      expect(
        screen.queryByRole('heading', { name: page.title })
      ).not.toBeInTheDocument();
    });
  }

  await userEvent.clear(screen.getByRole('textbox', { name: /haku/i }));

  // navigation works from page card
  await userEvent.click(
    await screen.findByRole(
      'link',
      {
        name: /oppimateriaali1/i,
      },
      { timeout: 5_000 }
    )
  );

  await wait();

  // test breadcrumbs in search page
  const breadcrumbs = getBreadcrumbsContainer();
  breadcrumbs.getByText('Oppimateriaali1');
  screen.getByRole('heading', { name: 'Oppimateriaali1' });

  expect(window.location.pathname).toBe(
    '/fi/cms-page/paasivu/oppimateriaalit/oppimateriaali1/'
  );
}, 20_000);

test('renders with sidebar layout when sidebar has content', async () => {
  vi.spyOn(HdsReact, 'useOidcClient').mockImplementation(
    () =>
      ({
        isAuthenticated: () => true,
        isRenewing: () => false,
      }) as any
  );
  initCmsMenuItemsMocks();
  render(<AppRoutes />, {
    routes: [`/fi${ROUTES.CMS_PAGE.replace(':slug', 'paasivu')}`],
    initialState: authenticatedInitialState,
    mocks: apolloMocks,
  });

  await wait();

  //-- Renders layout link lists correctly
  // Renders title
  expect(screen.getByText(sidebarLayoutLinkList.title)).toBeInTheDocument();

  // Renders description
  expect(
    screen.getByText(sidebarLayoutLinkList.description)
  ).toBeInTheDocument();

  // Sets anchoring id
  // Check that an element with the ID exists. Use uncommon pattern because we
  // are ensuring a technical detail instead of validating the user
  // experience.
  expect(
    document.querySelector(`#${sidebarLayoutLinkList.anchor}`)
  ).toBeInTheDocument();

  //-- Renders layout pages
  verifyCmsSidebarContentCard({
    title: sidebarLayoutPage.title!,
    url: `${window.origin}/cms-page${sidebarLayoutPage.uri}`,
    image: sidebarLayoutPage.featuredImage?.node?.mediaItemUrl,
    imageAlt: sidebarLayoutPage.featuredImage?.node?.altText,
  });

  //-- Renders layout articles
  verifyCmsSidebarContentCard({
    title: sidebarLayoutArticle.title!,
    url: `${window.origin}/cms-page${sidebarLayoutArticle.uri}`,
  });
});

function verifyCmsSidebarContentCard({
  title,
  url,
  image,
  imageAlt,
}: {
  title: string;
  url: string;
  image?: string | null;
  imageAlt?: string | null;
}) {
  // Has title with correct link
  const link = screen.getByRole('link', {
    name: title,
  }) as HTMLAnchorElement;
  expect(link).toBeInTheDocument();
  expect(link.href).toEqual(url);

  if (imageAlt) {
    // Has image if it exists that has correct alt text
    const imageElement = screen.getByRole('img', {
      name: imageAlt,
    }) as HTMLImageElement;
    expect(imageElement).toBeInTheDocument();
    // Next image components gets an encoded src value
    expect(imageElement.src).toEqual(expect.any(String));
  }
}
