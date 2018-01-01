import React, { Component } from 'react'
import {StyleSheet, Text, View, TextInput,ListView, Alert} from 'react-native';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Actions} from "react-native-router-flux";
import { 
    Header, 
    Button,
    CardSection, 
    CardItem,
    Row
} from './common';
import { 
    fullNameChanged, 
    phoneNumberChanged,
    fetchProjects,
    updateProjects,
    createMember,
    resetStore,
    fetchMembers,
    updateMember,
    deleteMemberById
} from '../actions'
import {DEFAULT_COLOR} from '../Constants'

export class DetailMemberView extends Component {

    constructor(props) {
        super(props)
        const {member} = props
        if (member) {
            this.onFullNameChanged(member.name)
            this.onPhoneNumberChanged(member.phoneNumber)
        }
    }

    componentWillMount() {
        this.props.fetchProjects()
        this.createDataSource(this.props)
    }
    
    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps)
    }

    updateProjects = (projects) => {
            this.props.updateProjects(projects)
    }

    componentWillUnmount() {
        this.onFullNameChanged('')
        this.onPhoneNumberChanged('')
        this.props.fetchMembers()
    }

    createDataSource = ({projects}) => {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })

        this.dataSource = ds.cloneWithRows(projects ? projects : [])
    }

    getCheckedProjects = () => {
        const projects = this.props.projects.filter((project) => {
                return project.checked
        })
        return projects
    }
    

    onPressConfirm = () => {
        const {name,phoneNumber,createMember, updateMember} = this.props
        const projects = this.getCheckedProjects()
        const member = {
            name,
            phoneNumber,
            projects
        }
        if (this.props.member) {
            // old member
            member['_id'] = this.props.member._id
            updateMember(member)
        } else {
            // New member
            createMember(member)
        }
        
    }

    onPressBack = () => {
        Actions.pop();
    }

    onFullNameChanged = (text) => {
        this.props.fullNameChanged(text)
    }

    onPhoneNumberChanged = (text) => {
        this.props.phoneNumberChanged(text)
    }

    onProjectChecked = (data) => {
        const newProjects = this.props.projects.map((project) => {
            if (project._id === data._id) {
                return {
                    ...project,
                    checked: !data.checked
                }
            }
            return project
        })
        this.updateProjects(newProjects)
    }

    onPressDelete = () => {
        this.props.deleteMemberById(this.props.member._id)
    }


    onPressRow = (rowData) => {
        this.onProjectChecked(rowData)
    }

    renderRow = (rowData) => {
        return <Row
         rowData = {rowData} 
         iconName = {rowData.checked ? 'md-checkbox-outline' : 'md-square-outline'} 
         onPress = {this.onPressRow}/>
    }

    renderHeaderItem = (iconName, onPress) => {
		return (
			<Button iconName = {iconName} onPress = {onPress}  />
		)
    }
    
    renderRightHeaderItem = () => {
        return (
            <View style = {styles.rightHeaderItem}>
                {this.props.member && <Button iconName = {'ios-trash'} iconColor= {'red'} onPress = {this.onPressDelete}  />}
                <Button iconName = {'ios-checkmark-circle'} onPress = {this.onPressConfirm}  />
            </View>
		)
    }

    renderHeader = () => {

        return (
            <Header
                title = {this.props.member ? 'EDIT INFO' : 'CREATE MEMBER'}
                renderLeftItem = {this.renderHeaderItem('ios-arrow-back',this.onPressBack)}
                renderRightItem = {this.renderRightHeaderItem()}
             />
        )
    }

    renderBody = () => {
        const {name, phoneNumber} = this.props
        return (
            <CardSection customStyle={{justifyContent: 'flex-start',backgroundColor:'#F5FCFF'}}>
                <CardItem customStyle = {{flex:0.2}} title='FULL NAME' iconName='ios-contact' >
                    <View style = {{width: '100%', height: '100%'}}>
                    <TextInput
                        placeholder="Your name is..."
                        maxLength = {250}
                        value = {name}
                        style = {styles.textInput}
                        editable
                        onChangeText={this.onFullNameChanged}
                    />
                    </View>
                    
                </CardItem>
                <CardItem customStyle = {{flex:0.2}} title='PHONE NUMBER' iconName='logo-whatsapp'>
                    <TextInput
                        placeholder="Your phone number is..."
                        maxLength = {250}
                        value = {phoneNumber}
                        style = {styles.textInput}
                        editable
                        onChangeText={this.onPhoneNumberChanged}
                    />
                </CardItem>
                <CardItem customStyle = {{flex:0.7}} title='PARTICIPATING IN PROJECTS' iconName='md-document'>
                    <View style = {{flex: 0.1}}>
                        <Text style = {styles.textInput}>List of available projects</Text>
                    </View>
                    <CardSection>
                        <ListView
                            enableEmptySections
                            style = {styles.listView}
                            dataSource = {this.dataSource}
                            renderRow = {this.renderRow}
                            renderSeparator={() => <View style={styles.separator} />}
                        />
                    </CardSection>
                </CardItem>
            </CardSection>
        )
    }

    createAlert = (title,msg,onPress) => {
        Alert.alert(
            title,
            msg,
            [
              {text: 'OK', onPress: onPress},
            ],
            { cancelable: false }
          )
    }

    renderAlert = () => {
        const {status} = this.props
        if (status) {
            if (status.success) {
                this.createAlert('Congratulations',status.text,()=>{})
            } else {
                if (status.isDeleted) {
                    this.createAlert('Congratulations',status.text,this.onPressBack)
                } else {
                    this.createAlert('ERROR',status.text,()=>{})
                } 
            }
        }
        return null 
    }

    render() {
     return (
         <View style = {styles.container}>
            {this.renderHeader()}
            {this.renderBody()}
            {this.renderAlert()}
        </View>
        )
    }
}

const mapStateToProps = (state,props) => {
  const {data} = state.project
  const {member} = props
  if (data && !data.isUpdated && member) {
      // check the first time fetch projects data
      var projects =  data.projects.map((v) => {
                    for (let i = 0; i < member.projects.length; i++) {
                        if (member.projects[i]._id === v._id) {
                            // Member took part in this project
                            return {
                                ...v,
                                checked: true
                            }
                        }
                    }
                    return v
                })
  } else if (data) {
      var {projects} = data
  }

  return {
      ...state.member,

      projects
  }
}

DetailMemberView.propTypes = {
    name: PropTypes.string,
    phoneNumber: PropTypes.string,
    member: PropTypes.object,
    projects: PropTypes.array,
    status: PropTypes.object,
    fullNameChanged: PropTypes.func,
    phoneNumberChanged:PropTypes.func,
    fetchProjects: PropTypes.func,
    updateProjects: PropTypes.func,
    createMember: PropTypes.func,
    resetStore: PropTypes.func,
    fetchMembers: PropTypes.func,
    updateMember: PropTypes.func,
    deleteMemberById: PropTypes.func
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white'
    },
    listView: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F5FCFF'
    },
    rightHeaderItem: {
        flex:1,
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        flexDirection: 'row'
    },
    textInput: {
        flex:1,
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 14,
        color: 'black',
        width: '100%'
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
})


export default connect(mapStateToProps,{ 
    fullNameChanged,
    phoneNumberChanged, 
    fetchProjects, 
    updateProjects,
    createMember,
    resetStore,
    fetchMembers,
    updateMember,
    deleteMemberById })(DetailMemberView)
