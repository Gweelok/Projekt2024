
export default {
  SignUpScreen: {
    Signup: "Sign up",
    password: "Password",
    passwordmsgUP: "Minimum 8 characters",
    LogInLink: "Already have an account? Sign in.",
    validemail: "Please enter a valid email",
    fields: "Fields cannot be empty.",
  },
  LandingScreen: {
    LanguageSelector: "Danish",
    Header: "Welcome to Updropp",
    Intro:
      "Updropp turns waste into a resource by enabling direct reuse and mobilization of electronic devices in local communities.",
    Littlemsg: "By pressing continue, you accept our",
    Termsandcond: "Terms and Conditions",
    continue: "Continue",
  },
  LogoutConfirmation: {
    confirmMessage: "Are you sure you want to log out?",
    logoutButton: "Log Out",
    cancelButton: "Cancel",
  },
  Profile: {
    logout: "Log Out",
  },
  SignInScreen: {
    Headline: "Sign in",
    Button: "Sign in",
    ForgetPwHint: "Forgot password?",
    SignUpHint: "Don't have an account? Sign up.",
    validemail: "Please enter a valid email.",
    fields: "Fields cannot be empty.",
    passwordmsg: "Your password must be at least 8 characters long.",
  },

  ProfileScreen: {
    ProfilePage: "Edit Profile",
    MySettings: "My Settings",
    MyDrafts: "My Drafts",
    DataPolicy: "Data Policy",
    ContactUs: "Contact Us",
  },

  UpdroppForm: {
    title: "Updropp",
    uploadText: "Add image",
    informativeText:
      "Once you have filed in the Updropp form, scan the QR code on the Uptainer to drop off your item. If you have filed in the Updropp form beforehand, you can save a draft by clicking on the “Scan Later” button.",
    scanLaterButton: "SCAN LATER",
    scanButton: "UPDROPP",
    addDraft: "Add draft",
    viewUptainers: "View Uptainers nearby",
    draftSavedtext: "Your draft is now saved",
    noData: "Please fill all the required information",
    camera: "Camera",
    gallery: "Gallery",
    chooseAction: "Choose an Action",
    maxDraft:"You can't exceed 15 draft items"
  },
  CustomInput: {
    hint: "optional",
  },

  DescriptionField: {
    label: "Description",
    placeholder: "Enter description here...",
  },

  MyDraftsScreen: {
    Header: "My Drafts",
    closeButtonTitle: "Delete draft",
    closeButtonAsking: "Are you sure you want to delete this draft?",
    closeButtonAnswerYes: "Delete draft",
    closeButtonAnswerNo: "Cancel",
  },

  ImageUpload: {
    chooseImage: "Choose image",
  },

  CategoryDropdown: {
    selectCategory: "Category",
    placeholder: "Choose category",
  },

  BrandDropdown: {
    selectBrand: "Brand",
    placeholder: "Choose brand",
  },

  ModelDropdown: {
    selectModel: "Model",
    placeholder: "Choose model",
  },

  ConditionDropdown: {
    selectCondition: "Condition",
    placeholder: "Choose condition",
  },
  ProductDropdown: {
    selectProduct: "Product",
    placeholder: "Choose product",
  },

  NotificationsScreen: {
    Header: "Notifications",
  },
  AccountSettingsScreen: {
    Header: "Account Settings",
    BackButton: "Back",
    Name: "Name",
    Email: "E-mail",
    Tlf: "Phone number",
    Submit: "Save",
    ChangeCode: "Change password",
    Delete: "Delete account",
    Optional: "optional",
    Saved: "Information saved",
    EmailExist: "Email is already in use",
    HandleDeleteAccount: "Account deleted",
    Language: "Language",
    InvalidEmail:"The provided email address is invalid.",
    InvalidName:"The name provided is invalid.",
    InvalidPhone:"The phone number provided is invalid.",
    Error:"An error occurred during updating the settings. Please try again!"
  },
  DeleteAccount: {
    Header: "Are you sure you want to delete you account?",
    MainButton: "Delete my account",
    SecondaryButton: "Cancel",
  },
  MySettingsScreen: {
    Header: "My Settings",
  },
  ChangePasswordScreen: {
    Header: "Change Password",
    SavePassword: "Save Password",
    CurrentPassword: "Current Password",
    NewPassword: "New Password",
    ConfirmPassword: "Confirm New Password",
    CurrentPasswordMatchError: "Current password is incorrect.",
    PasswordMatchError: "Current password and new password cannot be the same.",
    PasswordMismatchError:"New Passwords don't match.",
    PasswordLengthError: "Password must be at least 8 characters long.",
    PasswordChanged:"Password changed successfully.",
    PasswordUpdateError:"An error occurred during updating the password. Please try again!",
  },

  ProblemComponent: {
    Header: "The Problem",
    Body: "A lot of natural resources are used for the production of electronic devices. And many of these resources are wasted because electronic devices are often thrown out before the end of their lifespan.",
  },
  QRScanner: {
    Header: "Place the QR-code inside the frame to read it",
    Bottom:
        "You have to be near the Uptainer to be able to take an item",
    Error: "Error",
    ErrorMsg1: "An error occurred while saving the QR Code.",
    ScanAgain: "Scan Again?",
    QRCodeNotFound1: "QR Code not found,so click on Tag to save to draft instead.",
    QRCodeNotFound: "QR Code not found, saved to draft instead.",
    SaveCode: "Updropp",
    Take: "Take",
    Success: "Success",
    QRCodeSavedSuccessfully: "QR Code saved successfully.",
    OK: "OK",
  },
  TakeQRScanner: {
    Scan: "Scan to Take",

  },
  AddQRScanner: {
    Scan: "Scan to Updropp",

  },
  SolutionComponent: {
    Header: "The Solution",
    Body: "The Uptainers give a new life to electronic devices by helping them find a new home.",
    Bottom: {
      firstHalf: "Use Phase",
      secondHalf: "New Use Phase",
    },
  },
  ProductUpdroppedAlert: {
    productUpdropped: "The product has been Updropped",
  },
  SolutionTimeline: {
    Header: "The Solution",
    Body: "This way, we extend the lifespan of the devices and strengthen the circular economy",
    Bottom: {
      first: "0 years",
      second: "5 years",
      third: "10 years",
    },
  },
  StationsScreen: {
    showProduct: "Show product",
    showWay: "Show the way",
    NoUptainers: "No Uptainer is matching your search.",
  },
  ProductIsTakenScreen: {
    apology:
      "We apologize if you have searched for a product that was already taken. People can often come and take them without registering. Do you want to mark the product as taken?",
    takenButton: "Product has been taken",
    productNotListed: "Couldn't find the product at the Uptainer?",
  },



  ContactUs: {
    Header: "Contact us",
    Name: "Name",
    Topic: "Topic",
    Message: "Message",
    SendMessage: "Send message",
    TextOnTheTop:
      "Send us a message through the contact form. We will answer on your associated mail.",
  },

  thankYouScreen: {
    header:
      "Thanks for informing us. We will check up on this and update the Uptainer",
  },

  ArticleSlider: {
    header: "Read also",
  },

  ArticleScreen: {
    Written: "Written at: XX/XX/XXXX",
    Subheadline: "Subheadline",
  },

  ForgotPasswordScreen: {
    Header: "Forgot password",
    Description:
      "Input your associated mail, to receive a link for resetting your password",
    SendLinkButton: "Send link",
  },

  DropdownScreen: {
    Category: "Search for category...",
    Product: "Search for product...",
    Model: "Search for model...",
    Brand: "Search for brand...",
    Condition: "Condition of the product",
    Text: "You can elaborate on the condition of the item in the description field.",
  },

  months: {
    may: "May",
    October: "Oct",
  },

  StatsPage: {
    Header: "Impact",
    MainButton: "Overall",
    SecondaryButton: "Yours",
    AmountReduced: "Amount of reused items",
    InTotal: "In total",
    SoFar: "So far today",
    AmountCO2: "Amount of CO2 saved",
    Yesterday: "Yesterday",
    CO2Equivalent: "CO2 is equivalent to",
    CO2AmountBefore:"So",
    CO2Amount:"is equivalent to",
    Fact_equavalent: "loads of washing and drying",
    BestAcheieve: "Best achieving Uptainers this month",
    MostVisitedUptainer: "Most visited Uptainer",
    MyMostVisitedUptainer: "Your most visited Uptainer",
    MyMostVisitedUptainers: "Your most visited Uptainers",
    ItemsReused: "Items reused",
    Visits: "Visits",
    CO2Save: " CO2 Saved",
    Comunity: "The sustainable community building",
    Info: "Learn how we get our information here",
    ItemsDonated: "Items donated",
    ItemsCollected: "Items collected",
    Overview: "Go to the overview of your items",
    Social: "Share your impact with your friends",
    GetInspired: "Get inspired",
  },
  Detailviews: {
    product: "Was the product not at the Uptainer?",
    take: "Take",
  },
  SearchField: {
    mapPlaceholder: "Find Uptainer",
    productPlaceholder: "Find product",
    notProductFound: "There are currently no Uptainers with that product. Please try again another day.",
    notMatchingProduct: "No products match your search.",
  },

  QuizQuestions: {
    Quiz1Question1: "What is climate change?",
    Quiz1Option1: "A) The planet's changing weather patterns",
    Quiz1Option2: "B) Earth's warming due to pollution",
    Quiz1Option3: "C) Global warming caused by human actions",
  },
  PollQuestions: {
    Poll1Question1:
      "How many electronic devices have you bought the last year?",
  },
  SearchHome: {
    productsMatch: "products match your search."
  },
  LocationPermission:{
    error:"Location permission denied. Please grant permission to access your location to use this feature"
  }
};