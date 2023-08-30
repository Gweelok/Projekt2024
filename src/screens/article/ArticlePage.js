import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';

const ArticlePage = ({ route }) => {
    const { title, content } = route.params;
    const screenWidth = Dimensions.get('window').width;
    const [imgHeight, setImgHeight] = useState(0);

    useEffect(() => {
        // todo the image should get from server
        const source = require('../../../assets/images/cph.jpg');
        const { width, height } = Image.resolveAssetSource(source);
        const aspectRatio = height / width;
        setImgHeight(screenWidth * aspectRatio);
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Image
                // todo the image should get from server
                source={require('../../../assets/images/cph.jpg')}
                style={{ width: screenWidth, height: imgHeight }}
                resizeMode="contain"
            />
            <Text style={styles.title}>{title}</Text>
            {content.map((paragraph, index) => (
                <Text key={index} style={styles.content}>{"  " +paragraph}</Text>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        marginHorizontal:20,
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 25,
        marginBottom: 15,
    },
    content: {
        marginTop: 10,
        marginHorizontal: 20,
        fontSize: 16,
    },
});

export default ArticlePage;
