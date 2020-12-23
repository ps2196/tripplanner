import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { getTripDetails } from '../../firebase/config'
import UserList from '../../components/UserList';

export default function TripDetailsScreen(props) {

    const [tripId, setTripId] = useState('');
    const [trip, setTrip] = useState(null);
    const [user, setUser] = useState(props.extraData.user);

    useEffect(() => {
        if (props.route &&
            props.route.params &&
            props.route.params.tripId &&
            props.route.params.tripId != tripId) {
            setTripId(props.route.params.tripId);
        }
        if(tripId && tripId !== '') {
            getTripDetails(tripId).then(res => {
                setTrip(res);
            });
        }
    },[tripId]);



    return (
        <>
        { trip ?
        <ScrollView style={styles.container}>
            <View style={styles.destContainer}>
                <Text style={styles.sectionHead}>Where?</Text>
                <Text style={styles.destText}>{trip.destinaiton}</Text>
            </View>

            <View style={styles.dateContainer}>
                <Text style={styles.sectionHead}>When?</Text>
                <Text style={styles.dateText}>{ `${trip.startDate} - ${trip.endDate}` }</Text>
            </View>

            <View style={styles.descriptionContainer}>
                <Text style={styles.sectionHead}>What?</Text>
                <Text style={styles.descText}>{trip.description}</Text>
            </View>

            <View style={styles.partContainer}>
                <Text style={ {...styles.sectionHead, ...styles.marginBottom} }>Who?</Text>
                <UserList uids={trip.participants}></UserList>
            </View>
        </ScrollView>
        :
        <View style={styles.notFound}>
            <Text style={styles.notFoundTxt}>
            There is not such trip :( Maybe it is time to plan one
            </Text>
        </View>}
        </>
    );
}
