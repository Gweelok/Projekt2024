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
        uptainerImage: "UPT3.jpg",
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
        },
{
    name: "Krups 10-Cup Coffee Maker (Model: KM785D50)",
},
{
    name: "Krups 12-Cup Programmable Coffee Maker (Model: KM785D50)",
},
{
    name: "Krups Espresso Machine (Model: XP344C51)",
},
{
    name: "Krups Single Serve Coffee Maker (Model: KM202850)",
},
{
    name: "Krups Coffee and Spice Grinder (Model: GX4100)",
},
{
    name: "Krups Cool Touch Electric Kettle (Model: BW442D50)",
},
{
    name: "Krups Precision Temperature Electric Kettle (Model: BW3140)",
},
{
    name: "Krups Savoy Electric Kettle (Model: BW442D50)",
},
{
    name: "Krups Cordless Electric Kettle (Model: BW3110)",
},
{
    name: "Krups Stainless Steel Electric Kettle (Model: BW730D50)",
},
{
    name: "Smeg 50's Retro Style Food Processor",
},
{
    name: "Smeg DFP14BSS 14-Cup Food Processor",
},
{
    name: "Smeg SMF02 Stand Mixer with Food Grinder Accessory",
},
{
    name: "Smeg SMF03 Stand Mixer with Pasta Roller Accessory",
},
{
    name: "Smeg SMF03 Stand Mixer with Food Grinder Accessory",
},
{
    name: "Smeg SMF03 Stand Mixer with Citrus Juicer Accessory",
},
{
    name: "Smeg SMF03 Stand Mixer with Grater/Slicer/Shredder Accessory",
},
{
    name: "Smeg HBF01 Hand Blender with Chopper Accessory",
},
{
    name: "Smeg BLF01BLUS 50's Retro Style Blender",
},
{
    name: "Smeg BLF01CRUS 50's Retro Style Blender",
},
{
    name: "Smeg BLF01PKUS 50's Retro Style Blender",
},
{
    name: "Smeg BLF01PGUS 50's Retro Style Blender",
},
{
    name: "Smeg BLF01RDUS 50's Retro Style Blender",
},
{
    name: "Smeg BLF01SVUS 50's Retro Style Blender",
},
{
    name: "Smeg BLF01PGUK 50's Retro Style Blender",
},
{
    name: "Smeg BLF01RDUK 50's Retro Style Blender",
},
{
    name: "Smeg BLF01SVUK 50's Retro Style Blender",
},
{
    name: "Smeg CJF01 Citrus Juicer",
},
{
    name: "Smeg SJF01 Slow Juicer",
},
{
    name: "Smeg CJF01PBUK Retro Style Citrus Juicer",
},
{
    name: "Smeg SJF01PBUK Retro Style Slow Juicer",
},
{
    name: "Smeg CJF01BLEU Retro Style Citrus Juicer",
},
{
    name: "Smeg DCF02 drip coffee maker",
},
{
    name: "Smeg ECF01 espresso machine",
},
{
    name: "Smeg CGF01 grinder",
},
{
    name: "Smeg CMS6451X built-in coffee machine",
},
{
    name: "Smeg KLF032",
},
{
    name: "Smeg KLF043",
},
{
    name: "Smeg KLF014",
},
{
    name: "Smeg KLF055",
},
{
    name: "Smeg KLF03CRUS",
},
{
    name: "Dash Chef Series 14-Cup Food Processor",
},
{
    name: "Dash Deluxe 12-Cup Food Processor",
},
{
    name: "Dash Everyday Mini Food Processor",
},
{
    name: "Dash Go Everyday Mini Food Processor",
},
{
    name: "Dash Express Mini Food Processor",
},
{
    name: "Dash Stand Mixer",
},
{
    name: "Dash Everyday 3-Speed Hand Mixer",
},
{
    name: "Dash Smart Store Compact Hand Mixer",
},
{
    name: "Dash Go Everyday Mixer",
},
{
    name: "Dash Masha 2X Hand Blender and Potato Masher",
},
{
    name: "Dash Chef Series Digital Blender",
},
{
    name: "Dash Chef Series 64 oz Blender",
},
{
    name: "Dash Chef Series Power Blender",
},
{
    name: "Dash Arctic Chill Blender",
},
{
    name: "Dash Go Sport Blender",
},
{
    name: "Dash Go Everyday Blender",
},
{
    name: "Dash Citrus Juicer",
},
{
    name: "Dash Go Dual Citrus Juicer",
},
{
    name: "Dash Premium Juicer",
},
{
    name: "Dash Go Deluxe Compact Power Juicer",
},
{
    name: "Dash Express Coffee Maker",
},
{
    name: "Dash Cold Brew Coffee Maker",
},
{
    name: "Dash One Cup Coffee Maker",
},
{
    name: "Dash Compact Cold Brew Coffee Maker",
},
{
    name: "Dash 1.7L Electric Kettle",
},
{
    name: "Dash Stainless Steel Rapid Kettle",
},
{
    name: "Dash Go Everyday Electric Kettle",
},
{
    name: "Dash Express Hot Pot Electric Kettle",
},
{
    name: "DeLonghi DFP950 Die-Cast Food Processor",
},
{
    name: "DeLonghi MultiFry FH1363 Food Processor",
},
{
    name: "DeLonghi PrimaDonna Exclusive ESAM 6900 Coffee Machine (includes a food processor attachment)",
},
{
    name: "DeLonghi Distinta Electric Stand Mixer",
},
{
    name: "DeLonghi MultiFry FH1363 Food Processor",
},

