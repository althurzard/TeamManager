import { 
    FULLNAME_CHANGED,
    PHONENUMBER_CHANGED,
    FETCH_PROJECTS, 
    UPDATE_PROJECTS,
    CREATE_MEMBER,
    RESET_STORE,
    FETCH_MEMBERS,
    DELETE_MEMBER,
    PROJECTNAME_CHANGED,
    CREATE_PROJECT,
    DELETE_PROJECT,
    UPDATE_PROJECT,
    UPDATE_MEMBERS
} from "./type";
import { DOMAIN_NAME, ERROR_POST } from '../Constants';
import axios from 'axios'

export const fullNameChanged = (text) => {
    return {
        type: FULLNAME_CHANGED,
        payload: text
    }
}

export const phoneNumberChanged = (text) => {
    return {
        type: PHONENUMBER_CHANGED,
        payload: text
    }
}

export const projectNameChanged = (text) => {
    return {
        type: PROJECTNAME_CHANGED,
        payload: text
    }
}

export const updateProjects = (projects) => {
    return {
        type: UPDATE_PROJECTS,
        payload: projects
    }
}

export const updateMembers = (members) => {
    return {
        type:UPDATE_MEMBERS,
        payload: members
    }
}

export const fetchProjects = (query = 'default') => {
    
    return (dispatch) => {
        axios.get(`${DOMAIN_NAME}/get/projects.json/${query}`)
        .then((respone) =>{
            dispatchHandler(dispatch,FETCH_PROJECTS,respone.data.projects)
        })
        .catch((err) => {
            dispatchHandler(dispatch,FETCH_PROJECTS,[])
        })
    }
}


export const updateProject = (project) => {
    return (dispatch) => {
        axios.post(DOMAIN_NAME + '/update-project/',project)
        .then((respone) => {
            if (respone.status != ERROR_POST) {
                dispatchHandler(dispatch,UPDATE_PROJECT,{success: true, text: 'Project has been updated successfully', project: respone.data.project })
            } else {
                dispatchHandler(dispatch,UPDATE_PROJECT,{success: false, text: respone.statusText})
            }
        })
        .catch((err) => {
            dispatchHandler(dispatch,UPDATE_PROJECT,{success: false, text: 'Failed to update!'})
        })
    }
}

export const createProject = (project) => {
    return (dispatch) => {
        axios.post(DOMAIN_NAME + '/create-project/',project)
        .then((respone) => {
            if (respone.status != ERROR_POST) {
                dispatchHandler(dispatch,CREATE_PROJECT,{success: true, text: 'Project has been created successfully', project: respone.data.project })
            } else {
                dispatchHandler(dispatch,CREATE_PROJECT,{success: false, text: respone.statusText})
            }
        })
        .catch((err) => {
            dispatchHandler(dispatch,CREATE_PROJECT,{success: false, text: 'Project name has existed!'})
        })
    }
}

export const deleteProjectById = (projectId) => {
    return (dispatch) => {
        axios.post(DOMAIN_NAME + '/remove-project/',{'_id':projectId})
        .then((respone) => {
            if (respone.status != ERROR_POST) {
                dispatchHandler(dispatch,DELETE_PROJECT,{isDeleted: true, text: 'Project has been deleted successfully' })
            } else {
                dispatchHandler(dispatch,DELETE_PROJECT,{isDeleted: false, text: respone.statusText})
            }
        })
        .catch((err) => {
            dispatchHandler(dispatch,DELETE_PROJECT,{isDeleted: false, text: 'Failed to delete!'})
        })
    }
}

export const fetchMembers = (query = 'default') => {
    return (dispatch) => {
        axios.get(`${DOMAIN_NAME}/get/members.json/${query}`)
        .then((respone) =>{
            dispatchHandler(dispatch,FETCH_MEMBERS,respone.data.members)
        })
        .catch((err) => {
            dispatchHandler(dispatch,FETCH_MEMBERS,[])
        })
    }
}

export const createMember = (member) => {
    return (dispatch) => {
        axios.post(DOMAIN_NAME + '/create-member/',member)
        .then((respone) => {
            if (respone.status != ERROR_POST) {
                dispatchHandler(dispatch,CREATE_MEMBER,{success: true, text: 'User has been created successfully', member: respone.data.member })
            } else {
                dispatchHandler(dispatch,CREATE_MEMBER,{success: false, text: respone.statusText})
            }
        })
        .catch((err) => {
            dispatchHandler(dispatch,CREATE_MEMBER,{success: false, text: 'Phone number has existed!'})
        })
    }
}

export const updateMember = (member) => {
    return (dispatch) => {
        axios.post(DOMAIN_NAME + '/update-member/',member)
        .then((respone) => {
            if (respone.status != ERROR_POST) {
                dispatchHandler(dispatch,CREATE_MEMBER,{success: true, text: 'User has been updated successfully', member: respone.data.member })
            } else {
                dispatchHandler(dispatch,CREATE_MEMBER,{success: false, text: respone.statusText})
            }
        })
        .catch((err) => {
            dispatchHandler(dispatch,CREATE_MEMBER,{success: false, text: 'Failed to update!'})
        })
    }
}


export const deleteMemberById = (memberId) => {
    return (dispatch) => {
        axios.post(DOMAIN_NAME + '/remove-member/',{'_id':memberId})
        .then((respone) => {
            if (respone.status != ERROR_POST) {
                dispatchHandler(dispatch,DELETE_MEMBER,{isDeleted: true, text: 'User has been deleted successfully' })
            } else {
                dispatchHandler(dispatch,DELETE_MEMBER,{isDeleted: false, text: respone.statusText})
            }
        })
        .catch((err) => {
            dispatchHandler(dispatch,DELETE_MEMBER,{isDeleted: false, text: 'Failed to delete!'})
        })
    }
}

export const resetStore = () => {
    return {
        type: RESET_STORE
    }
}

const dispatchHandler = (dispatch,type,payload) => {
    dispatch({
        type,
        payload
    })
}


