import React, { useState, useEffect } from "react";
import { View, Text, Image, Dimensions } from "react-native";

import ScrollViewComponent from "../../components/ScrollViewComponent/ScrollViewComponent";
import ArticleSlider from "../../components/ArticleSlider/ArticleSlider";
import BackButton from "../../components/BackButton/BackButton";

import articlePageStyles from "./articlePageStyles";
import Widescreen from "../../templates/standardScreens/WideScreen";

import { t, useLanguage } from "../../languages/LanguageHandler";
import { useNavigation } from "@react-navigation/native";

const ArticlePage = ({ route }) => {
  const navigation = useNavigation();
  const { title, content } = route.params;
  const screenWidth = Dimensions.get("window").width;
  const [imgHeight, setImgHeight] = useState(0);
  const { currentLanguage } = useLanguage();
  const handlePress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    // Calculate image height based on aspect ratio
    const source = require("../../../assets/images/cph.jpg");
    const { width, height } = Image.resolveAssetSource(source);
    const aspectRatio = height / width;
    setImgHeight(screenWidth * aspectRatio);
  }, []);

  return (
    <Widescreen>
      <ScrollViewComponent>
        <View style={articlePageStyles.container}>
          <View style={articlePageStyles.backButtonContainer}>
            <BackButton onPress={handlePress} />
          </View>

          <View>
            <Image
              source={require("../../../assets/images/cph.jpg")}
              style={{
                ...articlePageStyles.img,
                width: screenWidth,
                height: imgHeight,
              }}
              resizeMode="contain"
            />
          </View>

          <Text style={articlePageStyles.writtenPlaceholder}>
            {t("ArticleScreen.Written", currentLanguage)}
          </Text>

          <Text style={articlePageStyles.header}>{title}</Text>

          <Text style={articlePageStyles.articleText}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam
            aspernatur commodi cumque cupiditate eaque earum eum expedita
            laudantium libero magnam minima, mollitia necessitatibus obcaecati
            perferendis, quis reiciendis suscipit temporibus.
          </Text>

          <Text style={articlePageStyles.writtenPlaceholder1}>
            {t("ArticleScreen.Subheadline", currentLanguage)}
          </Text>

          <Text style={articlePageStyles.articleText}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
            aliquam aut doloribus ducimus esse exercitationem fuga hic illo
            inventore ipsa ipsum iusto molestiae nihil, non odio praesentium
            similique ullam voluptas!Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Aliquid deserunt dolores dolorum incidunt
            laboriosam natus odio officia quia quisquam sit. Atque fuga magni
            nam neque quae. Error eum illo sint.
          </Text>

          <Text style={articlePageStyles.sliderHeader}>
            {t("ArticleSlider.header", currentLanguage)}
          </Text>

          <ArticleSlider />
        </View>
      </ScrollViewComponent>

    </Widescreen>
  );
};

export default ArticlePage;
