import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from '../redux/Cart/cartSlice';
import productReducer from '../redux/Products/productSlice';
import linkRootReducer from '../redux/Link/sliceLink';
// import searchHomeReducer from '../redux/HomeData/homeDataSlice';
import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";


const rootReducer = combineReducers({
	cartReducer,
	productReducer,
	linkRootReducer,
	// searchHomeReducer,

})

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['cartReducer']

}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;