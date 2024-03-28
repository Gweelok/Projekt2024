import { StyleSheet } from "react-native";
import indexStyles from "../../styles/index";
import {Buttons, HeaderText} from "../../styles/Stylesheet";

const deleteAccountStyles = StyleSheet.create({

    header:{
        ...HeaderText.Header,
        marginTop: indexStyles.metrics.header.deleteAccount.marginTop, 
        marginLeft: indexStyles.metrics.header.deleteAccount.marginLeft, 
        marginRight: indexStyles.metrics.header.deleteAccount.marginRight,
    },
    deleteButton:{
        ...Buttons.main_button,
        marginTop: indexStyles.metrics.button.delete.marginTop,
    },
    deleteButtonText:{
        ...Buttons.main_buttonText
    },
    cancelButton:{
        ...Buttons.secondary_button,
        marginTop: indexStyles.metrics.button.cancel.marginTop,
    },
    cancelButtonText:{
        ...Buttons.secondary_buttonText
    }
}); 

export default deleteAccountStyles;