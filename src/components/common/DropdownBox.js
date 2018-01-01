import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { DEFAULT_COLOR } from '../../Constants'
import { Button } from './'
import ModalDropdown from 'react-native-modal-dropdown'

export const DropdownBox = (props) => {
    const {customButton, options, customTextStyle, customContainerStyle, customDropdownStyle, customTextHighlightStyle, onSelected} = props
    const handleSelect = (index, value) => {
        this._text.value = value
    }
    return (
        <View style = {StyleSheet.flatten([styles.container,customContainerStyle])}>
            <Button onPress = {() => this._dropdown.show()}>
                {!customButton &&
                    <Text ref = {(value) => {this._text = value}}>Please select a row</Text>
                }
                {customButton}
            </Button>
            <ModalDropdown
                ref = {(value) => {this._dropdown = value}}
                defaultValue = {'Option1'}
                //style = {{backgroundColor:'red'}}
                textStyle = {StyleSheet.flatten([styles.text,customTextStyle])}
                options={options ? options : ['Option1','Option2','Option3']}
                dropdownStyle = {StyleSheet.flatten([styles.dropdownContainer,customDropdownStyle])}
                dropdownTextHighlightStyle = {StyleSheet.flatten([styles.textHighlight,customTextHighlightStyle])}
                onSelect = {onSelected ? onSelected : handleSelect}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    text: {
        flex:1,
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 14,
        color: 'black',
        width: '100%'
    },
    dropdownContainer: {
        width: '100%',
        height: 50,
        borderWidth: 2,
        borderRadius: 3,
        borderColor: DEFAULT_COLOR,
    },
    textHighlight: {
        fontFamily: 'OpenSans-Bold',
        color: 'black',
    }
})