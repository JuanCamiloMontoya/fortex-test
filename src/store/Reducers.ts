import { combineReducers } from "@reduxjs/toolkit"
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { authReducer } from "../services/Auth/AuthSlice"
import type { PayloadAction } from '@reduxjs/toolkit'
import { groupsReducer } from "../services/Groups/GroupsSlice"
import { StorageService } from "../common/storage/storage-service"

const reducers = combineReducers({
  auth: authReducer,
  groups: groupsReducer
})

const rootReducer = (state: any, action: PayloadAction) => {
  if (action.type === 'auth/logout') {
    StorageService.removeItem('token')
    state = undefined
  }
  return reducers(state, action)
}

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['auth/token']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export type RootState = ReturnType<typeof rootReducer>
export default persistedReducer