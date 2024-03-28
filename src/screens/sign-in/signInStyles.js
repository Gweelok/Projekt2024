import { StyleSheet } from "react-native";
import { styles, Buttons } from "../../styles/Stylesheet";
import indexStyles from "../../styles/index";

const SignInStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    errorInputBox: {
        borderColor: indexStyles.colorPalette.errorRed,
        borderWidth: indexStyles.metrics.box.error.borderWidth,
    },
    errorText: {
        color: indexStyles.colorPalette.errorRed,
        fontSize: indexStyles.typography.fontSize.body5,
        marginTop: indexStyles.metrics.text.errorSignInUp.marginTop,
        marginBottom: indexStyles.metrics.text.errorSignInUp.marginBottom,
        textAlign: "center",
    },
    errorBanner: {
        position: "absolute",
        top: indexStyles.metrics.banner.error.top,
        left: indexStyles.metrics.banner.error.left,
        right: indexStyles.metrics.banner.error.right,
        backgroundColor: indexStyles.colorPalette.errorRed,
        alignItems: "center",
        width: indexStyles.metrics.banner.error.width,
        zIndex: indexStyles.metrics.banner.error.zIndex,
    },
    backButtonContainer: {
        alignSelf: "stretch",
    },
    logInHeader: {
        ...styles.Header_Primarycolor1,
        ...styles.Header
    },
    inputField: {
        ...styles.inputBox,
        flexDirection: "row" 
    },
    placeholderTextColor: {
        color: indexStyles.colorPalette.Primarycolor4,
    },
    inputText:{
        flex: 1, 
        fontFamily: indexStyles.typography.fontFamily.primary, 
        fontSize: indexStyles.typography.fontSize.body2, 
    },
    eyeIcon:{
        ...styles.Icon_container,
        fontSize : indexStyles.typography.fontSize.body7,
        color : indexStyles.colorPalette.Primarycolor1
    },
    submitButton:{
        ...Buttons.main_button
    },
    submitButtonText:{
        ...Buttons.main_buttonText
    },
    forgetPassLink:{
        ...styles.link,
        marginTop: indexStyles.metrics.link.forgetPass.marginTop, // Put in styles.link?
    },
    signUpLink:{
        ...styles.link,
    },
    socialText:{
        ...Buttons.SocialMediabuttonText
    },
    fbButton:{
        ...Buttons.buttonfb
    },
    googleButton:{
        ...Buttons.buttongoogle
    }
});

export default SignInStyles;