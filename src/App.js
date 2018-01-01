/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import Router from './Router'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import Reducers from './reducers'
import ReduxThunk from 'redux-thunk'
export default class App extends Component {
  
  render() {
    const store = createStore(Reducers,{},applyMiddleware(ReduxThunk))
    return (
      <Provider store = {store}>
        <View style = {styles.container}>
          <Router/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
