import { createAsyncThunk } from "@reduxjs/toolkit"
import Api from "../../common/api/Api"
import { ErrorResponse } from "../../common/interfaces/CommonInterfaces"
import { Group } from "./GroupsInitialState"

export const groupsThunks = () => {

  interface GetGroupsResponse {
    groups: Group[]
  }

  const getGroups = createAsyncThunk
    <GetGroupsResponse, undefined, { rejectValue: ErrorResponse }>(
      'groups/get',
      async (_, { rejectWithValue }) => {
        try {
          return await Api.get('/group') as GetGroupsResponse
        } catch (error: any) {
          return rejectWithValue({ error: error.toString() })
        }
      }
    )

  interface CreateGroupAttributes {
    data: {
      name: string,
      description: string
    },
    onSuccess: () => void
  }

  interface CreateGroupResponse {
    message: string
  }

  const createGroup = createAsyncThunk
    <CreateGroupResponse, CreateGroupAttributes, { rejectValue: ErrorResponse }>(
      'groups/create',
      async ({ data, onSuccess }, { rejectWithValue, dispatch }) => {
        try {
          const response = await Api.post('/group/create', data)
          dispatch(getGroups())
          onSuccess()
          return response as CreateGroupResponse
        } catch (error: any) {
          return rejectWithValue({ error: error.toString() })
        }
      }
    )

  interface UpdateGroupAttributes {
    data: {
      id: string
      name: string,
      description: string
    },
    onSuccess: () => void
  }

  interface UpdateGroupResponse {
    name: string,
    description: string
  }

  const updateGroup = createAsyncThunk
    <UpdateGroupResponse, UpdateGroupAttributes, { rejectValue: ErrorResponse }>(
      'groups/update',
      async ({ data, onSuccess }, { rejectWithValue, dispatch }) => {
        try {
          const { id, ...endData } = data
          await Api.patch(`/group/update?id=${id}`, endData, true)
          dispatch(getGroups())
          onSuccess()
          return endData as UpdateGroupResponse
        } catch (error: any) {
          return rejectWithValue({ error: error.toString() })
        }
      }
    )


  interface UpdateGroupMembersAttributes {
    data: {
      groupId: string
      oldValues: string[],
      newValues: string[]
    },
    onSuccess: () => void
  }
  interface UpdateGroupMembersResponse {
    name: string,
    message: string,
    groupId: string,
    newValues: string[]
  }
  const updateGroupMembers = createAsyncThunk
    <UpdateGroupMembersResponse, UpdateGroupMembersAttributes, { rejectValue: ErrorResponse }>(
      'groups/update-members',
      async ({ data, onSuccess }, { rejectWithValue, dispatch }) => {
        try {
          const response = await Api.post(`/group/manage-members`, data) as UpdateGroupMembersResponse
          dispatch(getGroups())
          onSuccess()
          const { groupId, newValues } = data
          return { ...response, groupId, newValues }
        } catch (error: any) {
          return rejectWithValue({ error: error.toString() })
        }
      }
    )


  const updateGroupRoles = createAsyncThunk
    <UpdateGroupResponse, UpdateGroupAttributes, { rejectValue: ErrorResponse }>(
      'groups/update-roles',
      async ({ data, onSuccess }, { rejectWithValue, dispatch }) => {
        try {
          const { id, ...endData } = data
          await Api.patch(`/group/update?id=${id}`, endData, true)
          dispatch(getGroups())
          onSuccess()
          return endData as UpdateGroupResponse
        } catch (error: any) {
          return rejectWithValue({ error: error.toString() })
        }
      }
    )

  interface DeleteGroupAttributes {
    id: string,
    onSuccess: () => void
  }

  interface DeleteGroupResponse {
    message: string
  }

  const deleteGroup = createAsyncThunk
    <DeleteGroupResponse, DeleteGroupAttributes, { rejectValue: ErrorResponse }>(
      'groups/delete',
      async ({ id, onSuccess }, { rejectWithValue, dispatch }) => {
        try {
          const response = await Api.delete(`/group/delete?id=${id}`)
          console.log("RESPONSE", response)
          dispatch(getGroups())
          onSuccess()
          return response as DeleteGroupResponse
        } catch (error: any) {
          return rejectWithValue({ error: error.toString() })
        }
      }
    )

  return {
    getGroups,
    createGroup,
    updateGroup,
    deleteGroup,
    updateGroupMembers
  }
}