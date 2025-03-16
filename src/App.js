import 'normalize.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlobalStyled from './Components/GlobalStyle/GlobalStyled';
import Layout from './Components/Layout/Layout';
import Homepage from './Components/Pages/Homepage';
import { ThemeProvider } from 'styled-components';

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
        <GlobalStyled />
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Homepage />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App;