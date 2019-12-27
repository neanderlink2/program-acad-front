
import { createStore, applyMiddleware, compose } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { rootReducer } from '../modules'

export const history = createBrowserHistory()

const initialState = {}
const enhancers: any[] = []
const middleware = [
    thunk,
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

export type RootState = ReturnType<typeof reducers>;

export default store;