{
    name: "Black & Decker MX1500W 5-Speed Hand Mixer",
},
{
    name: "Black & Decker MX600T Helix Performance Premium Hand Mixer",
},
{
    name: "Black & Decker MX600BC Helix Performance Premium Hand Mixer",
},
{
    name: "Black & Decker MX600G Helix Performance Premium Hand Mixer",
},
{
    name: "Black & Decker MX3200B 6-Speed Hand Mixer",
},
{
    name: "Black & Decker MX600P Helix Performance Premium Hand Mixer",
},
{
    name: "Black & Decker MX600H Helix Performance Premium Hand Mixer",
},
{
    name: "Black & Decker MX3200B 6-Speed Hand Mixer",
},
{
    name: "Black & Decker MX1500W 5-Speed Hand Mixer",
},
{
    name: "Black & Decker MX600T Helix Performance Premium Hand Mixer",
},
{
    name: "Black & Decker BL2010BG 10-Speed Blender",
},
{
    name: "Black & Decker BL2010BP 10-Speed Blender",
},
{
    name: "Black & Decker BL2010BG 10-Speed Blender",
},
{
    name: "Black & Decker BX225 300W Blender",
},
{
    name: "Black & Decker BL2010BG 10-Speed Blender",
},
{
    name: "Black & Decker BL1110RG Crush Master Blender",
},
{
    name: "Black & Decker BL1350DP-P Performance FusionBlade Digital Blender",
},
{
    name: "Black & Decker BX210 300W Blender",
},
{
    name: "Black & Decker BX210 300W Blender",
},
{
    name: "Black & Decker BX210 300W Blender",
},
{
    name: "Black & Decker JE2200B 400-Watt Fruit and Vegetable Juice Extractor",
},
{
    name: "Black & Decker CJ630 32-Ounce Electric Citrus Juicer",
},
{
    name: "Black & Decker JE2400BD 400-Watt Fruit and Vegetable Juice Extractor",
},
{
    name: "Black & Decker CJ625 34-Ounce Electric Citrus Juicer",
},
{
    name: "Black & Decker CJ650W 32-Ounce Electric Citrus Juicer",
},
{
    name: "Black & Decker CJ200B 32-Ounce Citrus Juicer",
},
{
    name: "Black & Decker CJ6302 32-Ounce Electric Citrus Juicer",
},
{
    name: "Black & Decker JE2200 400-Watt Fruit and Vegetable Juice Extractor",
},
{
    name: "Black & Decker CJ200S 30-Watt 32-Ounce Citrus Juicer",
},
{
    name: "Black & Decker JE2400BD 400-Watt Fruit and Vegetable Juice Extractor",
},
{
    name: "Black & Decker DLX1050W 12-Cup Programmable Coffee Maker",
},
{
    name: "Black & Decker CM2035B 12-Cup Thermal Coffee Maker",
},
{
    name: "Black & Decker CM2030B 12-Cup Thermal Coffee Maker",
},
{
    name: "Black & Decker CM1160B 12-Cup Programmable Coffee Maker",
},
{
    name: "Black & Decker CM4110S 12-Cup Digital Coffee Maker",
},
{
    name: "Black & Decker DCM600B 5-Cup Coffeemaker",
},
{
    name: "Black & Decker CM0700BZ 5-Cup Coffee Maker",
},
{
    name: "Black & Decker CM0700W 5-Cup Coffee Maker",
},
{
    name: "Black & Decker DCM600W 5-Cup Coffeemaker",
},
{
    name: "Black & Decker CM2030R 12-Cup Thermal Coffee Maker",
},
{
    name: "Black & Decker KE1500BK 1.7-Liter Rapid Boil Electric Kettle",
},
{
    name: "Black & Decker KE2000SD 1.7-Liter Stainless Steel Electric Kettle",
},
{
    name: "Black & Decker KE3000S 1.7-Liter Rapid Boil Electric Kettle",
},
{
    name: "Black & Decker JC200 1.7-Liter Cordless Electric Kettle",
},
{
    name: "Black & Decker KE1600B 1.7-Liter Electric Kettle",
},
{
    name: "Black & Decker KE1517B 1.7-Liter Rapid Boil Electric Kettle",
},
{
    name: "Black & Decker KE1020SD 1.7-Liter Stainless Steel Electric Kettle",
},
{
    name: "Black & Decker KE5550S 1.7-Liter Cordless Electric Kettle",
},
{
    name: "Black & Decker JC400 1.7-Liter Cordless Electric Kettle",
},
{
    name: "Black & Decker KE1500R 1.7-Liter Rapid Boil Electric Kettle",
},
{
    name: "Krups 14-Cup Food Processor (Model: FP3020)",
},
{
    name: "Krups 8-Cup Food Processor (Model: FP404)",
},
{
    name: "Krups Mini Food Processor (Model: GN492851)",
},
{
    name: "Krups Food Chopper (Model: GVA208)",
},
{
    name: "Krups 10-Cup Food Processor (Model: 394-70)",
},
{
    name: "Krups Hand Mixer with Turbo Boost (Model: GN492851)",
},
{
    name: "Krups Stand Mixer (Model: KB5220)",
},
{
    name: "Krups Electric Hand Mixer (Model: GN502851)",
},
{
    name: "Krups 10-Speed Stand Mixer (Model: KH734D50)",
},
{
    name: "Krups Digital Hand Mixer (Model: GN492851)",
},
{
    name: "Krups Countertop Blender with Glass Jar (Model:KB710D)",
},
{
    name: "Krups High-Speed Blender (Model: KB790)",
},
{
    name: "Krups Personal Blender (Model: GP211851)",
},
{
    name: "Krups PowerX Compact Blender (Model: KB203)",
},
{
    name: "Krups Immersion Hand Blender (Model: GPA30842)",
},
{
    name: "Krups Citrus Press (Model: ZX720)",
},
{
    name: "Krups Infinity Slow Juicer (Model: ZB601E51)",
},
{
    name: "Krups Juice Extractor (Model: ZX720K)",
},
{
    name: "Krups Citrus Juicer (Model: ZX800)",
},
{
    name: "Krups Compact Juicer (Model: ZX7000)",
},

