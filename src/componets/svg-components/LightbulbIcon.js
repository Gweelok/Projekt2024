import React from 'react';
import Svg, { Path } from 'react-native-svg';
import {View} from "react-native";
import {Primarycolor1} from "../../styles/Stylesheet";

const LightbulbIcon = () => {
    return (
        <View style={{backgroundColor: Primarycolor1, width:25, height:30, alignItems: "center", paddingTop:3}}>
        <Svg width={23} height={24}  id="Lag_1" data-name="Lag 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 222.46 321.3">
            <Path
                fill="white"
            d="m220.73,92.89C212.37,41.01,166.8.63,114.38.01,67.92-.55,33.91,21.06,11.89,61.76c-2.8,5.18-2.3,8.21,1.17,10.06,3.55,1.89,6.21.36,8.97-5.18C40.94,28.72,82.82,6.15,123.71,11.84c60.14,8.36,99.53,67.25,84.46,126.1-4.73,18.47-14.02,34.22-27.19,47.87-9,9.33-17.07,19.29-19.51,32.55-.35,1.92-1.67,1.53-2.84,1.53-31.11,0-62.21,0-93.32.06-2.06,0-2.69-.75-3.15-2.63-1.7-7-5.11-13.19-9.46-18.92-3.71-4.89-7.94-9.3-12.18-13.71-18.89-19.68-28.76-43.12-29.27-70.43-.13-7.01.52-13.95,1.7-20.87.64-3.83-1.27-6.44-4.51-6.95-3.34-.51-5.97,1.4-6.58,5.1-5.78,34.75,1.79,66.11,24.03,93.68,5.56,6.9,12.28,12.79,17.69,19.85,5.64,7.36,8.84,15.45,8.74,24.89-.12,10.62.23,21.24.35,31.85.1,8.73,3.26,16.25,9.98,21.72,3.36,2.74,4.43,5.48,4.4,9.65-.09,12.56,7.66,22.81,19.54,26.79.98.33,2.31.08,2.9,1.33h44.23c2.55-.86,5.25-1.42,7.63-2.61,10.95-5.51,16.44-14.44,16.47-26.76,0-2.17-.84-4.44,1.78-6.32,8.49-6.09,12.56-14.56,12.46-25.05-.09-9.25.45-18.53-.19-27.73-.96-13.7,4-24.85,13-34.64,1.86-2.02,3.71-4.05,5.59-6.06,26.22-28.16,36.38-61.28,30.27-99.24h0Zm-90.1,217.05c-12.24.26-24.49.29-36.72-.02-8.68-.21-15.79-8.1-15.74-16.51.01-1.71.29-2.28,2.23-2.26,10.74.13,21.48.06,32.23.07,10.49,0,20.99.09,31.48-.07,2.09-.03,2.45.54,2.43,2.42-.1,8.48-7.22,16.19-15.91,16.37h0Zm16.54-48.78c3.49.2,7.02.32,10.48,0,3.34-.31,3.36,1.33,2.91,3.71-1.58,8.45-8.87,14.99-17.62,15.07-20.36.18-40.71.17-61.07.01-8.9-.07-16.35-6.84-17.79-15.34-.41-2.44-.06-3.47,2.87-3.45,17.23.15,34.47.09,51.7.06,1.36,0,2.79-.01,4.05-.42,2.86-.93,4.18-3.08,3.76-6.07-.4-2.82-2.14-4.43-4.99-4.69-1.12-.1-2.25-.05-3.37-.05-16.99,0-33.97-.06-50.95.07-2.65.02-3.41-.7-3.28-3.31.23-4.24.21-8.5,0-12.73-.11-2.37.63-2.88,2.91-2.87,15.24.11,30.47.06,45.71.06s29.97.06,44.95-.07c2.59-.02,3.45.59,3.32,3.25-.21,4.36-.11,8.75.04,13.11.07,1.95-.49,2.62-2.49,2.53-3.62-.15-7.25-.11-10.87,0-3.42.1-5.51,2.11-5.66,5.21-.16,3.23,1.95,5.74,5.39,5.94h0Z"
            />
            <Path
                fill="white"
             d="m103.96,176.75c-5.14,0-9.54-1.78-13-5.6-11.92-13.13-23.89-26.21-35.65-39.48-6.72-7.58-5.97-18.6,1.33-25.23,7.43-6.75,18.49-6.27,25.53,1.29,6.21,6.67,12.37,13.4,18.29,20.32,2.25,2.63,3.18,2.12,5.06-.34,11.13-14.58,22.39-29.06,33.72-43.49,4.94-6.29,11.46-8.61,19.28-6.58,7.18,1.86,12.2,7.88,13.09,15.62.52,4.52-.69,8.69-3.4,12.32-3.59,4.8-7.26,9.53-11.01,14.2-2.57,3.21-5.76,3.68-8.44,1.47-2.55-2.1-2.79-5.22-.45-8.32,3.3-4.38,6.75-8.66,10.08-13.03,2.87-3.77,2.59-7.82-.59-10.25-3.28-2.51-7.05-1.84-10.06,2.01-12.82,16.43-25.58,32.9-38.36,49.37-4.23,5.45-7.13,5.64-11.72.6-7.73-8.49-15.4-17.05-23.14-25.54-2.94-3.23-5.91-3.91-8.96-2.25-3.72,2.02-4.83,6.94-1.87,10.26,11.79,13.24,23.67,26.41,35.67,39.46,3.07,3.33,7.55,2.63,10.64-1.31,7.01-8.93,13.97-17.9,20.89-26.91,1.64-2.14,3.48-3.53,6.32-3.07,4.26.7,5.94,5.44,3.11,9.28-3.48,4.72-7.16,9.29-10.76,13.92-3.75,4.83-7.49,9.67-11.28,14.47-3.64,4.62-8.47,6.81-14.32,6.8h0Z"
            />
        </Svg>
        </View>
    );
};

export default LightbulbIcon;
