import { Navigate, Route, Routes } from 'react-router-dom';
import { MoviesLanding } from './components/pages/MoviesLanding';

import './App.scss';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/search" element={<MoviesLanding />}></Route>
        <Route path="*" element={<Navigate to="search" replace />}></Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
