import 'normalize.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlobalStyled from './Components/GlobalStyle/GlobalStyled';
import Layout from './Components/Layout/Layout';
import Homepage from './Components/Pages/Homepage';
import { ThemeProvider } from 'styled-components';
import LoginpageAnimation from './Components/Pages/CMS/LoginPage/LoginpageAnimation';
import AdminPage from './Components/Pages/CMS/AdminPage/AdminPage';
import ArticleFormPage from './Components/Pages/CMS/AdminPage/AdminPageComponents/Common/CreateArticle/ArticleFormPage';
import { SideNavStateContextProvider } from './Components/Hooks/Context/SideNavStateContext';
import CategoryByArticlePage from './Components/Pages/CategoryByArticlePage';
import NewsPage from './Components/Pages/NewsPage';
import InstructionsForUsePage from './Components/Pages/InstructionsForUsePage/InstructionsForUsePage';
import ScrollToTop from './Components/Features/ScrollToTop/ScrollToTop';
import AdPage from './Components/Pages/CMS/AdPage/AdPage';
import MagazineSubScribPage from './Components/Pages/MagazineSubScribPage';
import NotFoundPage from './Components/Pages/NotFoundPage';
import ErrorPage from './Components/Pages/ErrorPage';
import { HelmetProvider } from 'react-helmet-async';
import { ScrollAndStickyCheckContextProvier } from './Components/Hooks/Context/ScrollAndStickyCheckContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import InstructionSubPage from './Components/Pages/InstructionsForUsePage/InstructionSubPage/InstructionSubPage';
import GoogleTranslateLoader from './Components/Features/GoogleTranslateLoader/GoogleTranslateLoader';

const queryClient = new QueryClient();

const theme = {
  primary: {
    red700: '#D1232A',
    red500: '#E23B3F',
    red300: '#F26B6E',
    red100: '#FCD5D5'
  },
  neutral: {
    gray900: '#1A1A1A',
    gray600: '#666666',
    gray300: '#D9D9D9',
    gray100: '#F2F2F2',
    gray0: '#FFFFFF'
  }
}

function App() {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      mirror: false,
      once: true,
      offset: -20,
    });
  }, []);


  return (
    <HelmetProvider>
      <BrowserRouter>
        <RouteAwareHead />
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <GlobalStyled />
            <SideNavStateContextProvider>
              <ScrollAndStickyCheckContextProvier>
                <ScrollToTop />
                <Routes>
                  <Route path='/' element={<Layout />}>
                    <Route index element={<Homepage />} />
                    <Route path='category/:categoryId_param' element={<CategoryByArticlePage />} />
                    <Route path='news/:articleId_param' element={<NewsPage />} />
                    <Route path='instructions' element={<InstructionsForUsePage />}>
                      <Route path=':slug' element={<InstructionSubPage />} />
                    </Route>
                    <Route path='magazine/subscribe' element={<MagazineSubScribPage />} />
                    <Route path='search' element={<CategoryByArticlePage mode={'search'} />} />
                  </Route>
                  <Route path='theiautoCMS'>
                    <Route index element={<LoginpageAnimation />} />
                    <Route path='adminpage' element={<AdminPage />} />
                    <Route path='adminpage/create-article' element={<ArticleFormPage mode={'create'} key="create" />} />
                    <Route path='adminpage/update-article/:articleId' element={<ArticleFormPage mode={'update'} key="update" />} />
                    <Route path='adminpage/advertisement' element={<AdPage />} />
                  </Route>
                  <Route path='error' element={<ErrorPage />} />
                  <Route path='*' element={<NotFoundPage />} />
                </Routes>
              </ScrollAndStickyCheckContextProvier>
            </SideNavStateContextProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </HelmetProvider>
  )
}

function RouteAwareHead() {
  const { pathname } = useLocation();
  const isCMS = pathname.startsWith('/theiautoCMS');

  useEffect(() => {
    document.documentElement.classList.toggle('cms-mode', isCMS);
    if (isCMS) {
      document.body.style.top = '0';
      document.querySelectorAll(
        '.goog-te-banner-frame, .goog-te-menu-frame, #goog-gt-tt, .goog-te-spinner-pos'
      ).forEach((el) => el?.remove?.());
    }
  }, [isCMS]);

  return isCMS ? null : <GoogleTranslateLoader />;
}

export default App;