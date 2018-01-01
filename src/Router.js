import React, { Component } from 'react'
import {Scene,Router} from 'react-native-router-flux'

import TabbarView from './components/TabbarView'
import MemberView from './components/MemberView'
import DetailMemberView from './components/DetailMemberView'
import DetailProjectView from './components/DetailProjectView'
export class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <Scene hideNavBar>
            <Scene key='main' component={TabbarView} initial />
            <Scene key='detailMember' component={DetailMemberView} />
            <Scene key='detailProject' component={DetailProjectView} />
            <Scene key='members' component ={MemberView} />
        </Scene>
      </Router>
    )
  }
}

export default RouterComponent