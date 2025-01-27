import React from 'react';
import { Provider } from 'react-redux';
import OrderBook from './components/OrderBook';
import { store } from './app/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <OrderBook />
    </Provider>
  );
};

export default App;