{
    name: "Philips Viva Collection Food Processor",
},
{
    name: "Philips Avance Collection Food Processor",
},
{
    name: "Philips Daily Collection Food Processor",
},
{
    name: "Philips Compact Food Processor",
},
{
    name: "Philips ProMix Hand Blender (Includes food processing attachments)",
},
{
    name: "Philips Avance Collection Blender",
},
{
    name: "Philips Viva Collection Blender",
},
{
    name: "Philips Daily Collection Blender",
},
{
    name: "Philips Mini Blender",
},
{
    name: "Philips High-Speed Power Blender",
},
{
    name: "Philips ProMix Hand Blender (Includes blending attachments)",
},
{
    name: "Philips HR3652/01 Avance Collection Blender",
},
{
    name: "Philips HR2096/01 Avance Collection Blender",
},
{
    name: "Philips HR2172/00 Viva Collection Blender",
},
{
    name: "Philips Viva Collection Juicer",
},
{
    name: "Philips Avance Collection Juicer",
},
{
    name: "Philips Daily Collection Juicer",
},
{
    name: "Philips Compact Juicer",
},
{
    name: "Philips Micro Juicer",
},
{
    name: "Philips HR1918/81 Avance Collection Juicer",
},
{
    name: "Philips HR1867/21 Viva Collection Juicer",
},
{
    name: "Philips HR1832/01 Viva Collection Juicer",
},
{
    name: "Philips HR1836/01 Viva Collection Juicer",
},
{
    name: "Philips HR1855/31 Viva Collection Juicer",
},
{
    name: "Philips Grind & Brew Coffee Maker",
},
{
    name: "Philips 3200 Series LatteGo Espresso Machine",
},
{
    name: "Philips 2200 Series Espresso Machine",
},
{
    name: "Philips Senseo Original Coffee Pod Machine",
},
{
    name: "Philips EP1200/04 Series Espresso Machine",
},
{
    name: "Philips 3100 Series Espresso Machine",
},
{
    name: "Philips EP2200/10 Series Espresso Machine",
},
{
    name: "Philips EP3241/54 LatteGo Series Espresso Machine",
},
{
    name: "Philips 3200 Series Espresso Machine",
},
{
    name: "Philips Daily Collection Coffee Maker",
},
{
    name: "Philips HD9306/03 Daily Collection Kettle",
},
{
    name: "Philips HD9350/90 Avance Collection Kettle",
},
{
    name: "Philips HD4646/70 Energy Efficient Kettle",
},
{
    name: "Philips HD4646/70 Energy Efficient Kettle",
},
{
    name: "Philips HD4644/00 Energy Efficient Kettle",
},
{
    name: "Philips HD9326/20 Avance Collection Kettle",
},
{
    name: "Philips HD4646/40 Energy Efficient Kettle",
},
{
    name: "Philips HD4646/20 Energy Efficient Kettle",
},
{
    name: "Philips HD4690/01 Energy Efficient Kettle",
},
{
    name: "Philips HD4690/21 Energy Efficient Kettle",
},
{
    name: "Braun FP3020 12-Cup Food Processor",
},
{
    name: "Braun FP3020 12-Cup Food Processor",
},
{
    name: "Braun FP5150 Food Processor",
},
{
    name: "Braun FPX3030 12-Cup Food Processor",
},
{
    name: "Braun FPX3030 12-Cup Food Processor",
},
{
    name: "Braun FP5160 Food Processor",
},
{
    name: "Braun FPX3030 12-Cup Food Processor",
},
{
    name: "Braun FPX3030 12-Cup Food Processor",
},
{
    name: "Braun MultiMix 5 Hand Mixer",
},
{
    name: "Braun MultiMix 3 Hand Mixer",
},
{
    name: "Braun MultiMix 1 Hand Mixer",
},
{
    name: "Braun HM5100 MultiMix Hand Mixer",
},
{
    name: "Braun MQ777 Multiquick 7 Hand Blender and Mixer",
},
{
    name: "Braun IdentityCollection Stand Mixer",
},
{
    name: "Braun Multimix 5 Stand Mixer",
},
{
    name: "Braun Multimix 3 Stand Mixer",
},
{
    name: "Braun Multimix 2 Stand Mixer",
},
{
    name: "Braun MultiQuick 5 Hand Blender",
},
{
    name: "Braun PureMix Power Blender",
},
{
    name: "Braun MultiQuick 9 Hand Blender",
},
{
    name: "Braun PureMix Blender with Glass Jug",
},
{
    name: "Braun JB7352 PureMix Power Countertop Blender",
},
{
    name: "Braun MQ725 Multiquick Hand Blender",
},
{
    name: "Braun JB7001BKS PureMix Power Countertop Blender",
},
{
    name: "Braun MQ9037X Multiquick 9 Hand Blender",
},
{
    name: "Braun JB7200 PureMix Countertop Blender",
},
{
    name: "Braun JB7350 PureMix Power Countertop Blender",
},
{
    name: "Braun J700 Multiquick 7 Juicer",
},
{
    name: "Braun CJ3050 Citrus Juicer",
},
{
    name: "Braun J500 Multiquick 5 Juicer",
},
{
    name: "Braun MPZ22 Citromatic Citrus Juicer",
},
{
    name: "Braun J300 Multiquick 3 Juicer",
},
{
    name: "Braun KF6050WH BrewSense Drip Coffee Maker",
},
{
    name: "Braun KF7150BK BrewSense Drip Coffee Maker",
},
{
    name: "Braun KF7000BK BrewSense Drip Coffee Maker",
},
{
    name: "Braun KF7175 BrewSense Drip Coffee Maker",
},
{
    name: "Braun KF6050WH BrewSense Drip Coffee Maker",
},
{
    name: "Braun KF6050WH BrewSense Drip Coffee Maker",
},
{
    name: "Braun KF6050WH BrewSense Drip Coffee Maker",
},
{
    name: "Braun KF7150BK BrewSense Drip Coffee Maker",
},
{
    name: "Braun KF7000BK BrewSense Drip Coffee Maker",
},
{
    name: "Braun KF7175 BrewSense Drip Coffee Maker",
},
{
    name: "Braun WK600 Multiquick 6 Kettle",
},

