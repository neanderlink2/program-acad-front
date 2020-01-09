
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { rootReducer } from '../modules'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from '../modules/index';


export const history = createBrowserHistory()
const saga = createSagaMiddleware();

const initialState = {}
const enhancers: any[] = []
const middleware = [
    thunk,
    saga,
    routerMiddleware(history)
]

if (process.env.NODE_ENV === 'development') {
    // const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

    // if (typeof devToolsExtension === 'function') {
    //     enhancers.push(devToolsExtension())
    // }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
)

const reducers = rootReducer(history);

const store = createStore(
    reducers,
    initialState,
    composedEnhancers
);

saga.run(rootSaga);

export type RootState = ReturnType<typeof reducers>;

export default store;