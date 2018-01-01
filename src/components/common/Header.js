import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'

export const Header = (props) => {
	const {customHeaderStyle,children, customTitleStyle, title, renderLeftItem, renderRightItem, customItemContainerStyle, customTitleContainerStyle} = props
	
  return (
		<View style = {StyleSheet.flatten([styles.container,customHeaderStyle])}>
			<View style = {StyleSheet.flatten([styles.itemContainer,customItemContainerStyle])}>
				{renderLeftItem}
			</View>
			<View style = {StyleSheet.flatten([styles.titleContainer,customTitleContainerStyle])}>
				<Text style = {StyleSheet.flatten([styles.title,customTitleStyle])}>
					{title}
				</Text>
				{children}
			</View>
			<View style = {StyleSheet.flatten([styles.itemContainer,customItemContainerStyle])}>
				{renderRightItem}
			</View>
			
  	</View>
  )
}

const styles = StyleSheet.create({
	container: {
		width: Dimensions.get('window').width,
		height: 65,
		backgroundColor:'white',
		justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
	},
	title: {
		fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
    color: 'black',
	},
	itemContainer: {
		justifyContent: 'space-around',
		alignItems: 'center',
		flexDirection: 'row',
		flex: 0.2
	},
	titleContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
    alignItems: 'center',
		flex: 0.6
	}
})