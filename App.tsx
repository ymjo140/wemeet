// app.tsx (App Entry Point - React Native)
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// 실제 앱에서는 Navigation, Provider 등이 여기에 위치합니다.

const App = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>TimeFlow Mobile App</Text>
            {/* Navigation Component will go here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default App;
