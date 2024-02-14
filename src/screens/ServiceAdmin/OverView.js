import React from 'react';
import { View, StyleSheet } from 'react-native';
import GlobalStyle from '../../styles/GlobalStyle';
import { windowHeight, windowWidth } from '../../utils/Dimensions';

import OverViewContent from '../../components/OverView/OverViewContent';

const OverView = ({ route }) => {
    const { location } = route.params;

    return (
        <View style={[style.container, GlobalStyle.BodyWrapper]}>
            <OverViewContent location={location}></OverViewContent>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        height: windowHeight,
        width: windowWidth,
        marginTop: 40,
        alignItems: 'center',
    },
});

export default OverView;

