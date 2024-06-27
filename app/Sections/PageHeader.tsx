import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const styles = StyleSheet.create({
    logoContainer: {
        alignItems: 'center',
    },
    logo: {
        width: Dimensions.get('window').width / 2,
    },
    text: {
        height: 35,
        fontSize: 15,
    },
    deviceReadyText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
    },
    deviceReadyContainer: {
        marginTop: 10,
        backgroundColor: '#623de3',
        width: Dimensions.get('window').width,
        marginBottom: 10,
    },
});

const PageHeader = (bluestackinitialized: boolean, bluestackMessage = '') => (<View style={styles.logoContainer}>
    <Image
        resizeMode="contain"
        source={require('../../assets/full_logo.png')}
        style={styles.logo}
    />
    <Text style={styles.text}>{bluestackMessage}</Text>
    <View style={styles.deviceReadyContainer}>
        <Text style={styles.deviceReadyText}>
            {bluestackinitialized ? 'SDK is Ready' : 'SDK is not Ready'}
        </Text>
    </View>
</View>)

export default PageHeader;