import ReactDOM                                                                 from 'react-dom';
import { Provider as StoreProvider }                                            from 'react-redux';
import createSagaMiddleware                                                     from 'redux-saga';
import { applyMiddleware, combineReducers, createStore }                        from 'redux';

import { Application }                                                          from 'components/Application';

let sagaMiddleware = createSagaMiddleware();

let reducer = combineReducers({});
let enhancer = applyMiddleware(sagaMiddleware);

let store = createStore(reducer, enhancer);

let main = document.createElement('div');
document.body.appendChild(main);

ReactDOM.render(<StoreProvider store={store}>
    <Application />
</StoreProvider>, main);
