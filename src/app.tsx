import * as React from 'react';
import { Provider } from 'react-redux';

import Main from './router/index';

import { store } from './redux/store';

export class App extends React.Component<any, any> {
  render() {
    return <Provider store={store}>
      <Main />
    </Provider>;
  }
}
