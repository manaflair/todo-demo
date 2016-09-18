import { resourceRegistry }                                                     from '@manaflair/json-talk/reducers';
import { resourceSaga }                                                         from '@manaflair/json-talk/sagas';
import { reduxBatch }                                                           from '@manaflair/redux-batch';
import ReactDOM                                                                 from 'react-dom';
import { Provider as StoreProvider }                                            from 'react-redux';
import createSagaMiddleware                                                     from 'redux-saga';
import { applyMiddleware, combineReducers, compose, createStore }               from 'redux';

import { Application }                                                          from 'components/Application';

let sagaMiddleware = createSagaMiddleware();

let reducer = combineReducers({ resourceRegistry });
let enhancer = compose(reduxBatch, applyMiddleware(sagaMiddleware), reduxBatch);

let store = createStore(reducer, enhancer);
sagaMiddleware.run(resourceSaga, { baseUrl: `/api` });

let main = document.createElement('div');
document.body.appendChild(main);

ReactDOM.render(<StoreProvider store={store}>
    <Application />
</StoreProvider>, main);
