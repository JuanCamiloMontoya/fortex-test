import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import { useDispatch } from 'react-redux'
import logger from 'redux-logger'
import persistedReducer from './Reducers'

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    }).concat(logger)
  )
})

const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export { store, persistor }
