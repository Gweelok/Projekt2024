import React from "react";
import {View,Text} from "react-native"
import { useLanguage, t } from '../../Languages/LanguageHandler';
const Problem = ()=>{
  const { currentLanguage } = useLanguage();
  return <View>
    <Text>Hi from problem</Text>
  </View>
}
export default Problem;