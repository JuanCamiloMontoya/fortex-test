import { StatusTypes } from "../../common/types/CommonTypes"

export type AuthModulesTypes = 'login'

export interface AuthStateTypes {
  isAuthenticated: boolean,
  token: string | null,
  user: {
    email: string | null,
    id: string | null,
    name: string | null
  },
  error: {
    login: string | null
  },
  status: {
    login: StatusTypes
  }
}

export const authInitialState = (): AuthStateTypes => ({
  isAuthenticated: false,
  token: null,
  user: {
    email: null,
    id: null,
    name: null
  },
  error: {
    login: null
  },
  status: {
    login: 'idle'
  }
})