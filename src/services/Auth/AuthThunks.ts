import { createAsyncThunk } from "@reduxjs/toolkit"
import Api from "../../common/api/Api"
import { ErrorResponse } from "../../common/interfaces/CommonInterfaces"

export const authThunks = () => {

  interface LoginAttributes {
    email: string,
    password: string
  }

  interface LoginResponse {
    token: string,
    user: {
      email: string,
      id: string,
      name: string
    }
  }

  const login = createAsyncThunk
    <LoginResponse, LoginAttributes, { rejectValue: ErrorResponse }>(
      'auth/login',
      async (payload, { rejectWithValue }) => {
        try {
          return await Api.post('/login', payload, true) as LoginResponse
        } catch (error: any) {
          return rejectWithValue({ error: error.toString() })
        }
      }
    )

  return {
    login
  }
}