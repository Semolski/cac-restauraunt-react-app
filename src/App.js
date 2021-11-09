import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store } from './redux/store';

import './App.css';

import Main from './components/main/main.component';

const store = Store();

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter basename="/">
                    <div>
                        <Main />
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
