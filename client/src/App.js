import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import Layout from './layout/Layout';
// admin
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout /> 
      </Router>
    </Provider>
  );
}

export default App;
