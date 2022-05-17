import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import App from './App/Layout/App';
import { store } from './App/Store/ConfigureStore';

export const history = createBrowserHistory()

ReactDOM.render(
    <React.StrictMode>
        <HistoryRouter history={history}>
			<Provider store={store}>
				<App/>
			</Provider>
        </HistoryRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
