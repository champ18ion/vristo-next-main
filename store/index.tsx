import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from '@/store/themeConfigSlice';
import leadsReducer from './leadsSlice';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    leads: leadsReducer,
});

export default configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;

