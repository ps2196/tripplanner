import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 10
    },
    tripContainer: {

    },
    tripItemContainer: {
        paddingVertical: 5,
        marginVertical: 6,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius:6,
        marginHorizontal: 20,
        backgroundColor: 'white',
    },
    tripText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    tripDate: {
        fontSize: 14,
        color: '#ccc',
        textAlign: 'center'
    }
})
