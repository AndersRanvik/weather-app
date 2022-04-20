import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider, theme } from '@chakra-ui/react';
import './App.css';
import Nav from './navigation/nav';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <div className="App">
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
