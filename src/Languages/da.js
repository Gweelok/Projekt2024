export default {
  SignUpScreen: {
    Signup: "Opret Bruger",
    password: "Kodeord",
    passwordmsg: "min. otte tegn",
    LogInLink: "Har du allerede en bruger",
  },
  LandingScreen: {
    LanguageSelector: "English",
    Header: "Velkommen til Updropp",
    Intro:
      "Updropp gør affald til ressourcer, ved at muliggøre direkte genbrug og mobilisering af elektronik i lokalsamfundet.",
    Littlemsg: "Ved at trykke fortsæt accepterer du vores",
    Termsandcond: "brugervilkår",
    continue: "Fortsæt",
  },
  LogoutConfirmation: {
    confirmMessage: "Er du sikker på at du vil logge ud?",
    logoutButton: "Log ud",
    cancelButton: "Annullér",
  },
  Profile: {
    logout: "Log ud",
  },
  SignInScreen: {
    Headline: "Log ind",
    Button: "Log ind",
    ForgetPwHint: "Glemt dit kodeord?",
    SignUpHint: "Har du ikke en bruger? Opret her.",
    validemail:"Indtast venligst en gyldig e-mail.",
    fields:"Felter må ikke være tomme.",
    passwordmsg:"Dit kodeord skal være på mindst 8 tegn."
  },

  CustomInput: {
    hint: "valgfri",
  },

  NotificationsScreen: {
    Header: "Notifikationer",
  },

  AccountSettingsScreen: {
    Header: "Kontoindstillinger",
    BackButton: "Tilbage",
    Name: "Navn",
    Email: "E-mail",
    Tlf: "Tlf",
    Submit: "Gem",
    ChangeCode: "Skift kode",
    Delete: "Slet konto",
    Optional: "valgfri",
    HandleSave: "Oplysningerne er gemt",
    HandleDeleteAccount: "Konto er slettet",
    Language: "Sprog",
  },
  DeleteAccount: {
    Header: "Er du sikker på at du vil slette din konto?",
    MainButton: "Slet min konto",
    SecondaryButton: "Annullér",
  },
  MySettingsScreen: {
    Header: "Mine indstillinger",
  },

  ChangePasswordScreen: {
    Header: "Skift kodeordl",
    SavePassword: "Gem kodeord",
    CurrentPassword: "Nuvarende kodeord",
    NewPassword: "Nyt kodeord",
    ConfirmPassword: "Bekraft nyt kodeord",
    PasswordMatchError: "Nuværende adgangskode og ny adgangskode kan ikke være det samme.",
    PasswordMismatchError: "Ny adgangskode og Bekræft ny adgangskode stemmer ikke overens.",
    PasswordLengthError: "Adgangskoden skal være på mindst 8 tegn.",
    PasswordChanged: "Adgangskoden blev ændret. Du vil blive omdirigeret til at logge ind.", //IN COLLABORATION WITH GOOGLE TRANSLATE PLS A NATIVE SPEAKER DOUBLE CHECK IT :D
    CurrentPasswordError: "Nuværende adgangskode er ikke korrekt.", //IN COLLABORATION WITH GOOGLE TRANSLATE PLS A NATIVE SPEAKER DOUBLE CHECK IT :D
    PasswordUpdateError: "Der opstod en fejl under opdatering af adgangskoden. Prøv igen!", //IN COLLABORATION WITH GOOGLE TRANSLATE PLS A NATIVE SPEAKER DOUBLE CHECK IT :D
  },

  MyDraftsScreen: {
    Header: "Mine Kladder",
    closeButtonTitle: "Slet kladde",
    closeButtonAsking: "Er du sikker på at du vil slette denne kladde?",
    closeButtonAnswerYes: "Slet kladde",
    closeButtonAnswerNo: "Annullér",
  },
  DescriptionField: {
    label: "Beskrivelse",
    placeholder: "Beskrivelse her..."
  },

  ImageUpload: {
    chooseImage: "Vælg billede"
  },

  CategoryDropdown: {
    selectCategory: "Kategori",
    placeholder: "Vælg kategori"
  },

  ProductDropdown: {
    selectProduct: "Produkt",
    placeholder: "Vælg produkt"
  },

  BrandDropdown: {
    selectBrand: "Mærke",
    placeholder: "Vælg mærke"
  },

  ModelDropdown: {
    selectModel: "Model",
    placeholder: "Vælg model"
  },

  ConditionDropdown: {
    selectCondition: "Stand",
    placeholder: "Vælg stand"
  },

  ProfileScreen: {
    ProfilePage: "Rediger profil",
    MySettings: "Mine indstillinger",
    MyDrafts: "Mine kladder",
    DataPolicy: "Datapolitik",
    ContactUs: "Kontakt os",
  },

  UpdroppForm: {
    title: "Updropp",
    uploadText: "Tilføj billede",
    informativeText:
      "For at updroppe genstanden skal du scanne QR-koden på Uptaineren ved aflevering. Hvis du har udfyldt oplysningerne uden at være med Uptaineren, kan du gemme en kladde ved at trykke 'Scan senere'",
    scanLaterButton: "SCAN SENERE",
    scanButton: "UPDROPP",
    addDraft: "Tilføj kladde",
    viewUptainers: "Se nærmeste Uptainer",
    draftSavedtext: "Din kladde er nu gemt",
    noData: "Udfyld venligst alle de nødvendige oplysninger ovenfor",
    camera: "Kamera",
    gallery: "Galleri",
    chooseAction: "Vælge en handling",
  },

  ProblemComponent: {
    Header: "Problemet",
    Body: "Der bruges en masse af jordens værdifulde råmaterialer på at producere elektronik. Og mange af disse ressourcer, går til spilde, fordi alt for meget elektronik bliver smidt ud før tid.",
  },
  SolutionComponent: {
    Header: "Løsningen",
    Body: "Uptainers giver nyt liv til elektroniske produkter, ved at hjælpe dem med at flytte fra ét hjem til et andet.",
    Bottom: {
      firstHalf: "Brugsfase",
      secondHalf: "Ny Brugsfase",
    },
  },
  QrScannerScreen: {
    Scan: "Scan for at Updroppe",
    Header: "Placér QR-koden inden for rammen for at aflæse",
    Bottom:
      "Hvis ikke du er ved Uptaineren, skal du lukke QR-scanneren og trykke på knappen 'scan senere",
    Error: "Fejl",
    ErrorMsg1: "Der opstod en fejl under lagring af QR-koden.",
    ScanAgain: "Scan Igen?",
    SaveCode: "Tag",
    Success: "Success",
    QRCodeSavedSuccessfully: "QR-koden blev gemt.",
    OK: "OK",
  },
  ProductUpdroppedAlert: {
    productUpdropped: "Produktet er nu Updroppet",
  },
  SolutionTimeline: {
    Header: "Løsningen",
    Body: "På den måde forlænger vi elektronikkens levetid og styrker den cirkulære økonomi",
    Bottom: {
      first: "0 ar",
      second: "5 ar",
      third: "10 ar",
    },
  },
  StationsScreen: {
    showProduct: "Vis produkter",
    showWay: "Vis vej",
  },
  ProductIsTakenScreen: {
    apology:
      "Vi beklager hvis du er gået forgæves efter et produkt som allerede er target. Folk kan komme tage et produkt uden at registrere det. Vil du registere produktet som taget?",
    takenButton: "Produktet er taget",
    productNotListed: "Var produktet ikke i Uptaineren?",
  },

  ProductTakenScreen: {
    mainText:
      "Produktet er nu taget. Tak fordi du sparer på Jordens ressourcer",
    button: "Forside",
  },

  ContactUs: {
    Header:'Kontakt os',
    Name: "Navn",
    Topic: "Emne",
    Message: "Besked",
    SendMessage: "Send besked",
    TextOnTheTop:"Send os en besked via kontaktformularen. Vi svarer på din tilknyttede mail.",
  },

  thankYouScreen: {
    header:
      "Tak for at gøre os opmærksomme på dette. Vi vil tjekke op på det og registrere ændringen til Uptaineren",
  },

  ArticleSlider: {
    header: "Læs også"
  },

  ArticleScreen:{
    Written:"Skrevet: XX/XX/XXXX",
    Subheadline:"Underoverskrift",

  },


  ForgotPasswordScreen: {
    Header: "Glemt kodeord",
    Description: "Skriv den mail du har tilknyttet til appen, så sender vi en mail med et link til nulstilling af kodeord.",
    SendLinkButton: "Send link"
},
  

};