{
    name: "Braun WK600 Multiquick 6 Kettle",
},
{
    name: "Braun WK300 Multiquick 3 Kettle",
},
{
    name: "Braun WK3110 PurEase Kettle",
},
{
    name: "Braun WK500 Sommelier Kettle",
},
{
    name: "Braun WK3110 PurEase Kettle",
},
{
    name: "Braun WK600 Multiquick 6 Kettle",
},
{
    name: "Braun WK500 Sommelier Kettle",
},
{
    name: "Braun WK300 Multiquick 3 Kettle",
},
{
    name: "Braun WK3110 PurEase Kettle",
},
{
    name: "Braun WK500 Sommelier Kettle",
},
{
    name: "Black & Decker FP2500B PowerPro Wide-Mouth Food Processor",
},
{
    name: "Black & Decker FP4200B PowerPro Wide-Mouth Food Processor",
},
{
    name: "Black & Decker FP6010 Performance Dicing Food Processor",
},
{
    name: "Black & Decker FP1600B PowerPro Food Processor",
},
{
    name: "Black & Decker FP5050 PowerPro Wide-Mouth Food Processor",
},
{
    name: "Black & Decker FP3030 12-Cup Food Processor",
},
{
    name: "Black & Decker FP6010 Performance Dicing Food Processor",
},
{
    name: "Black & Decker FP2500B PowerPro Wide-Mouth Food Processor",
},
{
    name: "Black & Decker FP1600B PowerPro Food Processor",
},

