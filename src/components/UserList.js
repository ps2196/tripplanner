import React, { Component } from 'react';
import {Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { getUserData } from '../firebase/config';

class UserList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            refreshing: true,
            isChanged:false
        };
    }

    componentDidMount() {
        this._fetchUsers();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.uids.length !== this.props.uids.length) {
            this._fetchUsers();
        }
        if (prevState.users.length !== this.state.users.length) {
            this.setState({isChanged: !prevState.isChanged,
                refreshing:true});
        }
    }

    async _fetchUsers() {
            this.setState({ refreshing: true });
            const users  = await Promise.all(this.props.uids.map( async (uid) => {
                return await getUserData(uid);
            }));
            this.setState({users: users,
                      refreshing:false,
                      isChanged: false});
        };

    _renderUser = (data) =>  {
           const user = data.item;
           return (
            <View style={styles.userContainer}>
                <Text style={styles.userText}> {`${user.fullName} (${user.email})`} </Text>
            </View>
           );
        }

    render() {
        return (
            <SafeAreaView>
                <FlatList
                  data={this.state.users}
                  refreshing= {this.state.refreshing}
                  renderItem={(item) => this._renderUser(item)}
                  extraData={this.state.isChanged}
                />
            </SafeAreaView>)
        }
}

const styles = StyleSheet.create({
    userContainer: {
        paddingVertical: 5,
        marginVertical: 4,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius:6,
        alignContent: 'center',
        marginHorizontal: 40,
        backgroundColor: 'white'
    },
    userText: {
        fontSize: 16,
        fontWeight: 'normal',
        textAlign: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 10
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

export default UserList;