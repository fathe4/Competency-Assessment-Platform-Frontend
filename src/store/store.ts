import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { baseApi, setTokenGetter } from "./baseApi";
import authReducer from "./slices/authSlice";
import assessmentReducer from "./slices/assessmentSlice";

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  assessment: assessmentReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Persist only auth state - assessment state is session-based
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          // Ignore RTK Query actions that might contain non-serializable data
          "api/executeMutation/pending",
          "api/executeMutation/fulfilled",
          "api/executeMutation/rejected",
          "api/executeQuery/pending",
          "api/executeQuery/fulfilled",
          "api/executeQuery/rejected",
        ],
        // Ignore RTK Query paths that might contain non-serializable data
        ignoredActionPaths: [
          "meta.arg",
          "payload.timestamp",
          "error.data",
          "meta.baseQueryMeta",
        ],
        ignoredPaths: [
          "api.mutations",
          "api.queries",
          "api.subscriptions",
          // Ignore any API error data that might contain ArrayBuffers
          "api.mutations.error.data",
          "api.queries.error.data",
          // Ignore specific mutation paths that are causing issues
          /^api\.mutations\..+\.error\.data$/,
          /^api\.queries\..+\.error\.data$/,
        ],
        // Add debug logging if needed
        warnAfter: 128,
        ignoredState: ["api"],
      },
    }).concat(baseApi.middleware), // Use only baseApi middleware
});

// Set the token getter function after store creation to avoid circular dependencies
setTokenGetter(() => store.getState().auth.accessToken);

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
