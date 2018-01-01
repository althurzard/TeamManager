import Ioni from 'react-native-vector-icons/Ionicons';
import React from 'react';

export const Ionicons = (props) => {
	const {name, color, size} = props;
	return (
		<Ioni
			name = {name}
            size = {size ? size : 25}
            color = {color ? color : '#ADADAD'}
		/>
	)
}