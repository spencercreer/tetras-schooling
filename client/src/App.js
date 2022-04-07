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
import AddStudentForm from './pages/AddStudentForm';
import StudentsList from './pages/StudentsList';

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
                  path="/dashboard"
                  element={<TutorDashboard />}
                />
                <Route
                  path="/addStudent"
                  element={<AddStudentForm />}
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
                  path='*'
                  element={<h1 className="display-2">Wrong page!</h1>}
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