{
    name: "Ninja Professional BL610",
},
{
    name: "Ninja Smart Screen Duo CT661V",
},
{
    name: "Ninja Master Prep QB1004",
},
{
    name: "Ninja Express Chop NJ110GR",
},
{
    name: "Ninja Precision Processor NN310",
},
{
    name: "Ninja Professional BL610",
},
{
    name: "Ninja BL480 Nutri Ninja with Auto-iQ",
},
{
    name: "Ninja BL770 Mega Kitchen System",
},
{
    name: "Ninja BL610 Professional 1000W Blender",
},
{
    name: "Ninja BL660 Professional 1100W Blender",
},
{
    name: "Ninja BL780 Supra Kitchen System",
},
{
    name: "Ninja BL687CO Auto-iQ Total Boost",
},
{
    name: "Ninja BL771 Mega Kitchen System",
},
{
    name: "Ninja QB900B Master Prep",
},
{
    name: "Ninja CP301",
},
{
    name: "Ninja CM407",
},
{
    name: "Ninja CF091",
},
{
    name: "Ninja CE201",
},
{
    name: "Ninja CM401",
},
{
    name: "Ninja CM20",
},
{
    name: "Ninja CF112",
},
{
    name: "Ninja CF097",
},
{
    name: "Ninja CM400",
},
{
    name: "Ninja CP301W",
},
{
    name: "Oster Pro 1200 Blender with Food Processor Attachment",
},
{
    name: "Oster Top Chop 4-Cup Food Processor",
},
{
    name: "Oster Total Prep 10-Cup Food Processor",
},
{
    name: "Oster Oskar 2-in-1 Salad Prep and Food Processor",
},
{
    name: "Oster 2-Speed 10-Cup Food Processor",
},
{
    name: "Oster Designer Kitchen Center Food Processor Attachment",
},
{
    name: "Oster 250-Watt 5-Speed Hand Mixer",
},
{
    name: "Oster 7-Speed Clean Start Hand Mixer",
},
{
    name: "Oster 6-Speed Retractable Cord Hand Mixer",
},
{
    name: "Oster Planetary Stand Mixer with Stainless Steel Bowl",
},
{
    name: "Oster 12-Speed Planetary Stand Mixer",
},
{
    name: "Oster 4.5-Quart Tilt-Head Stand Mixer",
},
{
    name: "Oster Precise Blend 200 Blender",
},
{
    name: "Oster Pro 1200 Blender",
},
{
    name: "Oster Reverse Crush Counterforms Blender",
},
{
    name: "Oster 10-Speed Blender",
},
{
    name: "Oster MyBlend Pro Series Personal Blender",
},
{
    name: "Oster Blend-N-Go MyBlend Blender",
},
{
    name: "Oster BLSTPB-WBL My Blend 250-Watt Blender",
},
{
    name: "Oster JusSimple 5 Speed Easy Clean Juice Extractor",
},
{
    name: "Oster JusSimple 2-Speed Easy Clean Juice Extractor",
},
{
    name: "Oster Self-Cleaning Professional Juice Extractor",
},
{
    name: "Oster Wide Mouth Juice Extractor",
},
{
    name: "Oster 400W Wide Mouth Juice Extractor",
},
{
    name: "Oster Juice and Blend 2 Go Compact Juice Extractor and Personal Blender",
},
{
    name: "Oster 12-Cup Programmable Coffee Maker",
},
{
    name: "Oster 10-Cup Optimal Brew Thermal Coffee Maker",
},
{
    name: "Oster 12-Cup Stainless Steel Coffee Maker",
},
{
    name: "Oster 12-Cup Programmable Coffee Maker with Brew Strength Selector",
},
{
    name: "Oster Single Serve Coffee Maker",
},
{
    name: "Oster 12-Cup Drip Coffee Maker",
},
{
    name: "Oster 12-Cup Stainless Steel Thermal Coffee Maker",
},
{
    name: "Oster 12-Cup Coffee Maker BVST-JBXSS41",
},
{
    name: "Oster Prima Latte Coffee Maker",
},
{
    name: "Oster Coffee Center 12-Cup Coffeemaker and Single Serve Brewer",
},
{
    name: "Oster Stainless Steel Electric Kettle",
},
{
    name: "Oster Illuminating Glass Electric Kettle",
},
{
    name: "Oster DuraCeramic Electric Kettle",
},
{
    name: "Oster BVST-EK18B Electric Kettle",
},
{
    name: "Oster BVSTKT3231 Electric Kettle",
},
{
    name: "Oster 5965 Electric Kettle",
},
{
    name: "Oster 1.7-Liter BVCB07-Z Electric Kettle",
},
{
    name: "Oster BVSTK7051SS Electric Kettle",
},
{
    name: "Oster FPSTKT4073 Electric Kettle",
},
{
    name: "Vitamix E310 Explorian Blender",
},
{
    name: "Vitamix E320 Explorian Blender",
},
{
    name: "Vitamix 5200 Series Blender",
},
{
    name: "Vitamix Professional Series 750 Blender",
},
{
    name: "Vitamix Ascent Series A2300 Blender",
},
{
    name: "Vitamix Ascent Series A2500 Blender",
},
{
    name: "Vitamix Ascent Series A3300 Blender",
},
{
    name: "Vitamix Ascent Series A3500 Blender",
},
{
    name: "Vitamix 7500 Blender",
},
{
    name: "Vitamix Pro 750 Heritage Blender",
},
{
    name: "Vitamix S30 Personal Blender",
},
{
    name: "Vitamix S50 Personal Blender",
},
{
    name: "Vitamix S55 Personal Blender",
},
{
    name: "Vitamix TurboBlend Two-Speed Blender",
},
{
    name: "Vitamix TurboBlend Three-Speed Blender",
},
{
    name: "Keurig K-Classic Coffee Maker",
},
{
    name: "Keurig K-Elite Coffee Maker",
},
{
    name: "Keurig K-Select Coffee Maker",
},
{
    name: "Keurig K-Compact Coffee Maker",
},
{
    name: "Keurig K-Express Coffee Maker",
},
{
    name: "Keurig K-Cafe Coffee Maker",
},
{
    name: "Keurig K-Elite C Single Serve Coffee Maker",
},
{
    name: "Keurig K-Mini Coffee Maker",
},
{
    name: "Keurig K-Classic K50 Coffee Maker",
},
{
    name: "Keurig K-55 Coffee Maker",
},
{
    name: "Keurig K-Duo Essentials Coffee Maker",
},
{
    name: "Keurig K-Duo Plus Coffee Maker",
},




      
      ];
    
    