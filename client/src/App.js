import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Nav from './components/Nav';
import TutorDashboard from './pages/dashboard/TutorDashboard';
import StudentsList from './pages/students/StudentsList';
import SessionsPage from './pages/sessions/SessionsPage';

import { Layout } from 'antd'
import './App.css';

const { Footer } = Layout

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Router>
          <Nav />
          <Layout>
            <Routes>
              <Route
                path="/"
                element={<TutorDashboard />}
              />
              <Route
                path="/students"
                element={<StudentsList statuses={["Active", "Inactive"]} />}
              />
              <Route
                path="/students/active"
                element={<StudentsList statuses={["Active"]} />}
              />
              <Route
                path="/sessions"
                element={<SessionsPage />}
              />
              <Route
                path='*'
                element={<h1 className="display-2">404 Not Found</h1>}
              />
            </Routes>
          </Layout>
        </Router>
        <Footer>Footer</Footer>
      </Layout>
    </ApolloProvider>
  );
}

export default App;
