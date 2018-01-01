import { combineReducers } from 'redux'
import MemberReducer from './MemberReducer'
import ProjectReducer from './ProjectReducer'

export default combineReducers({
    member: MemberReducer,
    project: ProjectReducer
})
