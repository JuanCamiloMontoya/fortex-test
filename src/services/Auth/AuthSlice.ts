import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { authThunks } from './AuthThunks'
import { authInitialState, AuthModulesTypes, AuthStateTypes } from './AuthInitialState'
import { StorageService } from '../../common/storage/storage-service'

const initialState = authInitialState()
const thunks = authThunks()
const { login } = thunks

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetStatus(state: AuthStateTypes, { payload }: PayloadAction<AuthModulesTypes>) {
      state.error[payload] = initialState.error[payload]
      state.status[payload] = initialState.status[payload]
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.rejected, (state, { payload }) => {
        state.status.login = 'error'
        state.error.login = payload?.error || ''
      })
      .addCase(login.pending, (state) => {
        state.status.login = 'loading'
        state.error.login = null
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        StorageService.setItem('token', payload.token)
        state.status.login = 'idle'
        state.token = payload.token
        state.user = payload.user
        state.isAuthenticated = true
      })
  }
})

const authActions = { ...authSlice.actions, ...thunks }
const authReducer = authSlice.reducer

export { authActions, authReducer }