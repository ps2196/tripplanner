import React, { Component } from 'react';
import {Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { firebase } from '../firebase/config';

class Header extends Component {

    constructor(props) {
        super(props)
        this._navigation = props.navigation;

        this.onSignOut = async () => {
            await firebase.auth().signOut();
            this._navigation.navigate('Login');
        };

        this.onAddTrip = () => {
            this._navigation.navigate('Add Trip');
        };

    }

    render = () => {
        return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => this.onAddTrip()}>
                <Text style={styles.buttonText}>Plan trip</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.onSignOut()}>
                <Text style={styles.buttonText}>Sign out</Text>
            </TouchableOpacity>
        </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 10,
        marginBottom: 15
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#788eec',
        width: 80,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    }
})

export default Header;