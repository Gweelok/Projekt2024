import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Modal, Text } from "react-native";
import { ECharts } from "react-native-echarts-wrapper";
import {Buttons, Primarycolor1} from "../../styles/Stylesheet";
import Icon from "react-native-vector-icons/AntDesign";

const ChartForStats = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const chartRef = useRef(null);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (chartRef.current) {
                const newChartData = months.map(() => Math.floor(Math.random() * 500) + 100);
                const options = {
                    xAxis: {
                        data: months,
                        itemStyle: {
                            color: Primarycolor1,
                        },
                    },
                    series: [
                        {
                            data: newChartData,
                            itemStyle: {
                                color: Primarycolor1,
                            },
                        },
                    ],
                };
                chartRef.current.setOption(options);
            }
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={styles.chartContainer}>
                    <ECharts ref={chartRef} option={createChartOptions} />
                </View>
            </TouchableOpacity>
            {/*<Modal visible={isModalVisible} animationType="slide">*/}
            {/*    <View style={{ flex: 1 }}>*/}
            {/*        <TouchableOpacity onPress={() => setModalVisible(false)}>*/}
            {/*            <View style={{backgroundColor:Primarycolor1, width:30, height:30, left:10}}>*/}
            {/*                <Icon size={30} name="close" style={Buttons.Icon} />*/}
            {/*            </View>*/}
            {/*        </TouchableOpacity>*/}
            {/*        <ECharts ref={chartRef} option={createChartOptions} />*/}
            {/*    </View>*/}
            {/*</Modal>*/}
        </View>
    );
};

const createChartOptions = {

    xAxis: {
        type: "category",
        data: [],
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
            data: [],
            type: "bar",
            itemStyle: {
                color: Primarycolor1,
            },
        },
    ],
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    chartContainer: {
        height: 300,
        width:"100%",
        left:10
    },
});

export default ChartForStats;
