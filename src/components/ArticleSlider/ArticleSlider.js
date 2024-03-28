import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import articleSlidestyles from "./articleSliderStyles";
import { useLanguage, t } from "../../languages/LanguageHandler";

const windowWidth = Dimensions.get("screen").width;

const ArticleSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [userScrolling, setUserScrolling] = useState(false);
  const flatListRef = useRef(null);
  const { currentLanguage } = useLanguage();

  const handleArticleClick = (article) => {
    //todo in the future, add the navigation to specific article.
    //Example: navigation.navigate("ArticleDetail", { article });
  };

  //todo replace static data with actual one
  const staticArticles = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet, consec.",
      image: require("../../../assets/images/cph.jpg"),
    },
    {
      id: 2,
      title: "Title2",
      image: require("../../../assets/images/updropp.png"),
    },
    {
      id: 3,
      title: "Title3",
      image: require("../../../assets/images/cph.jpg"),
    },
  ];

  const handlePageChange = (index) => {
    setActiveIndex(index);
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ animated: true, index });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!userScrolling) {
        let newIndex = activeIndex + 1;
        if (newIndex >= staticArticles.length) {
          newIndex = 0;
        }
        handlePageChange(newIndex);
      }
    }, 3500);

    return () => {
      clearInterval(interval);
    };
  }, [activeIndex, userScrolling]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleArticleClick(item)}>
      <View style={articleSlidestyles.slide}>
        <Image source={item.image} style={articleSlidestyles.image} />
        <View style={articleSlidestyles.overlay} />
        <Text style={articleSlidestyles.title} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={articleSlidestyles.container}>
      <FlatList
        ref={flatListRef}
        data={staticArticles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScrollBeginDrag={() => {
          setUserScrolling(true);
        }}
        onScrollEndDrag={() => {
          setUserScrolling(false);
        }}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.floor(
            event.nativeEvent.contentOffset.x / windowWidth
          );
          handlePageChange(newIndex);
        }}
      />
      <View style={articleSlidestyles.indicatorContainer}>
        {staticArticles.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              articleSlidestyles.indicator,
              index === activeIndex && articleSlidestyles.activeIndicator,
            ]}
            onPress={() => handlePageChange(index)}
          />
        ))}
      </View>
    </View>
  );
};

export default ArticleSlider;
