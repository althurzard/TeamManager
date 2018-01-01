import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { DEFAULT_COLOR } from '../../Constants'
import { Ionicons} from './'
export const CardItem = (props) => {
    const {children,customStyle, customTitleContainerStyle, customTitleStyle, title, iconName, iconColor, iconSize} = props
    return (
        <View style = {StyleSheet.flatten([styles.container,customStyle])}>
            <View style = {StyleSheet.flatten([styles.titleContainer,customTitleContainerStyle])}>
                <Text style = {StyleSheet.flatten([styles.textStyle,customTitleStyle])}>{title}</Text>
                {iconName && 
                    <Ionicons
                        name= {iconName}
                        color = {iconColor ? iconColor : DEFAULT_COLOR}
                        size = {iconSize ? iconSize : 30}
                    /> }
            </View>
            <View style = {styles.bodyContainer}>
                {children}
            </View>  
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        borderBottomWidth: 1.5,
        borderColor: '#ADADAD',
        flexDirection:'column',
        width:'95%'
    },
    bodyContainer: {
        flex:1
    },
    titleContainer:{
        width: '100%',
        height: 65,
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textStyle: {
        flex:1,
        fontFamily: 'OpenSans-Bold',
        fontSize: 14,
        color: 'black',
        opacity: 0.7,
    }
})