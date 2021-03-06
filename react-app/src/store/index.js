import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import listingReducer from './listing';
import agentReducer from './agent';
import reviewReducer from './review';
import currListingReducer from './currListing';
import currReviewReducer from './currReview';


const rootReducer = combineReducers({
  session,
  listings: listingReducer,
  agents: agentReducer,
  reviews: reviewReducer,
  curr_listing: currListingReducer,
  curr_review: currReviewReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
