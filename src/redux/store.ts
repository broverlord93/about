import { configureStore } from '@reduxjs/toolkit'

// Create a simple root reducer since you don't have any slices yet
const rootReducer = {
  // Add your slices here when you create them
  // For now, we'll use a placeholder to prevent the empty reducer error
  _placeholder: (state = {}) => state,
}

export const store = configureStore({
  reducer: rootReducer
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch