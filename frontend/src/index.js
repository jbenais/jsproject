import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import mainStore from './stores/mainStore'

ReactDOM.render(
    <Provider store={mainStore}>
    <App/>
    </Provider>, document.getElementById('root')
)

if (module.hot) {
    module.hot.accept();
  }