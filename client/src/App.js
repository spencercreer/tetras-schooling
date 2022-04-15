import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Nav from './components/Nav';
import NavSider from './components/NavSider';
import TutorDashboard from './pages/TutorDashboard';
import AddSessionForm from './pages/AddSessionForm';
import StudentsList from './pages/StudentsList';
import SessionsList from './pages/SessionsList';

import { Layout } from 'antd'
import './App.css';

const { Footer, Content } = Layout

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
            <NavSider />
            <Content>
              <Routes>
              <Route
                  path="/"
                  element={<TutorDashboard />}
                />
                <Route
                  path="/addSession"
                  element={<AddSessionForm />}
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
                  element={<SessionsList />}
                />
                <Route
                  path='*'
                  element={<h1 className="display-2">404 Not Found</h1>}
                />
              </Routes>
            </Content>
          </Layout>
        </Router>
        <Footer>Footer</Footer>
      </Layout>
    </ApolloProvider>
  );
}

export default App;
