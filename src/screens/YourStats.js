
import React from 'react';
import { View, Text } from 'react-native';
import {t,useLanguage} from "../Languages/LanguageHandler";
import {styles} from "../styles/Stylesheet";

const YourStats = () => {
    const { currentLanguage } = useLanguage();

    return (
        <View>
            <View style={{ marginTop: 15, marginBottom:10  }}>
                <Text style={[styles.article_text,{fontWeight: "bold", fontSize: 18}]}>{t('StatsPage.AmountReduced', currentLanguage)}</Text>
            </View>
            <Text>Amount of reused items (Item donated & Items collected)</Text>
            <Text>Amount of CO2 saved</Text>
            <Text>Social media icons</Text>
            <Text>Your most visited Uptainers</Text>
            <Text>Get inspired</Text>
        </View>
    );
}

export default YourStats;
