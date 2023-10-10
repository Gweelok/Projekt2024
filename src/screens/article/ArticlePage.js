import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import GlobalStyle from "../../styles/GlobalStyle";
import StatusBarComponent from "../../componets/atoms/StatusBarComponent";
import ScrollViewComponent from "../../componets/atoms/ScrollViewComponent";
import ArticleSlider from "./ArticleSlider";

const ArticlePage = ({ route }) => {
  const { title, content } = route.params;
  const screenWidth = Dimensions.get("window").width;
  const [imgHeight, setImgHeight] = useState(0);

  useEffect(() => {
    // todo the image should get from server
    const source = require("../../../assets/images/cph.jpg");
    const { width, height } = Image.resolveAssetSource(source);
    const aspectRatio = height / width;
    setImgHeight(screenWidth * aspectRatio);
  }, []);

  return (
    <StatusBarComponent>
      <ScrollViewComponent>
        <View style={GlobalStyle.BodyWrapper}>
          <Image
            // todo the image should get from server
            source={require("../../../assets/images/cph.jpg")}
            style={{ width: screenWidth, height: imgHeight }}
            resizeMode="contain"
          />

          <Text style={styles.title}>{title}</Text>
          {content.map((paragraph, index) => (
            <Text key={index} style={styles.content}>
              {"  " + paragraph}
            </Text>
          ))}
          <ArticleSlider/>
        </View>
      </ScrollViewComponent>
    </StatusBarComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 15,
  },
  content: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default ArticlePage;
