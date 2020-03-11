import React from 'react'
import { Text, StyleSheet, View } from 'react-native'

const Header = ({ name }) => {
    return (
        <View style={styles.titleContainer}>
            <View style={styles.titleShadow}>
                <Text style={styles.title}>{name}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        overflow: 'hidden',
        backgroundColor: '#fff',
        paddingBottom: 10,
    },
    titleShadow: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 20,
        paddingRight: 10,
        paddingBottom: 20,
        paddingLeft: 10,
        color: '#333',
    },
})

export default Header
