import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import {Ionicons} from './'
import { DEFAULT_COLOR } from '../../Constants'
export const Button = (props) => {
    const {onPress, customContainerStyle, children, iconName,iconColor, iconSize} = props
    return (
        <TouchableOpacity onPress={onPress}>
            <View style = {StyleSheet.flatten([styles.container,customContainerStyle])}>
                {iconName && 
                    <Ionicons
					name= {iconName}
					color = {iconColor ? iconColor : DEFAULT_COLOR}
					size = {iconSize ? iconSize : 30}
				    /> }
                {children}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }
})