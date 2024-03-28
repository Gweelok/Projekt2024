import { useState } from "react";
import { StatusBar, Dimensions } from "react-native";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default metrics = {
  // SCREENS
  screen: {
    fullSize: {
      height: "100%",
      width: "100%",
    },
    landing: {
      marginTop: 20,
    },
    interactive: {
      paddingTop: 50,
    },
    information: {
      paddingTop: 50,
    },
    message: {
      paddingTop: 50,
    },
    map: {
      marginTop: 40,
      width: 340,
      height: 360,
      borderRadius: 10,
      borderWidth: 1,
    },
    wrapper: {
      flex: 1,
      paddingHorizontal: "5%",
      width: "100%",
    },
  },

  // CONTAINERS
  container: {
    animation: {
      width: 50,
      height: 50,
      borderRadius: 25,
      borderWidth: 2,
      marginBottom: 10,
    },
    alert: {
      bottom: 60,
      right: 0,
      left: 0,
      height: 40,
      zIndex: 1,
    },
    Bodywrapper: { // probably not used.
      top: "5%",
    },
    full: {
      width: "100%",
      height: "100%",
    },
    navbar: {
      bottom: 0,
      right: -5,
      left: -5,
      elevation: 0,
      height: 60,
      borderWidth: 2,
    },
    add: {
      paddingTop: 50,
      paddingHorizontal: 15,
    },
    article: {
      marginHorizontal: 20,
    },
    amountCO2: {
      marginTop: 20,
    },
    amountCO2YourStats: {
      marginTop: 10,
    },
    amountCO2Text: {
      marginTop: 2,
      marginBottom: 20,
    },
    equivalentTop: {
      marginTop: 20,
      marginBottom: 3,
      marginRight: "4%",
    },
    equivalentBottom: {
      marginTop: 3,
      marginBottom: 3,
      marginRight: "4%",
    },
    draftCardList: {
      width: "100%",
      marginTop: 20,
    },
    draftContent: {
      padding: 20,
      //width: windowWidth / 2.4,
    },
    loading: {
      marginRight: 35,
      //width: windowWidth, //sortUptainer
      //height: windowHeight - 145, //sortUptainer
    },
    button: {
      marginTop: 10,
    },
    backButton: {
      paddingLeft: 25,
      paddingTop: 5,
      top: 20,
      left: 19,
      zIndex: 2,
      width: 30,
      height: 30,
    },
    badge: {
      width: 30,
      height: 30,
      marginLeft: 10,
    },
    navbarBadge: {
      borderRadius: 0,
      width: 12,
      height: 12,
      right: -6,
      top: -3,
    },
    bottomBar: {
      bottom: 40,
      marginBottom: 30,
    },
    bottomSwitch: {
      bottom: 40,
      marginBottom: 30,
    },
    stationDetailButton1: {
      marginTop: 25,
    },
    stationDetailButton2: {
      marginTop: 30,
    },
    searchedItems: {
      //height: windowHeight - 121,
      width: "100%",
      marginRight: 5,
    },
    error: {
      top: "5%",
    },
    recordButton: {
      bottom: 40,
    },
    qrScanner: {
      width: "100%",
      height: 400,
      marginBottom: 20,
      marginTop: 20,
    },
    sideBar: {
      top: 60,
      right: 0,
      marginHorizontal: 20,
    },
    tabBar: {
      bottom: 0,
      elevation: 0,
      height: 60,
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 30,
    },
    topBar: {
      zIndex: 1,
      paddingHorizontal: 20,
      marginBottom: 10,
      marginLeft: -8.5,
      marginTop: 20,
    },
    languageSelector: {
      borderWidth: 4,
      padding: 7,
      width: "25%",
      marginLeft: "auto",
      zIndex: 1,
    },
    list: {
      marginBottom: 0,
    },
    dropdownPrimary: {
      height: 55,
      width: "100%",
      padding: 10,
      marginLeft: "auto",
      marginRight: "auto",
      marginBottom: 15,
      borderWidth: 4,
    },
    dropdownSecondary: {
      zIndex: 1,
      width: "100%",
      maxHeight: 250,
      marginTop: 87,
    },
    dropdownSearchFieldList: {
      top: 40,
      left: 0,
      right: 0,
      zIndex: 1,
      width: "100%",
      borderBottomWidth: 3,
      borderRightWidth: 3,
      borderLeftWidth: 3,
      borderTopWidth: 0,
      minHeight: 40,
    },
    icon: {
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: 35,
      zIndex: -999,
      borderBottomWidth: 1,
    },
    iconRight: {
      top: 20,
      right: 20,
    },
    closeIcon: {
      // For now only in Infographic screen
      zIndex: 999,
      right: 0,
      marginTop: 20,
    },
    deleteDraftIcon: {
      zIndex: 999,
      right: 0,
    },
    infoDetailView: {
      marginTop: 10,
      marginBottom: 10,
    },
    svgInfographic: {
      width: "100%",
      marginTop: "40%",
    },
    textInfographic: {
      marginTop: "25%",
      marginBottom: 50,
    },
    uptainerLocation: {
      height: 75,
      bottom: -30,
    },
    scrollViewContent: {
      paddingVertical: 10,
      marginTop: 50,
    },
    thankYou: {
      marginTop: 250,
      marginBottom: 250,
    },
    stats: {
      marginTop: 30,
    },
    statsMainContent: {
      marginTop: 10,
    },
    statsInfo: {
      marginTop: 15,
    },
    saved: {
      padding: 20,
      paddingTop: "25%",
    },
    amountReduced: {
      marginTop: 15,
      marginBottom: 10,
    },
    amountReused: {
      marginTop: 25,
      marginBottom: 10,
    },
    formAdd: {
      paddingTop: 10,
      marginHorizontal: 30,
    },
    imageAdd: {
      marginBottom: 10,
    },
    customImage: {
      marginBottom: 30,
    },
    uptainer: {
      marginVertical: 10,
    },
    noUptainer: {
      width: "100%",
      borderWidth: 3,
    },
    sortUptainer: {
      marginTop: 15,
    },
    itemsYourStats: {
      marginTop: 10,
    },
    itemsDonated: {
      marginRight: 15,
      paddingTop: 5,
    },
    itemsCollected: {
      paddingTop: 5,
    },
    overviewLink: {
      marginTop: 10,
    },
    greenBox: {
      marginTop: 10,
    },
    greenBoxSecondMessage: {
      marginRight: 15,
    },
    socials: {
      marginTop: 20,
    },
    stationTitle: {
      marginLeft: 0,
      marginTop: -10,
    },
    search: {
      borderWidth: 1,
      width: "70%",
      paddingLeft: 10,
    },
    uploadImageArea: {
      padding: "8%",
      //height: "22 or 60%",??
      borderWidth: 3,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    column: {
      marginLeft: 5,
      marginBottom: 3,
      marginTop: 3,
      marginRight: 5,
    },
    modal: {
      height: "100%",
      width: "100%",
    },
    nameInput: {
      marginTop: 20,
    },
    delete: {
      marginTop: 10,
    },
    indicator: {
      bottom: 20,
    },
    quiz: {
      width: "100%",
      height: "auto",
      marginBottom: 15,
      marginTop: 10,
      paddingBottom: 3,
    },
    chart: {
      height: 300,
      width: "100%",
    },
    pollHeader: {
      width: "100%",
      height: 315,
      minHeight: "30%",
      marginBottom: 50,
      marginTop: 9,
    },
    pollHeaderStyles: {
      // works with pollHeader but a refactor might be needed.
      width: "100%",
      height: 265,
      minHeight: 265,
      marginBottom: 0,
      marginTop: 0,
    },
    popUp: {
      padding: 20,
      borderRadius: 0,
      width: "70%",
      aspectRatio: 1.15,
    },
    headerTitle: {
      marginLeft: 20,
      marginBottom: 20,
    },
    completeTimelineSvg: {
      marginTop: 5,
    },
  },

  // HEADERS
  header: {
    primary: {
      marginBottom: 20,
      marginTop: 30,
    },
    secondary: {
      marginTop: 10,
      marginBottom: 10,
    },
    article: {
      marginTop: 25,
      marginBottom: 15,
    },
    contactUs: {
      marginBottom: 20,
    },
    full: {
      width: "100%",
    },
    box: {
      marginTop: 30,
      marginBottom: 10,
    },
    text: {
      marginTop: 15,
      marginBottom: 15,
      marginLeft: "auto",
      marginRight: "auto",
    },
    forgotPassword: {
      paddingLeft: 10,
    },
    deleteAccount: {
      marginTop: 40,
      marginLeft: 0,
      marginRight: 0,
    },
    greenBox: {
      marginBottom: 30,
      marginTop: -30,
    },
  },

  // TEXT
  text: {
    added: {
      marginBottom: 30,
      marginTop: 30,
    },
    article: {
      marginTop: 10,
    },
    articleTitle: {
      maxWidth: 230,
      top: 25,
      bottom: 20,
      left: 20,
    },
    customBottom: {
      paddingHorizontal: 20,
    },
    customTop: {
      marginLeft: 19.5,
    },
    dropdown: {
      marginRight: 5,
    },
    menuItem: {
      marginRight: "auto",
      //marginTop: 15, // removed for now, need to find the right one to use it in.
    },
    icon: {
      marginTop: 35,
    },
    greenBox: {
      height: 50,
      width: "100%",
      marginTop: 5,
      paddingHorizontal: 5,
    },
    greenBoxSecondMessage: {
      marginTop: -20,
    },
    detailView: {
      paddingTop: 13,
      height: 100,
      borderRadius: 1,
      marginTop: 0,
      marginRight: 35,
    },
    error: {
      marginTop: 5,
    },
    errorSignInUp: {
      marginTop: -10,
      marginBottom: 13,
      marginLeft: 2,
    },
    helperSignUp: {
      marginTop: -10,
      marginBottom: 13,
      marginLeft: 2,
    },
    dropdownError: {
      paddingTop: 20,
      paddingBottom: 40,
    },
    noProductFoundError: {
      paddingTop: 20,
      paddingBottom: 20,
      zIndex: 1,
      paddingLeft: 5,
      width: "100%",
    },
    delete: {
      marginLeft: 3,
    },
    uptainerAddress: {
      width: "70%",
      padding: 10,
      marginTop: 5,
    },
    productName: {
      marginTop: 5,
      marginBottom: 10,
      width: "100%",
    },
    stationName: {
      marginBottom: 10,
    },
    stationAddress: {
      width: "75%",
    },
    locationAddress: {
      marginBottom: 1,
      maxWidth: 300,
    },
    thankYou: {
      margin: 20,
    },
    distance: {
      width: "25%",
      marginTop: 5,
    },
    equivalent: {
      marginLeft: 5,
    },
    mostVisited: {
      marginBottom: 10,
    },
    signUpTertiary: {
      marginBottom: 10,
    },
    success: {
      margin: 20,
    },
    animated: {
      paddingBottom: 10,
      zIndex: 999,
      width: "100%",
      left: 0,
    },
    emailHeader: {
      marginBottom: 5,
      paddingLeft: 16,
    },
    emailInput: {
      marginBottom: 20,
      marginTop: 10,
    },
    description: {
      marginBottom: 20,
      marginTop: 20,
    },
    descriptionInput: {
      height: 100,
      borderWidth: 3,
      padding: 10,
    },
    descriptionForgotPass: {
      paddingLeft: 17,
      marginTop: 25,
    },
    noUptainer: {
      marginBottom: 50,
      maxHeight: 50,
      marginTop: 15,
    },
    itemsYourStats: {
      marginTop: 5,
    },
    itemsCO2: {
      marginLeft: 0,
      marginTop: 10,
    },
    co2Saved: {
      paddingTop: 9,
      height: 40,
      marginTop: 5,
      marginBottom: 40,
      paddingLeft: 10,
      width: "100%",
    },
    amountCO2: {
      marginBottom: -10,
    },
    upload: {
      marginLeft: 10,
    },
    galleryBottom: {
      marginLeft: 17,
      marginTop: 6,
    },
    locationName: {
      maxWidth: 300,
    },
    apology: {
      marginTop: 20,
      marginBottom: 20,
    },
    noAccess: {
      margin: 10,
    },
    changeCode: {
      marginBottom: 0,
    },
    language: {
      marginLeft: 0,
      marginBottom: 10,
    },
    dropdownOptional: {
      marginLeft: 5,
      marginTop: 5,
    },
    dropdownInput: {
      marginLeft: 5,
    },
    optional: {
      marginLeft: 5,
      marginBottom: 5,
    },
    hint: {
      MarginTop: 5,
      MarginLeft: 10,
      MarginBottom: 10,
    },
    quizQuestion: {
      marginTop: 13,
      marginBottom: 15,
      marginLeft: 8,
    },
    quizAnswer: {
      marginLeft: 5,
    },
    productsMatch: {
      marginTop: 5,
      marginBottom: 10,
    },
    descriptionDraftCard: {
      marginBottom: 10,
      marginLeft: 2,
    },
    pollQuestion: {
      marginTop: 8,
      marginBottom: 7,
      marginLeft: 15,
    },
    phone: {
      marginTop: 10,
    },
    leftTimelineSvg: {
      left: -10,
    },
    rightTimelineSvg: {
      right: -10,
    },
    itemsReused: {
      paddingTop: 9,
      height: 40,
      width: "100%",
      paddingLeft: 10,
      marginTop: 5,
    },
    greenBoxData: {
      marginLeft: 0,
      marginTop: 1,
    },
    greenBoxSecondData: {
      marginTop: 10,
    },
  },

  // LABELS
  label: {
    form: {
      marginLeft: 17,
      marginTop: 5,
      marginBottom: 10,
      marginRight: 5,
    },
    formContactUs: {
      marginLeft: 0,
      marginBottom: 10,
      marginTop: 5,
    },
    inputField: {
      marginLeft: 10,
      width: "85%",
      height: 40,
    },
    description: {
      marginBottom: 10,
      marginRight: "auto",
    },
    profileName: {
      marginLeft: 0,
    },
    email: {
      marginLeft: 0,
    },
    phone: {
      marginLeft: 0,
      marginRight: 5,
    },
    dropdown: {
      marginLeft: 0,
      marginTop: 15,
    },
    description: {
      marginLeft: 0,
      marginTop: 15,
    },
    image: {
      marginLeft: 0,
    },
  },

  // ITEMS
  item: {
    menu: {
      width: "100%",
      marginBottom: 15,
      marginLeft: "auto",
      marginRight: "auto",
      padding: 10,
      borderWidth: 4,
      marginTop: 10,
    },
    uptainer: {
      width: 110, // Set the width of each item
      height: 110,
      margin: 5,
    },
    uptainerDetails: {
      width: "47%",
      aspectRatio: 1,
      margin: 0,
    },
    new: {
      height: "100%",
      width: "100%",
      opacity: 0.7,
      zIndex: 1,
      elevation: 1,
    },
    last: {
      borderBottomWidth: 3,
    },
  },

  // LISTS
  list: {
    dropdown: {
      marginTop: 0,
      borderWidth: 4,
      borderTopWidth: 1,
    },
    dropdownItemPrimary: {
      padding: 10,
      borderBottomWidth: 1,
    },
    dropdownItemSecondary: {
      padding: 10,
      width: "100%",
      borderBottomWidth: 0,
      borderWidth: 3,
    },
    dropdownSearchField: {
      padding: 10,
      width: "100%",
    },
    termsConditions: {
      marginVertical: 20,
      paddingHorizontal: 20,
    },
    flat: {
      marginBottom: 5,
      marginTop: 5,
    },
  },

  // BOXES
  box: {
    input: {
      height: 45,
      width: "100%",
      padding: 10,
      marginLeft: "auto",
      marginRight: "auto",
      marginBottom: 15,
      borderWidth: 4,
      minHeight: 150,
    },
    link: {
      padding: 10,
      paddingTop: 10,
      paddingBottom: 10,
      marginVertical: 10,
      minHeight: 80,
    },
    error: {
      borderWidth: 3,
    },
    search: {
      zIndex: 1,
      marginTop: 50,
      width: "100%",
    },
    searchField: {
      zIndex: 1,
    },
    messageInputField: {
      minHeight: 150,
    },
    socialField: {
      marginTop: 3,
      marginBottom: 3,
      marginRight: "4%",
    },
    socialTextField: {
      marginTop: 10,
    },
    getInspired: {
      marginTop: 25,
      marginBottom: 10,
    },
    slide: {
      width: screenWidth,
      height: 120,
      marginTop: 15,
    },
    draftCard: {
      width: "100%",
      //height: "46.5%" // need to be updated later
      marginBottom: 10,
      borderWidth: 3,
      opacity: 0.8,
    },
  },

  // BANNERS
  banner: {
    error: {
      padding: 10,
      width: "100%",
      marginTop: 0,
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
    },
  },

  // BUTTONS
  button: {
    primary: {
      padding: 8,
      borderWidth: 4,
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      marginVertical: "4%",
      marginTop: 20,
      marginBottom: 10,
    },
    secondary: {
      padding: 8,
      borderWidth: 4,
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      marginVertical: "2%",
    },
    facebook: {
      padding: 10,
      width: "100%",
      marginTop: "8%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    google: {
      padding: 10,
      width: "100%",
      marginTop: "4%",
      marginBottom: 20,
      marginLeft: "auto",
      marginRight: "auto",
    },
    record: {
      borderRadius: 100,
      height: 80,
      width: 80,
    },
    gallery: {
      borderWidth: 2,
      borderRadius: 10,
      width: 50,
      height: 50,
    },
    sideBar: {
      marginBottom: 25,
    },
    send: {
      marginTop: 30,
    },
    back: {
      width: 40,
      height: 40,
      marginBottom: 10,
      paddingLeft: 25,
      marginRight: 10,
      marginLeft: 0,
    },
    backTermsConditions: {
      marginBottom: 10,
    },
    close: {
      padding: 3,
    },
    cancel: {
      marginTop: 30,
    },
    disabled: {
      opacity: 0.4,
    },
    accept: {
      marginBottom: 10,
    },
    confirm: {
      marginBottom: 12,
    },
    take: {
      marginTop: 20,
    },
    isTakenSavedDraft: {
      borderWidth: 2,
      width: "100%",
      marginBottom: 20,
    },
    delete: {
      marginTop: 50,
    },
    deleteDraft: {
      borderRadius: 0,
    },
    scan: {
      borderWidth: 1,
      width: "100%",
    },
    scanLater: {
      borderWidth: 2,
      width: "100%",
    },
    draftScan: {
      borderWidth: 1,
      marginLeft: 0,
      width: "104%",
      marginBottom: 30,
    },
    social: {
      borderRadius: 3,
      padding: 2,
      height: 35,
      width: 35,
    },
    colored: {
      width: "90%",
      height: 45,
      borderWidth: 1,
      shadowColor: "#000", // shadow for ios
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5, // shadow for Android
    },
    dropdown: {
      borderWidth: 3,
      padding: 10,
    },
    target: {
      width: "85%",
      height: 50,
      marginBottom: 10,
    },
    submit: {
      marginTop: 10,
    },
    logout: {
      marginTop: 20,
      marginBottom: 10,
    },
    quizAnswer: {
      padding: 7,
      marginLeft: 8,
      marginRight: 8,
      marginBottom: 15,
      borderWidth: 2,
    },
    pollOption: {
      padding: 7,
      margin: 12,
      borderWidth: 2,
      marginBottom: 8,
    },
    headerIcon: {
      width: 40,
      height: 40,
      marginLeft: 30, // For right button
    },
  },

  // ICONS
  icon: {
    profile: {
      padding: 5,
      marginBottom: 10,
      marginLeft: "auto",
      marginRight: "auto",
    },
    secondary: {
      marginTop: 10,
      marginBottom: 10,
      marginLeft: "auto",
      marginRight: "auto",
    },
    full: {
      width: "100%",
      height: "100%",
    },
    accountSettings: {
      marginBottom: 1,
    },
    checkmark: {
      borderWidth: 2,
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    cancel: {
      zIndex: 999,
      opacity: 0.7,
    },
    sheet: {
      padding: 20,
    },
    navbar: {
      size: 24,
    },
    backButton: {
      size: 20,
    },
    deleteDraft: {
      size: 30,
    },
    leftHeader: {
      size: 25,
    },
    rightHeader: {
      size: 30,
    },
    arrowRight: {
      size: 30,
    },
    housePhoneArrowRight: {
      size: 50,
    },
  },

  // IMAGES
  image: {
    full: {
      width: "100%",
      height: "100%",
    },
    article: {
      right: 23,
      marginLeft: "1%",
      marginRight: "1%",
    },
    galleryButton: {
      width: 50,
      height: 50,
    },
    detailView: {
      height: 300,
      width: "100%",
      marginTop: 20,
    },
    stationDetail: {
      width: "100%",
      height: screenHeight * 0.45,
    },
    uploadSize: {
      padding: 50,
      borderWidth: 3,
      height: screenHeight / 4.5,
    },
    customMarker: {
      width: 20,
      height: 20,
      resizeMode: "contain",
    },
    searchedItem: {
      marginTop: 10,
      marginRight: 10,
      width: 100,
      height: 100,
    },
    draftCard: {
      // width: windowWidth / 2.4,
      // height: windowHeight / 3.06,
    },
  },

  // SVG
  svg: {
    phone: {
      top: -55,
      right: 187.9,
    },
  },

  // CAMERA
  camera: {
    aspectRatio: 9 / 16,
  },

  // LINKS
  link: {
    forgetPass: {
      marginTop: 15,
    },
    productTaken: {
      marginTop: 10,
    },
  },

  // ANIMATION:
  animation: {
    quiz: {
      zIndex: 1,
    },
  },

  // MARGINS (This part is for specific margin styles added in different screens and components.)
  margin: {
    add: {
      marginLeft: 8,
      marginRight: 8,
    },
    scrollView: {
      marginTop: 50,
      minHeight: 100,
      marginBottom: 50,
    },
    writtenPlaceholder: {
      marginTop: 10,
      marginBottom: 10,
    },
    detailViewProduct: {
      marginBottom: 4,
    },
    detailViewLocation: {
      marginTop: 5,
    },
    addressInfo: {
      marginBottom: 10,
    },
    stationDetailTitle: {
      marginTop: 10,
    },
    statHeaderText: {
      marginLeft: 0,
    },
    uptainerYourStats: {
      marginBottom: 10,
    },
    nameOptional: {
      marginBottom: 5,
    },
    phoneOptional: {
      marginLeft: 0,
      marginBottom: 5,
    },
    chooseAction: {
      marginTop: 20,
      marginBottom: 30,
    },
    settingsOptions: {
      marginTop: 40,
    },
  },

  // CHARTS
  chart: {
    stats: {
      height: 285,
    },
    poll: {
      grid: {
        top: 0,
        width: "100%",
        bottom: 0,
        left: 20,
        right: 0,
      },
      yAxis: {
        axisLabel: {
          padding: [0, 0, 45, -7],
        },
      },
      series: {
        itemStyle: {
          height: 10,
        },
        barWidth: 20,
        barBorderRadius: [0, 0, 0, 0],
        label: {
          position: "outsideRight",
          offset: [250, -22],
        },
        itemStyleSilent: {
          height: 10,
        },
      },
    },
  },

  // WIDTHS (This part is for specific width styles added in different screens and components.)
  width: {
    detailViewInfo: {
      width: "48%",
    },
    landingScreenMainButton: {
      width: "88.9%",
    },
    housePhoneText: {
      width: "80%",
    },
    buttonPlacer: {
      width: "48%",
    },
    full: {
      width: "100%",
    },
    none: {
      width: 0,
    },
  },

  // HEIGHTS (This part is for specific height styles added in different screens and components.)
  height: {
    full: {
      height: "100%",
    },
    none: {
      height: 0,
    },
  },

  // MISCELLANEOUS
  misc: {
    separator: {
      height: 1,
      width: "100%",
    },
    divider: {
      borderWidth: 1,
      marginVertical: 20,
      height: 3,
      marginTop: 40,
      marginBottom: 30,
    },
    detailDivider: {
      width: "48%",
    },
    topSpacer: {
      paddingTop: 50,
      marginTop: 40,
    },
    spacer: {
      marginBottom: 20,
    },
    indicator: {
      width: 10,
      height: 10,
      borderRadius: 10,
      marginHorizontal: 3,
      borderWidth: 2.0,
    },
    visible: {
      opacity: 1,
    },
    invisible: {
      opacity: 0,
    },
    iconActiveOpacity: {
      activeOpacity: 0.9,
    },
    greenBoxBG: {
      paddingTop: 0,
      width: "100%",
      paddingHorizontal: 5,
    },
    boxLinkMinHeight: 80,
  },
};
