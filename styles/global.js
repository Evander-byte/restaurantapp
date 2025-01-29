import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        marginHorizontal: '2.5%',
        flex: 1
    },
    button: {
        backgroundColor:"#FFDA00",
        borderRadius: 10,
        marginHorizontal: 40,
        padding: 5
    },
    buttonText: {
        textTransform: "uppercase",
        fontWeight: 'bold',
        color: "#000",
        textAlign: 'center'
    },
    titles: {
        textAlign: 'center',
        marginTop: 40,
        marginBottom: 30,
        fontSize: 30
    },
    amount: {
        marginVertical: 20,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold'
    }
})

export default globalStyles