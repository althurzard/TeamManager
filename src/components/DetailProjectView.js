import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { StyleSheet, View, Alert, ListView, TextInput, Text } from 'react-native';
import {Actions} from 'react-native-router-flux'
import { Button, Ionicons, CardItem,CardSection,Header,Row } from './common';
import { DEFAULT_COLOR } from '../Constants';
import { 
    projectNameChanged, 
    fetchProjects,
    createProject,
    updateProject,
    deleteProjectById
 } from '../actions'
import { DetailMemberView } from './DetailMemberView';

export class DetailProjectView extends Component {


    constructor(props) {
        super(props)
        const {project} = props
        if (project) {
            this.onNameChanged(project.name)
        }
    }

    componentWillMount() {
        this.createDataSource(this.props)
    }
    
    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps)
    }

    componentWillUnmount() {
        this.onNameChanged('')
        this.props.fetchProjects()
    }

    createDataSource = ({members}) => {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })

        this.dataSource = ds.cloneWithRows(members ? members : [])
    }

    removeMembers = (removedMember) => {
        const members = this.props.members.filter((member) => {
            return !(member._id === removedMember._id)
        })
        return members
    }

    onPressBack = () => {
        Actions.pop()
    }

    onPressRow = (rowData) => {
        const members = this.removeMembers(rowData)
        Actions.refresh({members})
    }

    onPressConfirm = () => {

        const {name,members,updateProject,createProject} = this.props
        const project = {
            name,
            members
        }
        
        if (this.props.project) {
            // old member
            project['_id'] = this.props.project._id
            updateProject(project)
        } else {
            // New member
            createProject(project)
        }
    }

    onPressDelete = () => {
        this.props.deleteProjectById(this.props.project._id)
    }

    onPressAddMember = () => {
        const {project} = this.props
        if (project) {
            Actions.members({project})
        } else {
            Actions.members({project:{}})
        }
        
    }

    onNameChanged = (text) => {
        this.props.projectNameChanged(text)
    }

    renderRow = (rowData) => {
        return <Row
         rowData = {rowData}
         iconColor = {'red'}
         iconSize = {25} 
         iconName = {'md-close-circle'} 
         onPress = {this.onPressRow}
         customBody = {() =>
						<View style = {styles.row}>
							<View style = {styles.rowBody}>
								<Ionicons name = 'ios-contact' size = {20} color = {DEFAULT_COLOR}/>
								<Text style = {styles.text}> {rowData.name} </Text>
							</View>
							<View style = {styles.rowBody}>
								<Ionicons name = 'logo-whatsapp' size = {20} color = {DEFAULT_COLOR}/>
								<Text style = {styles.text}> {rowData.phoneNumber} </Text>
							</View>
						</View>
					}
         />
    }

    renderHeaderItem = (iconName, onPress) => {
		return (
			<Button iconName = {iconName} onPress = {onPress}  />
		)
    }
    
    renderRightHeaderItem = () => {
        return (
            <View style = {styles.rightHeaderItem}>
                {this.props.project && <Button iconName = {'ios-trash'} iconColor= {'red'} onPress = {this.onPressDelete}  />}
                <Button iconName = {'ios-checkmark-circle'} onPress = {this.onPressConfirm}  />
            </View>
		)
    }

    renderHeader = () => {
        return (
            <Header
                title = {this.props.project ? 'EDIT INFO' : 'CREATE PROJECT'}
                renderLeftItem = {this.renderHeaderItem('ios-arrow-back',this.onPressBack)}
                renderRightItem = {this.renderRightHeaderItem()}
             />
        )
    }

    renderBody = () => {
        const {name} = this.props
        return (
            <CardSection customStyle={{justifyContent: 'flex-start',backgroundColor:'#F5FCFF'}}>
                <CardItem customStyle = {{flex:0.2}} title='PROJECT NAME' iconName='ios-create' >
                    <TextInput
                        placeholder="Describe your project..."
                        maxLength = {250}
                        value = {name}
                        style = {styles.textInput}
                        editable
                        onChangeText={this.onNameChanged}
                    />
                </CardItem>
                <CardItem customStyle = {{flex:0.80}} title='LIST MEMBERS' iconName='ios-people'>
                    <View style = {StyleSheet.flatten([styles.centerContainer,{flex:0.15}])}>
                        <Button 
                            iconName = 'md-person-add'
                            iconColor = 'white' 
                            onPress = {this.onPressAddMember} 
                            customContainerStyle = {styles.assignButton} >
                            <Text style = {styles.assignText}>Assign member</Text>
                        </Button>   
                    </View>
                    <View style = {StyleSheet.flatten([styles.centerContainer,{flex:0.1}])}>
                        <Text style = {styles.textInput}>{`Total: ${this.props.members ? this.props.members.length : 0}`}</Text>
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

const mapStateToProps = (state) => {
    return {
        name: state.project.name,
        status: state.project.status,
    }
}

DetailProjectView.propTypes = {
    name: PropTypes.string,
    members: PropTypes.array,
    project: PropTypes.object,
    projectNameChanged: PropTypes.func,
    fetchProjects: PropTypes.func,
    createProject: PropTypes.func,
    updateProject: PropTypes.func,
    deleteProjectById: PropTypes.func,
    status: PropTypes.object
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
    assignButton: {
        width: '95%',
        marginVertical: 5,
        backgroundColor: DEFAULT_COLOR,
        borderRadius: 10,
    },
    text: {
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 14,
        color: 'black',
      },
    row: {
        flex:1,
        flexDirection: 'column',
        justifyContent:'space-around'
    },
    rowBody: {
        flex:1,
        marginLeft: 10,
        marginVertical: 3,
        flexDirection: 'row'
    },
    centerContainer: {
        flexDirection : 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    assignText: {
        marginLeft: 10,
        fontFamily: 'OpenSans-Bold',
        fontSize: 14,
        color: 'white',
    }
})


export default connect(mapStateToProps,{
    projectNameChanged,
    fetchProjects,
    updateProject,
    createProject,
    deleteProjectById
})(DetailProjectView)
