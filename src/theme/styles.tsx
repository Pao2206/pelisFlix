import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        gap: 15
    },
    text:{
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    },
    textRedirect:{
        marginTop: 10,
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center",
        color: "#705AA9"
    },
    rootActivity:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    rootHome:{
        flex: 1,
        marginHorizontal: 25,
        marginVertical: 50
    },
    headerHome:{
        flexDirection: "row",
        gap: 15,
        alignItems: "center"
    },
    iconProfile:{
        alignItems: 'flex-end',
        flex: 1
    },
    modalProfile:{
        padding: 20,
        marginHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 12,
        gap: 10
    }
});