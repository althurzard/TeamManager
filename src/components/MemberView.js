import React, {Component} from 'react'
import {StyleSheet, Text, View, ListView, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Header,Button, CardSection, Row, Ionicons} from './common'
import {Actions} from 'react-native-router-flux'
import { fetchMembers, updateMembers } from '../actions'
import { DEFAULT_COLOR } from '../Constants';

export class MemberView extends Component {

	constructor(props) {
		super(props)
		
		const {project} = props
		
		if (project) {
			// Filter members that not in this project
			if (project._id) {
				this.props.fetchMembers(JSON.stringify({project_id_not_in: `${project._id}`}))
			} else {
				this.props.fetchMembers()
			}
		}
	}

	componentWillMount() {
		this.createDataSource(this.props)
	}
	

	componentWillReceiveProps(nextProps) {
		this.createDataSource(nextProps)
	}

	createDataSource = ({members}) => {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })
        this.dataSource = ds.cloneWithRows(members ? members : [])
	}

	getCheckedMembers = () => {
		const checkedMembers = this.props.members.filter((member) => {
			return member.checked
		})
		return checkedMembers
	}

	onPressCreate = () => {
		Actions.detailMember()
	}

	onPressBack = () => {
		Actions.pop()
	}

	onPressConfirm = () => {
		const members = []
		members.push.apply(members,this.getCheckedMembers())
		members.push.apply(members,this.props.project.members)
		Actions.pop({refresh: {members}})
	}

	onPressRow = (rowData) => {
		const {project} = this.props
		if (project) {
			this.onMemberChecked(rowData)
		} else {
			Actions.detailMember({member: rowData})
		}
		
	}

	onMemberChecked = (data) => {
        const newMembers = this.props.members.map((member) => {
            if (member._id === data._id) {
                return {
                    ...member,
                    checked: !data.checked
                }
            }
            return member
        })
        this.props.updateMembers(newMembers)
    }

	renderRow = (rowData) => {
		const {project} = this.props
		const leftItem = () => {
			if (project) {
				return <View style ={styles.row}>
							<Ionicons 
								name = {rowData.checked ? 'md-checkbox-outline' : 'md-square-outline'} 
								size = {25} 
								color = { DEFAULT_COLOR}/>
						</View>
			} else {
				return <View style ={styles.row}>
							<Text style = {styles.text}> {rowData.projects.length} </Text>
							<Ionicons 
								name = 'md-document' 
								size = {20} 
								color = {rowData.projects.length > 0 ? 'red' : DEFAULT_COLOR}/>
						</View>
			}
		}
		const body = () => {
			return <View style = {styles.row}>
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

		return(
			<TouchableOpacity onPress = {() => this.onPressRow(rowData)}>
				<Row 
					rowData = {rowData}
					customBody = {body}
					customLeftItem = {leftItem} 
				/>
			</TouchableOpacity>
		)
	}

	renderHeaderItem = (iconName, onPress) => {
		return <Button iconName = {iconName} onPress = {onPress}/>
	}

	renderHeader = () => {
		const {project} = this.props
		return <Header 
					title = 'MEMBERS MANAGEMENT'
					renderLeftItem = {project ? this.renderHeaderItem('ios-arrow-back', this.onPressBack) : null}
					renderRightItem = {project ? this.renderHeaderItem('ios-checkmark-circle',this.onPressConfirm) : this.renderHeaderItem('ios-person-add',this.onPressCreate)}
				/>
	}

	renderBody = () => {
		return (
			<View style={styles.bodyContainer}>
				<CardSection>
					<ListView
                        enableEmptySections
                        style = {styles.listView}
                        dataSource = {this.dataSource}
                        renderRow = {this.renderRow}
                        renderSeparator={() => <View style={styles.separator} />}
                    />
				</CardSection>
			</View>
		)
	}

	render() {
		return (
			<View style={styles.container}>
				{this.renderHeader()}
				{this.renderBody()}
			</View>
		)
	}
}
  
const mapStateToProps = (state) => {

	return {
		members: state.member.members
	}
}


MemberView.propTypes = {
	project: PropTypes.object,
	fetchMembers: PropTypes.func,
	updateMembers: PropTypes.func,
	members: PropTypes.array
  }


const styles = StyleSheet.create({
		container: {
				flex: 1,
				backgroundColor: 'white'
		},
		bodyContainer: {
				flex: 1,
		},
		separator: {
			flex: 1,
			height: StyleSheet.hairlineWidth,
			backgroundColor: '#8E8E8E',
		},
		listView: {
			width: '100%',
			height: '100%',
			backgroundColor: '#F5FCFF'
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
		}

});

export default connect(mapStateToProps,{ fetchMembers, updateMembers })(MemberView)