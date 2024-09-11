import { configureStore} from "@reduxjs/toolkit";

import assets from './ducks/assets.slice';

const reducer = {assets};

export const store = configureStore({reducer});

export type RootState = ReturnType<typeof store.getState>;