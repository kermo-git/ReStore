import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/Layout/App';
import reportWebVitals from './reportWebVitals';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory()

ReactDOM.render(
    <React.StrictMode>
        <HistoryRouter history={history}>
            <App/>
        </HistoryRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
