import { StyleSheet } from "react-native";
import { } from "../../styles/Stylesheet";
import indexStyles from "../../styles/index"

const profileCreatedStyles = StyleSheet.create({

    animationContainer: {
        width: indexStyles.metrics.container.animation.width,
        height: indexStyles.metrics.container.animation.height,
        borderRadius: indexStyles.metrics.container.animation.borderRadius,
        backgroundColor: indexStyles.colorPalette.transparent,
        borderColor: indexStyles.colorPalette.Primarycolor3,
        borderWidth: indexStyles.metrics.container.animation.borderWidth,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: indexStyles.metrics.container.animation.marginBottom,
    },
    animatedText:{
        fontSize: indexStyles.typography.fontSize.h6, 
        color: indexStyles.colorPalette.Primarycolor3
    },
    successText:{
        color: indexStyles.colorPalette.Primarycolor3, 
        fontSize: indexStyles.typography.fontSize.h4, 
        margin: indexStyles.metrics.text.success.margin, 
        textAlign: 'center'
    }, 
    centerContent:{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    }
    
});

export default profileCreatedStyles;