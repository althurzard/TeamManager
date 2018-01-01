import React, { Component } from 'react'
import { Text, View, StyleSheet} from 'react-native'
import { Button } from './'
export const Row = (props) => {
    const {iconName,iconColor, iconSize, customBody, onPress, customLeftContainerStyle, customRightContainerStyle,customTextStyle,customLeftItem,rowData} = props
    const {name} = rowData
    return (
        <View style={styles.container}>
            <View  style = {StyleSheet.flatten([styles.leftContainer,customLeftContainerStyle])}>
                {onPress && <Button
                    iconColor = {iconColor}
                    iconSize = {iconSize}
                    iconName = {iconName ? iconName : 'md-square-outline'}
                    onPress = {() => onPress(rowData)}
                />}
                {customLeftItem ? customLeftItem() : null}
            </View>
            <View style = {StyleSheet.flatten([styles.rightContainer,customRightContainerStyle])}>
                {!customBody &&
                 <Text style={StyleSheet.flatten([styles.text,customTextStyle])}>
                    {name}
                </Text>
                }
                {customBody ? customBody() : null}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      fontFamily: 'OpenSans-SemiBold',
      fontSize: 14,
      color: 'black',
    },
    leftContainer: {
      height: 40,
      width: 40,
      justifyContent: 'center',
      alignItems: 'center'
    },
    rightContainer: {
        flex:1,
        marginLeft: 10,
        marginRight: 10,
    }
  });