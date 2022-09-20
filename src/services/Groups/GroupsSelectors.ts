import { useSelector } from "react-redux"
import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "../../store/Reducers"

export const useGroupsSelectors = () => {

  const status = useSelector(createSelector(
    (state: RootState) => state.groups.status,
    status => status
  ))

  const error = useSelector(createSelector(
    (state: RootState) => state.groups.error,
    error => error
  ))

  const groups = useSelector(createSelector(
    (state: RootState) => state.groups.groups,
    groups => groups
  ))

  const group = useSelector(createSelector(
    (state: RootState) => state.groups.group,
    group => group
  ))

  return {
    status,
    error,
    groups,
    group
  }
}