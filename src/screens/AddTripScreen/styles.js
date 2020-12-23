import { StyleSheet } from 'react-native';

const marginVert = 10;
const marginHoriz = 25;

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {

    },
    logo: {
        flex: 1,
        height: 120,
        width: 90,
        alignSelf: "center",
        margin: 30
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginVertical: marginVert,
        marginHorizontal: marginHoriz,
        paddingHorizontal: 16
    },
    inputDescription: {
        height: 200,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        textAlignVertical: 'top',
        marginVertical: marginVert,
        marginHorizontal: marginHoriz,
        paddingHorizontal: 16,
        paddingVertical: 15
    },
    dateContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    date: {
        backgroundColor: 'white',
        marginVertical: marginVert,
    },
    button: {
        backgroundColor: '#788eec',
        marginVertical: marginVert,
        marginHorizontal: marginHoriz,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonDisabled: {
        backgroundColor: 'lightgray'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    buttonSubmit: {
        marginTop: 50
    },
    participantsHeader: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
    },
    addParticipantForm: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    partAddButton: {
        width:35,
        flexGrow: 0,
        marginLeft:0
    },
    partTextInput: {
        flexGrow: 3,
        marginRight: 0
    },
    participantsList: {
        marginHorizontal: marginHoriz
     },
})
