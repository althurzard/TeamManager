import { 
    FETCH_PROJECTS,
    UPDATE_PROJECTS,
    PROJECTNAME_CHANGED,
    UPDATE_PROJECT,
    CREATE_PROJECT,
    DELETE_PROJECT
} from '../actions/type'

const INITIAL_STATE = {
    name: '',
    data: {
        projects: []
    },
    members: []

}
export default (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case PROJECTNAME_CHANGED:
            delete state.status
            return {
                ...state,
                name: action.payload
            }
        case FETCH_PROJECTS:
            return {
                ...state,
                data: { projects:action.payload, isUpdated: false}
            }
        case UPDATE_PROJECT:
        case DELETE_PROJECT:
        case CREATE_PROJECT:
            return {
                ...state,
                status: action.payload
            }
        case UPDATE_PROJECTS:
            return {
                ...state,
                data: { projects:action.payload, isUpdated: true}
            }
        default:
            return state
    }
}