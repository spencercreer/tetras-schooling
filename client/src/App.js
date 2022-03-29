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
import Students from './components/Students';
import StudentForm from './components/StudentForm';

import AddStudent from './pages/AddStudent';

import { Layout } from 'antd'
import './App.css';
import StudentDashboard from './pages/StudentDashboard';

const { Footer, Content } = Layout

const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
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
            <NavSider></NavSider>
            <Content>
              <Routes>
                <Route
                  path="/addStudent"
                  element={<AddStudent />}
                />
                <Route
                  path="/students"
                  element={<StudentDashboard />}
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
