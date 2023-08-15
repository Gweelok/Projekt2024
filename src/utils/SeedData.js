//Categories
export const categories = [
    "Hi-fi equipment","Kitchen machines","Household machines","Tablet, smartphones, computers + equipment","Tv and game consoles",
    ];
    
    //Brands
    export const brands = [
    "Marshall","Focal","JBL","Pioneer DJ","Sony","Yamaha","Logitech","Bose","Sennheiser","Audio-Technica",
    "American Audio","Argon TT-2","Audio Consulting","Cobra","Uniden","Galaxy","Midland","Crown Audio","Niles",
    "McIntoch","NAD Electronics","LG","Cuisinart","Hamilton Beach","Shark Ninja","Kitchen Aid","Wolf Gourmet",
    "Ninja","Oster","Magic Bullet","Black & Decker","Breville","De'Longhi","Alessi","Ariete","Beem","Bialetti",
    "Cosori","Bodum Bistro","Miele","Dyson","Bosch","Philips","Roborock","Blaupunkt","IRobot","Xiaomi","Bissell",
    "Samsung","Hoover","Vileda","Apple","Amazon","Lenovo","Alienware","Dell","Acer","HP","Asus","Microsoft",
    "SteelSeries","Razer","Zowie","Roccat","TCL","Toshiba","Vizio","Sega","Nintendo","PlayStation","Xbox",
    "Corsair","Panasonic",""
    ];
    
    //Uptainers
    export const stationData = [{
        uptainerName: "Det Bæredygtige Forsamlingshus",
        uptainerQR: "https://www.google.com",
        uptainerStreet: "Stockflethsvej 2",
        uptainerZip: "2000",
        uptainerCity: "Frederiksberg",
        uptainerImage: "UPT1.jpg",
        uptainerDescription: "I nærheden af Det Bæredygtige Forsamlingshus",
        uptainerLat: "5.568.602.042.503.860",
        uptainerLong: "12.519.641.697.795.900",
    },
    {
        uptainerName: "KU Lighthouse",
        uptainerQR: "https://www.google.com",
        uptainerStreet: "Tagensvej 16A",
        uptainerZip: "2200",
        uptainerCity: "Nørrebro",
        uptainerImage: "UPT2.jpg",
        uptainerDescription: "I nærheden af KU Lighthouse",
        uptainerLat: "5.569.794.725.285.910",
        uptainerLong: "12.560.119.055.467.000",
    },
    {
        uptainerName: "COOP 365",
        uptainerQR: "https://www.google.com",
        uptainerStreet: "Vigerslev Allé 124",
        uptainerZip: "2500",
        uptainerCity: "Valby",
        uptainerImage: "UPT2.jpg",
        uptainerDescription: "I nærheden af COOP 365",
        uptainerLat: "5.566.131.743.680.190",
        uptainerLong: "1.250.583.269.168.790",
    }];
    
    
    //Products
    export const products = [
        {
          id: 1,
          catId: 1,
          name: "Speakers",
          co2Footprint: 10,
        },
        {
          id: 2,
          catId: 1,
          name: "Bluetooth speakers",
          co2Footprint: 15,
        },
        {
          id: 3,
          catId: 1,
          name: "Headset and Headphones",
          co2Footprint: 20,
        },
        {
          id: 4,
          catId: 1,
          name: "Turntable",
          co2Footprint: 30,
        },
        {
          id: 5,
          catId: 1,
          name: "Radio",
          co2Footprint: 50,
        },
        {
          id: 6,
          catId: 1,
          name: "Amplifier",
          co2Footprint: 40,
        },
        {
          id: 7,
          catId: 1,
          name: "Stereo",
          co2Footprint: 80,
        },
        {
          id: 8,
          catId: 2,
          name: "Foodprocessor",
          co2Footprint: 40,
        },
        {
          id: 9,
          catId: 2,
          name: "Mixer",
          co2Footprint: 20,
        },
        {
          id: 10,
          catId: 2,
          name: "Blender",
          co2Footprint: 30,
        },
        {
          id: 11,
          catId: 2,
          name: "Juicer",
          co2Footprint: 40,
        },
        {
          id: 12,
          catId: 2,
          name: "Coffee maker",
          co2Footprint: 40,
        },
        {
          id: 13,
          catId: 2,
          name: "Electric kettle",
          co2Footprint: 20,
        },
        {
          id: 14,
          catId: 3,
          name: "Vacuum cleaner",
          co2Footprint: 50,
        },
        {
          id: 15,
          catId: 3,
          name: "Robot vacuums",
          co2Footprint: 100,
        },
        {
          id: 16,
          catId: 3,
          name: "Steam mop",
          co2Footprint: 10,
        },
        {
          id: 17,
          catId: 4,
          name: "Tablet",
          co2Footprint: 250,
        },
        {
          id: 18,
          catId: 4,
          name: "Smartphone",
          co2Footprint: 100,
        },
        {
          id: 19,
          catId: 4,
          name: "Laptop",
          co2Footprint: 300,
        },
        {
          id: 20,
          catId: 4,
          name: "Desktop computer",
          co2Footprint: 450,
        },
        {
          id: 21,
          catId: 4,
          name: "Computer screen",
          co2Footprint: 150,
        },
        {
          id: 22,
          catId: 4,
          name: "Keyboard",
          co2Footprint: 60,
        },
        {
          id: 23,
          catId: 4,
          name: "Computer mouse",
          co2Footprint: 20,
        },
        {
          id: 24,
          catId: 5,
          name: "Flatscreen tv (not smart)",
          co2Footprint: 200,
        },
        {
          id: 25,
          catId: 5,
          name: "Smart tv",
          co2Footprint: 300,
        },
        {
          id: 26,
          catId: 5,
          name: "Gaming console",
          co2Footprint: 250,
        },
      ];
    
    //items
    //Naming the ID's must be on point or it wont work
    export const items = [{
        categoryId: "Hi-fi equipment", //1
        productId: "Speakers",//1
        brandId: "Marshall",//1
        modelId: "Action II",//1
        itemCondition: 1,//(new)
        itemImage: "product1.jpeg",
        itemDescription: "Great speaker",
        UptainerId: "Det Bæredygtige Forsamlingshus",//1
    },{
        categoryId: "Kitchen machines", //2
        productId: "Mixer", //9
        brandId: "Kitchen Aid", //32
        modelId: "",
        itemCondition: 4,   //smaller defects
        itemImage: "product2.jpeg",
        itemDescription: "It is running very slowly",
        UptainerId: "Det Bæredygtige Forsamlingshus", //1
    },{
        categoryId: "Household machines", //3
        productId: "Vacuum cleaner", //14
        brandId: "Dyson", //54
        modelId: "",
        itemCondition: 3,   //(worn but working)
        itemImage: "product3.jpeg",
        itemDescription: "It is old but okay",
        UptainerId: "Det Bæredygtige Forsamlingshus", //1
    },{
        categoryId: "Tablet, smartphones, computers + equipment", //4
        productId: "Keyboard", //22
        brandId: "", 
        modelId: "",
        itemCondition: 2,   //(good but used)
        itemImage: "product4.jpeg",
        itemDescription: "",
        UptainerId: "KU Lighthouse", //2
    },{
        categoryId: "Tv and game consoles", //5
        productId: "Smart tv", //9
        brandId: "Philips", //32
        modelId: "",
        itemCondition: 2,   //(good but used)
        itemImage: "product5.jpeg",
        itemDescription: "I bought a new one",
        UptainerId: "KU Lighthouse", //2
    },{
        categoryId: "Hi-fi equipment", //1
        productId: "Headset and Headphones", //9
        brandId: "Sony", //10
        modelId: "",
        itemCondition: 5,   //(broken)
        itemImage: "product6.jpeg",
        itemDescription: "I guess there is a loose connection",
        UptainerId: "KU Lighthouse", //2
    },{
        categoryId: "Kitchen machines", //2
        productId: "Foodprocessor", //8
        brandId: "Shark Ninja", //31
        modelId: "",
        itemCondition: 2,   //(Used but good)
        itemImage: "product7.jpeg",
        itemDescription: "Shark Ninja foodprocessor",
        UptainerId: "COOP 365", //3
    },{
        categoryId: "Household machines", //3
        productId: "Steam mop", //9
        brandId: "Vileda", //32
        modelId: "",
        itemCondition: 5,   //(broken)
        itemImage: "product8.jpeg",
        itemDescription: "It won't steam anymore",
        UptainerId: "COOP 365", //3
    },{
        categoryId: "Tablet, smartphones, computers + equipment", //2
        productId: "Smartphone", //9
        brandId: "Apple", //32
        modelId: "",
        itemCondition: 4,   //(smaller defects)
        itemImage: "product9.jpeg",
        itemDescription: "Screen is broken",
        UptainerId: "COOP 365", //3
    }
    ];
    
    export const models =[ 
        {
            name: "Action II",
        },
        {
            name: "",
        },];
    
    