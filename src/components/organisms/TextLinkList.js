import React from 'react';
import { View, StyleSheet } from "react-native";
import TextLink from "../molecules/TextLink"; 
import Spacer from "../atoms/Spacer";
import { Entypo } from '@expo/vector-icons';
import { Primarycolor1 } from "../../styles/styleSheet"


const TextLinkList = ({ location, navigation, textValue, linkStatus,}) => {
    console.log(textValue);
  return (
      <View style={style.container}>

              <TextLink status={linkStatus?.overview} path={'OverView'} location={location} navigation={navigation} textValue={textValue.overview}></TextLink>
              <Entypo name="check" size={22} color={Primarycolor1}style={style.checkbox}/>
              <Spacer height={25}></Spacer>
              {/* Add correct path */}
              <TextLink status={linkStatus.overview} path={'ServiceAdminMain'} location={location} navigation={navigation} textValue={textValue.items}></TextLink>
              <Entypo name="check" size={22} color={Primarycolor1}style={style.checkbox}/>
              <Spacer height={25}></Spacer>
              {/* Add linkStatus.reportedItems */}
              <TextLink status={linkStatus?.reportedItems} path={'Uptainer'} location={location} navigation={navigation} textValue={textValue.condition}></TextLink>
              <Entypo name="check" size={22} color={Primarycolor1}style={style.checkbox}/> 
      </View>
  )
}

const style = StyleSheet.create({
  container: {
      marginTop: 40,
  },
  textMargin: {
      marginBottom: 20,
      textAlign: "right"
  },
  checkboxContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between"
  },
  checkbox: {
      paddingLeft: 20,
  }
})

export default TextLinkList 