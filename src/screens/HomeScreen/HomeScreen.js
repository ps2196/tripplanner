import React, { useEffect, useState } from 'react'
import { Keyboard, View, Text, TouchableOpacity, SegmentedControlIOSComponent, } from 'react-native'
import styles from './styles';
import { firebase, getTripsForUser } from '../../firebase/config'
import Header  from '../../components/Header'
import { FlatList, ScrollView } from 'react-native-gesture-handler';

export default function HomeScreen(props) {

    const [trips, setTrips] = useState([]);
    const [user, setUser] = useState(props.extraData.user);
    const [refreshing, setRefreshing] = useState(true)

    useEffect( () => {
        if (refreshing) {
        getTripsForUser(user.id).then((userTrips) => {
            setTrips(userTrips);
            setRefreshing(false);
        });
        }
    }, [user, refreshing])

    useEffect( () => {
        if (props.route &&
            props.route.params &&
            props.route.params.refresh) {
            props.route.params.refresh = false;
            setRefreshing(true);
        }
    });


    const goToTrip = (trip) => {
        props.navigation.navigate('Trip Details', {tripId: trip.id});
    }

    const renderTrip = (data) =>  {
        const trip = data.item;
        return (
         <View style={styles.tripItemContainer}>
             <TouchableOpacity
             onPress={() => goToTrip(trip)}>
                <Text style={styles.tripText}> {trip.destinaiton}</Text>
                <Text style={styles.tripDate}>{trip.startDate} - {trip.endDate}</Text>
             </TouchableOpacity>
         </View>
        );
     }


    return (
        <ScrollView>
            <Header navigation = {props.navigation}/>
            <View style={styles.tripContainer}>
            <FlatList
                  data={trips}
                  renderItem={(item) => renderTrip(item)}
            />
            </View>
        </ScrollView>
    )
}
