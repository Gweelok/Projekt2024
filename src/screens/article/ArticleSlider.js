import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, useWindowDimensions, Image, TouchableOpacity } from 'react-native';
import GlobalStyle from "../../styles/GlobalStyle";
import { styles } from '../../styles/Stylesheet';
import { Primarycolor1 } from '../../styles/Stylesheet';
import { useLanguage, t } from '../../Languages/LanguageHandler'


//todo replace static data with actual one
const data = [
  {
    title: "Title1",
    image: require("../../../assets/images/updropp.png"),
    
  },
  {
    title: "Title2",
    image: require("../../../assets/images/cph.jpg"),
  },
  {
    title: "Title3",
    image: require("../../../assets/images/updropp.png"),
  },
];

const ArticleSlider = () => {
  const windowWidth = useWindowDimensions().width;
  const slider = useRef(null);
  const [sliderState, setSliderState] = useState({
    item: 0,
    offset: 0,
  });

  const { currentLanguage } = useLanguage();


  useEffect(() => {
    const autoSlide = setInterval(() => {
      const newIndex = (sliderState.item + 1) % data.length;
      slider.current.scrollToIndex({ index: newIndex, animated: true });
    }, 3500);

    // Clear the interval when the component is unmounted
    return () => clearInterval(autoSlide);
  }, [sliderState]);

  const slideChanged = (e) => {
    const item = Math.round(e.nativeEvent.contentOffset.x / windowWidth);

    setSliderState({
      item: item,
      offset: item * windowWidth,
    });
  };


  const renderer = ({ item }) => (
    <View>
      <View style={SlideStyles.slide}>
        <Image style={SlideStyles.image} source={item.image} />
        <Text style={SlideStyles.title}>{item.title}</Text>
      </View>
    </View>
  );


  return (
    <View style={GlobalStyle.BodyWrapper}>
        <Text style={[styles.menuItem_text, {marginTop: 15}]}>
        {t('ArticleSlider.header',currentLanguage)}
          </Text>
      <FlatList
        data={data}
        renderItem={renderer}
        ref={slider}
        keyExtractor={(_, index) => index.toString()}
        horizontal={true}
        pagingEnabled={true}
        onScroll={slideChanged}
        getItemLayout={(_, index) => ({
          length: windowWidth,
          offset: windowWidth * index,
          index,
        })}
      />
       <View style={SlideStyles.dotGroup}>
      {data.map((_, index) => (
        <View key={index} style={[SlideStyles.dot, sliderState.item === index ? SlideStyles.dotActive : null]} />
      ))}
     </View>
    </View>
  );
};

const SlideStyles = StyleSheet.create({

  slide: {
    flex: 1,
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    color: 'black',
  },

  image: {
    backgroundColor: Primarycolor1,
    opacity: 0.2,
    display: 'flex'
  },

  dotGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 20,

  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginHorizontal: 3,
    borderWidth: 1.5,
    borderColor: Primarycolor1,
  },
  dotActive: {
    backgroundColor: '#ffffff',
  },
});

export default ArticleSlider;