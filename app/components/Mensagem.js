'use-strict'

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text
} from 'react-native';

export default class Mensagem extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {

	  };
	}

	render() {

    const isMy = this.props.isMy;

		return (
			<View style={{flex: 1, flexDirection: 'row'}}>
				<View style={isMy ? {flex: 1} : {flex:0}}/>

				<Text style={isMy ? style.me : style.you}>
					<Text>
						{this.props.texto}
					</Text>
				</Text>

				<View style={isMy ? {flex: 0} : {flex: 1}}/>
			</View>
		);
	}
}

const style = StyleSheet.create({
  me: {
  	backgroundColor: '#3598DC',
    color: '#fff',
    marginBottom: 5,
    borderRadius: 10,
    padding: 8,
    elevation: 2
  },
  you: {
    backgroundColor: '#f2f2f2',
    color: '#444',
    marginBottom: 5,
    borderRadius: 10,
    padding: 8,
    elevation: 2
  }
});