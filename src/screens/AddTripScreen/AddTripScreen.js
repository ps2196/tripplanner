import React, { useState, useEffect } from 'react'
import { Button, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-datepicker'
import styles from './styles';
import { firebase, findUserByEmail, db} from '../../firebase/config'
import UserList from '../../components/UserList';
import { useRef } from 'react';

export default function AddTripScreen(props) {
    const [destinaiton, setDestination] = useState('')
    const [description, setDescription] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [organizerId, setOrganizerId] = useState(props.extraData.user.id)
    const [participants, setParticipants] = useState([organizerId])
    const [newPartEmail, setNewPartEmail] = useState('')
    const usersList = useRef(null);

    const onSubmit = () => {
        db.collection('trips').add({
            destinaiton: destinaiton,
            description: description,
            startDate: startDate,
            endDate: endDate,
            organizerId: organizerId,
            participants, participants
          });
        props.navigation.navigate('My Trips', {refresh: true});
    };

    const isFormValid = () => {
        let res = destinaiton !== '';
        return res;
    };

    const addParticipant = async () => {
        setRefreshList(true);
        const uids =  await findUserByEmail(newPartEmail);
        if (!uids || uids.length === 0) {
            alert(`User ${newPartEmail} not found`);
        }
        else {
            const newPart = participants.concat(uids);
            setParticipants(newPart);
            setNewPartEmail('');
        }
    };

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <TextInput
                    style={styles.input}
                    placeholder='Destination'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setDestination(text)}
                    value={destinaiton}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.inputDescription}
                    multiline={true}
                    placeholder='Description...'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setDescription(text)}
                    value={description}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <View style={styles.dateContainer}>
                    <DatePicker
                        style={styles.date}
                        date={startDate}
                        mode="date"
                        placeholder="Start date"
                        format="DD.MM.YYYY"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        showIcon={ false }
                        onDateChange={(date) => {setStartDate(date)}}
                    />
                    <DatePicker
                        style={styles.date}
                        date={endDate}
                        mode="date"
                        minDate={startDate}
                        placeholder="End date"
                        format="DD.MM.YYYY "
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        showIcon = { false }
                        onDateChange={(date) => setEndDate(date)}
                    />
                </View>
                <View style={styles.participantsList}>
                    <Text style={styles.participantsHeader}> Participants </Text>

                    <View style={styles.addParticipantForm}>
                        <TextInput
                            style={ {...styles.input, ...styles.partTextInput} }
                            placeholder='New participant email'
                            placeholderTextColor="#aaaaaa"
                            onChangeText={(text) => setNewPartEmail(text)}
                            value={newPartEmail}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                        <TouchableOpacity
                            style={ newPartEmail === '' ?
                                                {...styles.button, ...styles.partAddButton,...styles.buttonDisabled } :
                                                {...styles.button, ...styles.partAddButton} }
                            disabled = { newPartEmail === '' }
                            onPress={() => addParticipant()}>
                            <Text style={styles.buttonTitle}>Add</Text>
                        </TouchableOpacity>
                    </View>

                    <UserList ref={usersList} uids={participants}/>
                </View>

                <TouchableOpacity style={!isFormValid() ?
                                    {...styles.button, ...styles.buttonDisabled, ...styles.buttonSubmit} :
                                    {...styles.button, ...styles.buttonSubmit} }
                      disabled={!isFormValid()}
                      onPress={() => onSubmit()}>
                    <Text style={styles.buttonTitle}>Done</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    )
}
