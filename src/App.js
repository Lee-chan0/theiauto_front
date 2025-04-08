import 'normalize.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlobalStyled from './Components/GlobalStyle/GlobalStyled';
import Layout from './Components/Layout/Layout';
import Homepage from './Components/Pages/Homepage';
import { ThemeProvider } from 'styled-components';
import LoginpageAnimation from './Components/Pages/CMS/LoginPage/LoginpageAnimation';
import AdminPage from './Components/Pages/CMS/AdminPage/AdminPage';
import UpdateUserProfilePage from './Components/Pages/CMS/AdminPage/AdminPageComponents/Common/UserProfile/UpdateuserProfile/UpdateUserProfile';
import ArticleFormPage from './Components/Pages/CMS/AdminPage/AdminPageComponents/Common/CreateArticle/ArticleFormPage';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SideNavStateContextProvider } from './Components/Hooks/Context/SideNavStateContext';

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
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyled />
          <SideNavStateContextProvider>
            <Routes>
              <Route path='/' element={<Layout />}>
                <Route index element={<Homepage />} />
              </Route>
              <Route path='theiautoCMS'>
                <Route index element={<LoginpageAnimation />} />
                <Route path='adminpage' element={<AdminPage />} />
                <Route path='adminpage/create-article' element={<ArticleFormPage mode={'create'} key="create" />} />
                <Route path='adminpage/update-article/:articleId' element={<ArticleFormPage mode={'update'} key="update" />} />
                <Route path='adminpage/update-user-profile' element={<UpdateUserProfilePage />} />
              </Route>
            </Routes>
          </SideNavStateContextProvider>
        </ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App;