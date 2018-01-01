import React,{ Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import PropTypes from 'prop-types'
import TabNavigator from 'react-native-tab-navigator'
import MemberView from './MemberView'
import ProjectView from './ProjectView'
import {Ionicons} from './common'
import { DEFAULT_COLOR } from '../Constants'
import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux'
import { fetchMembers,fetchProjects } from '../actions'

const TabInfo = {
  Members: 'Members',
  Projects: 'Projects'
}

export class TabbarView extends Component {


  constructor(props) {
    super(props)
    
    this.state = {
     selectedTab: TabInfo.Members
    }
    this.props.fetchMembers()
    this.props.fetchProjects()
  }

  onChangeTab = (selectedTab) => {
    if (selectedTab === TabInfo.Members) {
      this.props.fetchMembers()
    } else {
      this.props.fetchProjects()
    }
    this.setState({ selectedTab })
  }

  render() {
	return (
    <TabNavigator tabBarStyle = {styles.container}>
      <TabNavigator.Item
        selected={this.state.selectedTab === TabInfo.Members}
        title={TabInfo.Members}
        renderIcon={() => <Ionicons name='ios-people'/>}
        renderSelectedIcon={() => <Ionicons name='ios-people' color = {DEFAULT_COLOR}/>}
        badgeText = {`${this.props.members.length}`}
        onPress={() => this.onChangeTab(TabInfo.Members)}>
        <MemberView/>
      </TabNavigator.Item>
      <TabNavigator.Item
        selected={this.state.selectedTab === TabInfo.Projects}
        title={TabInfo.Projects}
        renderIcon={() => <Ionicons name= 'md-document' />}
        renderSelectedIcon={() => <Ionicons name ='md-document' color = {DEFAULT_COLOR} />}
        badgeText = {`${this.props.projects.length}`}
        onPress={() => this.onChangeTab(TabInfo.Projects)}>
        <ProjectView/>
      </TabNavigator.Item>
		</TabNavigator>
	)
  }
}

const mapStateToProps = (state) => {
  const {data} = state.project

	return {
    members: state.member.members,
    projects: data ? data.projects : []
	}
}

TabbarView.propTypes = {
  selectedTab: PropTypes.string,
  members: PropTypes.array,
  projects: PropTypes.array,
  fetchMembers: PropTypes.func,
  fetchProjects: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  }
})

export default connect(mapStateToProps,{ fetchMembers,fetchProjects })(TabbarView)