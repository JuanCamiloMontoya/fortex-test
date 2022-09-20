import { StatusTypes } from "../../common/types/CommonTypes"

export type GroupsModulesTypes = 'getGroups' | 'createGroup' | 'updateGroup'

export interface Role {
  id: string,
  name: string,
  active: boolean
}

export interface People extends Role { }

export interface Group {
  id: string,
  name: string,
  description: string,
  type: boolean,
  members: number,
  roles: Role[],
  people: People[]
}

export interface GroupsStateTypes {
  groups: Group[],
  group: Group | undefined | null,
  error: {
    getGroups: string | null,
    createGroup: string | null,
    updateGroup: string | null,
    deleteGroup: string | null,
    updateGroupMembers: string | null
  },
  status: {
    getGroups: StatusTypes,
    createGroup: StatusTypes,
    updateGroup: StatusTypes,
    deleteGroup: StatusTypes,
    updateGroupMembers: StatusTypes
  }
}

export const groupsInitialState = (): GroupsStateTypes => ({
  groups: [],
  group: null,
  error: {
    getGroups: null,
    createGroup: null,
    updateGroup: null,
    deleteGroup: null,
    updateGroupMembers: null,
  },
  status: {
    getGroups: 'idle',
    createGroup: 'idle',
    updateGroup: 'idle',
    deleteGroup: 'idle',
    updateGroupMembers: 'idle'
  }
})