import {View, Text, SafeAreaView, Button, ScrollView, StyleSheet} from 'react-native';
import {Backgroundstyle, Primarycolor1} from '../styles/Stylesheet';
import Navigationbar from '../componets/Navigationbar';
import React from 'react';
import {t, useLanguage} from "../Languages/LanguageHandler";
import DescriptionField from "./form/DescriptionField";

const Add = ({navigation}) => {
    const {currentLanguage, setLanguage} = useLanguage();

    return (
        <View style={Backgroundstyle.interactive_screens}>
            <ScrollView style={AddStyles.container}>
                <Text style={AddStyles.header }>{t("UpdroppForm.title", currentLanguage)}</Text>

                {/* replace following View with your own component.
                1. You should not delete the styles.marginView, if you want to add new style,
                create a new style in Stylesheet and add it after styles.marginView in the list.
                an example: style={[styles.marginView, styles.imageUploadStyle]}
                2. put all the components in the folder screens/form/, which is designed to
                put all the files related to this page.
                */}
                <View style={[AddStyles.marginView,]}>
                    <Text>Image upload. </Text>
                </View>
                <View style={[AddStyles.marginView,]}>
                    <Text>Category dropdown</Text>
                </View>
                <View style={[AddStyles.marginView,]}>
                    <Text>Product dropdown</Text>
                </View>
                <View style={[AddStyles.marginView,]}>
                    <Text>Brand dropdown</Text>
                </View>
                <View style={[AddStyles.marginView,]}>
                    <Text>Model dropdown</Text>
                </View>
                <View style={[AddStyles.marginView,]}>
                    <Text>Condition dropdown</Text>
                </View>
                <View style={[AddStyles.marginView, ]}>
                    <DescriptionField />
                </View>
                <View style={[AddStyles.marginView,]}>
                    <Text>Informative text</Text>
                </View>
                <View style={[AddStyles.marginView,]}>
                    <Text>Button: "UPDROPP"</Text>
                </View>
                <View style={[AddStyles.marginView,]}>
                    <Text>Button: "SCAN SENERE"</Text>
                </View>
            </ScrollView>

            <Navigationbar navigation={navigation}/>
        </View>
    );
}

const AddStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
        paddingHorizontal: 15,
    },
    header: {
        fontFamily: "space-grotesk-bold",
        fontSize: 35,
        color: Primarycolor1,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    marginView: {
        marginLeft: 8,
        marginRight: 8,
    },

});


export default Add;
