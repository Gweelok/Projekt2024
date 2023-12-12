
import React, { useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { ECharts } from "react-native-echarts-wrapper";
import { Primarycolor1 } from "../../../styles/Stylesheet";
import {t, useLanguage} from "../../../Languages/LanguageHandler";

const ChartForStats = ({refreshing}) => {
    const chartRef = useRef(null);
    const {currentLanguage}=useLanguage();
    const months = [
        "Jan", "Feb", "Mar", "Apr", t("months.may", currentLanguage), "Jun", "Jul", "Aug", "Sep", t("months.October", currentLanguage),];
    // Static data for each month - adjust as necessary
    const monthlyData = [180, 450, 150, 360, 520, 250, 450, 415, 590, 490];

    // Set initial chart options
    const options = createChartOptions(months, monthlyData);

    // Set options on the chart
    useRef(() => {
        chartRef.current.setOption(options);
    }, []);

    // on refresh update into chart
    useEffect(()=>{
        if(refreshing){ 
            const newOptions = createChartOptions(months, [180, 450, 150, 360, 520, 250, 450, 415, 590, 777]);
            chartRef.current.setOption(newOptions);
        }
        console.log('updated')
    }, [refreshing])

    return (
        <View style={styles.container}>
            <View style={styles.chartContainer}>
                <ECharts ref={chartRef} option={options} />
            </View>
        </View>
    );
};

const createChartOptions = (months, data) => ({
    xAxis: {
        type: "category",
        data: months,
        axisLabel: {
            interval: 0, // Display all labels
           /* rotate: 45, // Rotate labels */
            textStyle: {
                fontSize: 13, // Adjust font size as needed
               /* fontWeight: 'bold'*/ // Make text bold
            }
        },
        axisTick: {
            alignWithLabel: true
        },
        itemStyle: {
            color: Primarycolor1,
        },
    },
    yAxis: {
        type: "value",
        itemStyle: {
            color: Primarycolor1,
        },
    },
    series: [
        {
            data: data,
            type: "bar",
            itemStyle: {
                color: Primarycolor1,
            },
        },
    ],
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chartContainer: {
        height: 300,
        width: "100%",
    },
});

export default ChartForStats;
