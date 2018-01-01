import { 
    FULLNAME_CHANGED,
    PHONENUMBER_CHANGED,
    CREATE_MEMBER,
    RESET_STORE,
    FETCH_MEMBERS,
    DELETE_MEMBER,
    UPDATE_MEMBERS
} from '../actions/type'

const INITIAL_STATE = {
    name: '',
    phoneNumber: '',
    members: []
}

export default (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case FULLNAME_CHANGED:
            delete state.status
            return {
                ...state,
                name: action.payload,
            }
        case PHONENUMBER_CHANGED:
            delete state.status
            return {
                ...state,
                phoneNumber: action.payload,
            }
        case FETCH_MEMBERS:
        case UPDATE_MEMBERS:
            return {
                ...state,
                members: action.payload
            }
        case CREATE_MEMBER:
        case DELETE_MEMBER: 
            return {
                ...state,
                status: action.payload
            }
        case RESET_STORE:
            state = INITIAL_STATE
        default:
            return state
    }
}