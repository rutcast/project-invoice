import {deepFreeze} from '../../util'

export const freeze = store => next => action => {
  deepFreeze(store.getState())
  return next(action)
}