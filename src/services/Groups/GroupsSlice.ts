import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { groupsThunks } from './GroupsThunks'
import {
  Group,
  groupsInitialState,
  GroupsModulesTypes,
  GroupsStateTypes
} from './GroupsInitialState'

const initialState = groupsInitialState()
const thunks = groupsThunks()
const { getGroups, createGroup, updateGroup, deleteGroup, updateGroupMembers } = thunks

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    resetStatus(state: GroupsStateTypes, { payload }: PayloadAction<GroupsModulesTypes>) {
      state.error[payload] = initialState.error[payload]
      state.status[payload] = initialState.status[payload]
    },
    setGroup(state: GroupsStateTypes, { payload }: PayloadAction<Group>) {
      state.group = payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGroups.pending, (state) => {
        state.status.getGroups = 'loading'
        state.error.getGroups = null
      })
      .addCase(getGroups.fulfilled, (state, { payload }) => {
        state.status.getGroups = 'idle'
        state.groups = payload.groups
      })
      .addCase(getGroups.rejected, (state, { payload }) => {
        state.status.getGroups = 'error'
        state.error.getGroups = payload?.error || ''
      })
      .addCase(createGroup.pending, (state) => {
        state.status.createGroup = 'loading'
        state.error.createGroup = null
      })
      .addCase(createGroup.fulfilled, (state) => {
        state.status.createGroup = 'idle'
      })
      .addCase(createGroup.rejected, (state, { payload }) => {
        state.status.createGroup = 'error'
        state.error.createGroup = payload?.error || ''
      })
      .addCase(updateGroup.pending, (state) => {
        state.status.updateGroup = 'loading'
        state.error.updateGroup = null
      })
      .addCase(updateGroup.fulfilled, (state, { payload }) => {
        state.status.updateGroup = 'idle'
        if (state.group)
          state.group = { ...state.group, ...payload }
      })
      .addCase(updateGroup.rejected, (state, { payload }) => {
        state.status.updateGroup = 'error'
        state.error.updateGroup = payload?.error || ''
      })
      .addCase(deleteGroup.pending, (state) => {
        state.status.deleteGroup = 'loading'
        state.error.deleteGroup = null
      })
      .addCase(deleteGroup.fulfilled, (state, { payload }) => {
        state.status.deleteGroup = 'idle'
      })
      .addCase(deleteGroup.rejected, (state, { payload }) => {
        state.status.deleteGroup = 'error'
        state.error.deleteGroup = payload?.error || ''
      })
      .addCase(updateGroupMembers.pending, (state) => {
        state.status.updateGroupMembers = 'loading'
        state.error.updateGroupMembers = null
      })
      .addCase(updateGroupMembers.fulfilled, (state, { payload }) => {
        state.status.updateGroupMembers = 'idle'
      })
      .addCase(updateGroupMembers.rejected, (state, { payload }) => {
        state.status.updateGroupMembers = 'error'
        state.error.updateGroupMembers = payload?.error || ''
      })
  }
})

const groupsActions = { ...groupsSlice.actions, ...thunks }
const groupsReducer = groupsSlice.reducer

export { groupsActions, groupsReducer }