import { ScrollView, View, RefreshControl } from "react-native";
import { React, useState, useCallback } from "react";
import scrollViewComponentStyles from "./scrollViewComponentStyles";

// This component is used when you want to make a screen scroll
// We use the ScrollView prop imported from react native
// For usage, import this component on any screen you are working on, and it'll automatically scroll on that screen
// there are props needed, the contentContainerStyle is for any styling you want to add to the scrollview such as padding, margin and the rest
// the children prop is for any component that needs to be displayed inside the scrollviewComponent

const ScrollViewComponent = ({
  children,
  contentContainerStyle,
  style,
  refreshing,
  onRefresh,
}) => {
  return (
    <ScrollView
      style={style}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={false}
      overScrollMode="never"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {children}
      <View style={scrollViewComponentStyles.viewStyle} />
    </ScrollView>
  );
};

export default ScrollViewComponent;
