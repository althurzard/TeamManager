import React, { Component } from 'react'
import { Text, View, StyleSheet,Platform } from 'react-native'

export const CardSection = (props) => {
    const {children, customStyle} = props
    return (
        <View style = {StyleSheet.flatten([styles.container,customStyle])}>
          {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    flex:1,
    marginTop: 10,
    marginLeft:10,
    marginRight:10,
      borderWidth: 1,
      backgroundColor: 'white',
      borderColor: 'rgba(0,0,0,0.1)',
      borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    ... Platform.select({
      ios: {
        shadowColor: '#ccc',
        shadowOffset: {width:2,height:2,},
        shadowRadius:3,
        shadowOpacity: 0.5,
      },
      android: {
        elevation:2,
      }
    })
    } 
})
