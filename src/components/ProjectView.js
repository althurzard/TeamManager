import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux' 
import {
  fetchProjects
} from '../actions'
import {DEFAULT_COLOR} from '../Constants'
import { CardSection,Button,Header, Ionicons, Row } from './common';

export class ProjectView extends Component {

  componentWillMount() {
		this.createDataSource(this.props)
	}
	

	componentWillReceiveProps(nextProps) {
		this.createDataSource(nextProps)
	}

	createDataSource = ({projects}) => {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })
        this.dataSource = ds.cloneWithRows(projects ? projects : [])
	}

	onPressCreate = () => {
    Actions.detailProject()
	}

	onPressRow = (rowData) => {
		Actions.detailProject({project: rowData, members: rowData.members})
	}
	
	renderRow = (rowData) => {
		return(
			<TouchableOpacity onPress = {() => this.onPressRow(rowData)}>
				<Row 
					rowData = {rowData}
					customLeftItem = {() => 
						<View style ={styles.row}>
							<Text style = {styles.text}> {rowData.members.length} </Text>
							<Ionicons name = 'md-people' size = {20} color = {rowData.members.length > 0 ? 'red' : DEFAULT_COLOR}/>
						</View>
					} 
				/>
			</TouchableOpacity>
		)
	}

  renderHeaderItem = (iconName, onPress) => {
		return <Button iconName = {iconName} onPress = {onPress}/>
	}

	renderHeader = () => {
		return <Header 
					title = 'PROJECTS LIST'
					renderRightItem = {this.renderHeaderItem('md-add',this.onPressCreate)}
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
	  <View style = {styles.container}>
      {this.renderHeader()}
      {this.renderBody()}
	  </View>
	)
  }
}

const mapStateToProps = (state) => {
  const {data} = state.project
  return {
		projects: data ? data.projects : []
	}
}


ProjectView.propTypes = {
  projects: PropTypes.array,
  fetchProjects: PropTypes.func,
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
})

export default connect(mapStateToProps,{ fetchProjects })(ProjectView)