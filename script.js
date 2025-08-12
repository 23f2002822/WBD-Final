
document.addEventListener('DOMContentLoaded', () => {
    // --- STATE MANAGEMENT ---
    const state = {
        lang: 'en',
        theme: localStorage.getItem('theme') || 'light',
        comparisonList: JSON.parse(localStorage.getItem('comparisonList')) || [],
    };

    // --- DATA & CONSTANTS ---
    const WHATSAPP_NUMBER = "+918885319118";
    const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/your_sheet_id/gviz/tq?'; //This is a placeholder and not used for submission.

    const projects = [{
        id: 'etor-city-1',
        isFeatured: true,
        name: { en: 'ETOR City 1', te: 'ETOR సిటీ 1' },
        type: { en: 'Investment Plots', te: 'పెట్టుబడి ప్లాట్లు' },
        location: { en: 'Sariyapalli Village, Vizianagaram', te: 'సరియపల్లి గ్రామం, విజయనగరం' },
        gmapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3795.836811210941!2d83.1849188148842!3d17.93922398774904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3a4d6b6b5b5b5b%3A0x1b1b1b1b1b1b1b1b!2sSariyapalli%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1678886400000',
        images: [
            'https://i.imgur.com/u15n32j.jpg', 'https://i.imgur.com/qR85iY3.jpg',
            'https://i.imgur.com/2s42m6s.jpg', 'https://i.imgur.com/9OqF6JC.jpg',
            'https://i.imgur.com/2Gz2VlE.jpg'
        ],
        description: {
            en: 'Discover ETOR City 1, our premier project located closest to Visakhapatnam, offering a perfect blend of accessibility and serene nature. With a secure ₹10 Lakh investment for a 250 sq. yard plot, you gain registered land ownership and a guaranteed income of ₹10,000 every month for 100 months. This plan allows you to recover your initial investment through monthly payouts while your land appreciates and high-value crops like Sandalwood grow, building crores in long-term wealth for your future.',
            te: 'మన వైజాగ్‌కు అత్యంత సమీపంలో, ప్రకృతికి దగ్గరగా ఉన్న మా ETOR City 1 ప్రాజెక్ట్‌కు స్వాగతం. కేవలం ₹10 లక్షల పెట్టుబడితో 250 గజాల ప్లాట్‌ను మీ పేరు మీద రిజిస్ట్రేషన్ చేసుకోండి. దీని ద్వారా ప్రతీ నెలా గ్యారెంటీగా ₹10,000 చొప్పున 100 నెలల పాటు ఆదాయం పొందండి. అంటే, మీ పెట్టుబడి నెలవారీ ఆదాయం రూపంలో తిరిగి వస్తుంది. అదే సమయంలో, మీ భూమి విలువతో పాటు శ్రీగంధం వంటి పంటల ద్వారా భవిష్యత్తులో కోట్ల రూపాయల సంపద సృష్టించబడుతుంది.'
        },
        details: {
            projectArea: { en: '250 Acres', te: '250 ఎకరాలు' },
            propertyArea: { en: '250 sq. yards', te: '250 చ. గజాలు' },
            facing: { en: 'All Facings Available', te: 'అన్ని ఫేసింగ్‌లు ఉన్నాయి' },
            price: { en: '₹3,999 per sq. yard', te: 'గజం ₹3,999' },
            negotiable: true
        },
        amenities: [
            { name: { en: 'Modern Clubhouse', te: 'ఆధునిక క్లబ్‌హౌస్' }, icon: 'Clubhouse' },
            { name: { en: 'Swimming Pool', te: 'స్విమ్మింగ్ పూల్' }, icon: 'Pool' },
            { name: { en: 'Playing Ground', te: 'ఆట స్థలం' }, icon: 'Playground' },
            { name: { en: 'Battery-Operated Cars', te: 'బ్యాటరీ కార్లు' }, icon: 'Car' },
            { name: { en: 'Free Hotel Stay (10 days/yr)', te: 'ఉచిత హోటల్ బస (10 రోజులు/సం)' }, icon: 'Hotel' },
            { name: { en: 'Free EV Bike', te: 'ఉచిత EV బైక్' }, icon: 'Bike' }
        ],
        nearbyLocations: [
            { en: '9km from Araku-Vizag road', te: 'అరకు-వైజాగ్ రోడ్ నుండి 9కిమీ' },
            { en: '24km to S. Kota', te: 'ఎస్. కోట నుండి 24కిమీ' },
            { en: '46km to Kothavalasa', te: 'కొత్తవలస నుండి 46కిమీ' },
            { en: '76km to Vizag', te: 'వైజాగ్ నుండి 76కిమీ' }
        ]
    }, {
        id: 'serene-apartments',
        isFeatured: true,
        name: { en: 'Serene Apartments', te: 'సెరీన్ అపార్ట్‌మెంట్స్' },
        type: { en: '2 & 3 BHK Flats', te: '2 & 3 BHK ఫ్లాట్లు' },
        location: { en: 'Madhurawada, Visakhapatnam', te: 'మధురవాడ, విశాఖపట్నం' },
        gmapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.927260588669!2d83.33708231488206!3d17.79491798783451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3959a5aaaaaaab%3A0x1e3a6a1e6a6a6a6a!2sMadhurawada%2C%20Visakhapatnam%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1678886400001',
        images: ['https://i.imgur.com/uDb2yP5.jpeg', 'https://i.imgur.com/j5kNMzH.jpeg'],
        description: {
            en: 'Luxury living in the heart of the IT hub. Serene Apartments offers modern amenities and spacious living with breathtaking views. Perfect for families and professionals looking for a blend of comfort and convenience.',
            te: 'IT హబ్ నడిబొడ్డున విలాసవంతమైన జీవితం. సెరీన్ అపార్ట్‌మెంట్స్ ఆధునిక సౌకర్యాలు మరియు అద్భుతమైన వీక్షణలతో విశాలమైన నివాసాన్ని అందిస్తుంది. సౌకర్యం మరియు సౌలభ్యం కలయిక కోసం చూస్తున్న కుటుంబాలు మరియు నిపుణులకు ఇది సరైనది.'
        },
        details: {
            propertyArea: { en: '1200 - 1800 sq. ft.', te: '1200 - 1800 చ. అడుగులు' },
            facing: { en: 'East & West', te: 'తూర్పు & పడమర' },
            price: { en: 'Starting from ₹60 Lakhs', te: '₹60 లక్షల నుండి ప్రారంభం' },
            negotiable: false
        },
        amenities: [
            { name: { en: 'Gymnasium', te: 'వ్యాయామశాల' }, icon: 'Gym' },
            { name: { en: 'Rooftop Garden', te: 'రూఫ్‌టాప్ గార్డెన్' }, icon: 'Garden' },
            { name: { en: '24/7 Security', te: '24/7 సెక్యూరిటీ' }, icon: 'Security' }
        ],
        nearbyLocations: [
            { en: 'Walkable to IT SEZ', te: 'IT SEZకు నడిచే దూరం' },
            { en: '5 mins to National Highway', te: 'జాతీయ రహదారికి 5 నిమిషాలు' },
            { en: '10 mins to Rushikonda Beach', te: 'రుషికొండ బీచ్‌కు 10 నిమిషాలు' }
        ]
    }, {
        id: 'green-valley-plots',
        isFeatured: false,
        name: { en: 'Green Valley', te: 'గ్రీన్ వ్యాలీ' },
        type: { en: 'Residential Plots', te: 'నివాస స్థలాలు' },
        location: { en: 'Anandapuram, Visakhapatnam', te: 'ఆనందపురం, విశాఖపట్నం' },
        gmapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.057390642878!2d83.3524673148826!3d17.83548998781014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a395f5555555555%3A0x5e5e5e5e5e5e5e5e!2sAnandapuram%2C%20Visakhapatnam%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1678886400002',
        images: ['https://i.imgur.com/OExl6Bf.jpeg', 'https://i.imgur.com/MNOB10y.jpeg'],
        description: {
            en: 'A VUDA approved layout with lush greenery and a peaceful environment. Green Valley is the perfect place to build your dream home, away from the city hustle yet well-connected.',
            te: 'పచ్చదనం మరియు ప్రశాంతమైన వాతావరణంతో కూడిన VUDA ఆమోదించిన లేఅవుట్. గ్రీన్ వ్యాలీ మీ కలల ఇంటిని నిర్మించుకోవడానికి సరైన ప్రదేశం, నగర సందడికి దూరంగా ఇంకా బాగా కనెక్ట్ చేయబడింది.'
        },
        details: {
            projectArea: { en: '50 Acres', te: '50 ఎకరాలు' },
            propertyArea: { en: '167 - 400 sq. yards', te: '167 - 400 చ. గజాలు' },
            facing: { en: 'All Facings', te: 'అన్ని ఫేసింగ్‌లు' },
            price: { en: '₹15,000 per sq. yard', te: 'గజం ₹15,000' },
            negotiable: true
        },
        amenities: [
            { name: { en: '40ft Blacktop Roads', te: '40 అడుగుల బ్లాక్‌టాప్ రోడ్లు' }, icon: 'Road' },
            { name: { en: 'Avenue Plantation', te: 'అవెన్యూ ప్లాంటేషన్' }, icon: 'Garden' },
            { name: { en: 'Gated Community', te: 'గేటెడ్ కమ్యూనిటీ' }, icon: 'Security' }
        ],
        nearbyLocations: [
            { en: 'Close to GMR Aero City', te: 'GMR ఏరో సిటీకి దగ్గరగా' },
            { en: 'Near IIM & other institutes', te: 'IIM & ఇతర సంస్థల దగ్గర' }
        ]
    }, {
        id: 'coastal-paradise-villas',
        isFeatured: true,
        name: { en: 'Coastal Paradise Villas', te: 'కోస్టల్ ప్యారడైజ్ విల్లాస్' },
        type: { en: 'Luxury Villas', te: 'విలాసవంతమైన విల్లాలు' },
        location: { en: 'Bheemili, Visakhapatnam', te: 'భీమిలి, విశాఖపట్నం' },
        gmapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30368.17297926428!2d83.4351368!3d17.893152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a39732155555555%3A0x36851b43969188f!2sBheemunipatnam%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1678886400003',
        images: ['https://i.imgur.com/UfG4T1j.jpg', 'https://i.imgur.com/kYq8nN1.jpg'],
        description: {
            en: 'Experience unparalleled luxury with sea-facing villas. Each villa comes with a private pool and garden, offering an exclusive and tranquil lifestyle right by the coast.',
            te: 'సముద్రానికి ఎదురుగా ఉన్న విల్లాలతో అసమానమైన లగ్జరీని అనుభవించండి. ప్రతి విల్లా ప్రైవేట్ పూల్ మరియు గార్డెన్‌తో వస్తుంది, ఇది తీరానికి సమీపంలో ఒక ప్రత్యేకమైన మరియు ప్రశాంతమైన జీవనశైలిని అందిస్తుంది.'
        },
        details: {
            propertyArea: { en: '3000 sq. ft. Villa', te: '3000 చ. అడుగుల విల్లా' },
            facing: { en: 'East (Sea-facing)', te: 'తూర్పు (సముద్రానికి ఎదురుగా)' },
            price: { en: '₹2.5 Crores onwards', te: '₹2.5 కోట్ల నుండి' },
            negotiable: false
        },
        amenities: [
            { name: { en: 'Private Pool', te: 'ప్రైవేట్ పూల్' }, icon: 'Pool' },
            { name: { en: 'Beach Access', te: 'బీచ్ యాక్సెస్' }, icon: 'Playground' },
            { name: { en: 'Italian Marble Flooring', te: 'ఇటాలియన్ మార్బుల్ ఫ్లోరింగ్' }, icon: 'Hotel' }
        ],
        nearbyLocations: [
            { en: '5 mins to Bheemili Beach', te: 'భీమిలి బీచ్‌కు 5 నిమిషాలు' },
            { en: '20 mins to Rushikonda IT Park', te: 'రుషికొండ ఐటీ పార్క్‌కు 20 నిమిషాలు' }
        ]
    }, {
        id: 'urban-heights-guntur',
        isFeatured: false,
        name: { en: 'Urban Heights', te: 'అర్బన్ హైట్స్' },
        type: { en: 'High-rise Apartments', te: 'ఎత్తైన అపార్ట్‌మెంట్లు' },
        location: { en: 'Amaravati Road, Guntur', te: 'అమరావతి రోడ్, గుంటూరు' },
        gmapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61247.23432791557!2d80.4005552!3d16.3262608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a755555555555%3A0x5555555555555555!2sGuntur%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1678886400004',
        images: ['https://i.imgur.com/xV3Gv3h.jpg', 'https://i.imgur.com/G5gS5pS.jpg'],
        description: {
            en: 'The tallest residential tower in Guntur, offering panoramic city views. Urban Heights brings premium living to the city center, with state-of-the-art facilities and smart home features.',
            te: 'గుంటూరులోని అత్యంత ఎత్తైన నివాస టవర్, నగరం యొక్క విశాల దృశ్యాలను అందిస్తుంది. అర్బన్ హైట్స్ అత్యాధునిక సౌకర్యాలు మరియు స్మార్ట్ హోమ్ ఫీచర్లతో నగర కేంద్రానికి ప్రీమియం జీవనాన్ని అందిస్తుంది.'
        },
        details: {
            propertyArea: { en: '1500 - 2500 sq. ft.', te: '1500 - 2500 చ. అడుగులు' },
            facing: { en: 'All Facings', te: 'అన్ని ఫేసింగ్‌లు' },
            price: { en: '₹75 Lakhs - ₹1.2 Cr', te: '₹75 లక్షలు - ₹1.2 కోట్లు' },
            negotiable: true
        },
        amenities: [
            { name: { en: 'Sky Lounge', te: 'స్కై లాంజ్' }, icon: 'Clubhouse' },
            { name: { en: 'Smart Home Automation', te: 'స్మార్ట్ హోమ్ ఆటోమేషన్' }, icon: 'Security' },
            { name: { en: 'Indoor Games Room', te: 'ఇండోర్ గేమ్స్ రూమ్' }, icon: 'Playground' }
        ],
        nearbyLocations: [
            { en: 'On Amaravati Main Road', te: 'అమరావతి మెయిన్ రోడ్‌లో' },
            { en: '10 mins to Guntur Railway Station', te: 'గుంటూరు రైల్వే స్టేషన్‌కు 10 నిమిషాలు' }
        ]
    }, {
        id: 'future-tech-park',
        isFeatured: false,
        name: { en: 'Future Tech Park', te: 'ఫ్యూచర్ టెక్ పార్క్' },
        type: { en: 'Commercial Space', te: 'వాణిజ్య స్థలం' },
        location: { en: 'Financial District, Visakhapatnam', te: 'ఫైనాన్షియల్ డిస్ట్రిక్ట్, విశాఖపట్నం' },
        gmapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3799.049449835706!2d83.33703531488198!3d17.78899898783776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3959b3aaaaaaab%3A0x8e5e8e5e8e5e8e5e!2sFinancial%20District%2C%20Visakhapatnam%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1678886400005',
        images: ['https://i.imgur.com/uN1Nqvx.jpg', 'https://i.imgur.com/kH0dGv2.jpg'],
        description: {
            en: 'State-of-the-art office spaces designed for modern businesses. Located in the rapidly growing Financial District, this is the ultimate address for your company to thrive.',
            te: 'ఆధునిక వ్యాపారాల కోసం రూపొందించబడిన అత్యాధునిక కార్యాలయ స్థలాలు. వేగంగా అభివృద్ధి చెందుతున్న ఫైనాన్షియల్ డిస్ట్రిక్ట్‌లో ఉంది, మీ కంపెనీ అభివృద్ధి చెందడానికి ఇది అంతిమ చిరునామా.'
        },
        details: {
            propertyArea: { en: '5,000 - 50,000 sq. ft.', te: '5,000 - 50,000 చ. అడుగులు' },
            facing: { en: 'North-East', te: 'ఈశాన్యం' },
            price: { en: 'Price on Request', te: 'ధర అభ్యర్థనపై' },
            negotiable: true
        },
        amenities: [
            { name: { en: 'LEED Certified Building', te: 'లీడ్ సర్టిఫైడ్ బిల్డింగ్' }, icon: 'Garden' },
            { name: { en: 'High-Speed Internet', te: 'హై-స్పీడ్ ఇంటర్నెట్' }, icon: 'Car' },
            { name: { en: 'Ample Parking', te: 'పుష్కలమైన పార్కింగ్' }, icon: 'Road' }
        ],
        nearbyLocations: [
            { en: 'Next to major IT campuses', te: 'ప్రధాన IT క్యాంపస్‌ల పక్కన' },
            { en: '30 mins from Airport', te: 'విమానాశ్రయం నుండి 30 నిమిషాలు' }
        ]
    }, {
        id: 'royal-greens-rajahmundry',
        isFeatured: true,
        name: { en: 'Royal Greens', te: 'రాయల్ గ్రీన్స్' },
        type: { en: 'Gated Community Plots', te: 'గేటెడ్ కమ్యూనిటీ ప్లాట్లు' },
        location: { en: 'Diwancheruvu, Rajahmundry', te: 'దివాన్‌చెరువు, రాజమండ్రి' },
        gmapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30607.4573715104!2d81.8219984!3d16.9939504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37a33333333333%3A0x3333333333333333!2sDiwancheruvu%2C%20Rajahmundry%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1678886400006',
        images: ['https://i.imgur.com/W2bMhSn.jpg', 'https://i.imgur.com/qL5bA2r.jpg'],
        description: {
            en: 'Invest in the future with VUDA approved plots in the rapidly developing corridor of Rajahmundry. Royal Greens offers a serene environment with all modern amenities for a comfortable lifestyle.',
            te: 'రాజమండ్రి వేగంగా అభివృద్ధి చెందుతున్న కారిడార్‌లో VUDA ఆమోదించిన ప్లాట్లతో భవిష్యత్తులో పెట్టుబడి పెట్టండి. రాయల్ గ్రీన్స్ సౌకర్యవంతమైన జీవనశైలి కోసం అన్ని ఆధునిక సౌకర్యాలతో ప్రశాంతమైన వాతావరణాన్ని అందిస్తుంది.'
        },
        details: {
            projectArea: { en: '100 Acres', te: '100 ఎకరాలు' },
            propertyArea: { en: '200 - 500 sq. yards', te: '200 - 500 చ. గజాలు' },
            facing: { en: 'All Facings', te: 'అన్ని ఫేసింగ్‌లు' },
            price: { en: '₹12,000 per sq. yard', te: 'గజం ₹12,000' },
            negotiable: true
        },
        amenities: [
            { name: { en: 'Children\'s Play Area', te: 'పిల్లల ఆట స్థలం' }, icon: 'Playground' },
            { name: { en: '24hr Water Supply', te: '24గం నీటి సరఫరా' }, icon: 'Pool' },
            { name: { en: 'Gated Entrance Arch', te: 'గేటెడ్ ప్రవేశ ద్వారం' }, icon: 'Security' }
        ],
        nearbyLocations: [
            { en: '5km from Rajahmundry Airport', te: 'రాజమండ్రి విమానాశ్రయం నుండి 5కిమీ' },
            { en: 'On NH-16, close to GIET College', te: 'NH-16లో, GIET కళాశాలకు దగ్గరగా' }
        ]
    }, {
        id: 'godavari-estates',
        isFeatured: false,
        name: { en: 'Godavari Estates', te: 'గోదావరి ఎస్టేట్స్' },
        type: { en: 'Agricultural Land', te: 'వ్యవసాయ భూమి' },
        location: { en: 'Near Kakinada SEZ', te: 'కాకినాడ సెజ్ దగ్గర' },
        gmapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61129.98688469446!2d82.2519168!3d16.96864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37944444444445%3A0x4444444444444444!2sKakinada%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1678886400007',
        images: ['https://i.imgur.com/8QpW5uG.jpg', 'https://i.imgur.com/b9e2Ff3.jpg'],
        description: {
            en: 'Highly fertile agricultural land ideal for oil palm, coconut, or aqua farming. Located strategically near the Kakinada SEZ, this land promises high returns on investment through agriculture and land appreciation.',
            te: 'ఆయిల్ పామ్, కొబ్బరి, లేదా ఆక్వా సాగుకు అనువైన అత్యంత సారవంతమైన వ్యవసాయ భూమి. కాకినాడ సెజ్ సమీపంలో వ్యూహాత్మకంగా ఉంది, ఈ భూమి వ్యవసాయం మరియు భూమి విలువ పెరుగుదల ద్వారా అధిక రాబడిని వాగ్దానం చేస్తుంది.'
        },
        details: {
            projectArea: { en: 'Customizable', te: 'అనుకూలీకరించదగినది' },
            propertyArea: { en: '1 - 10 Acres', te: '1 - 10 ఎకరాలు' },
            facing: { en: 'N/A', te: 'వర్తించదు' },
            price: { en: '₹40 Lakhs per Acre', te: 'ఎకరాకు ₹40 లక్షలు' },
            negotiable: true
        },
        amenities: [
            { name: { en: 'Natural Water Source', te: 'సహజ నీటి వనరు' }, icon: 'Pool' },
            { name: { en: 'Road Access', te: 'రహదారి సౌకర్యం' }, icon: 'Road' },
            { name: { en: 'Clear Title', te: 'స్పష్టమైన టైటిల్' }, icon: 'Security' }
        ],
        nearbyLocations: [
            { en: '10km from Kakinada Port', te: 'కాకినాడ పోర్ట్ నుండి 10కిమీ' },
            { en: 'Adjacent to Petrochemical Corridor', te: 'పెట్రోకెమికల్ కారిడార్‌కు ఆనుకుని' }
        ]
    }];

    const blogs = [{
        id: 'real-estate-boom',
        title: { en: 'The Real Estate Boom in Visakhapatnam', te: 'విశాఖపట్నంలో రియల్ ఎస్టేట్ విజృంభణ' },
        summary: { en: 'An in-depth analysis of the factors driving the property market growth in the City of Destiny.', te: 'సిటీ ఆఫ్ డెస్టినీలో ఆస్తి మార్కెట్ వృద్ధిని నడిపించే కారకాలపై లోతైన విశ్లేషణ.' },
        date: '2023-10-15',
        imageUrl: 'https://i.imgur.com/uDb2yP5.jpeg'
    }, {
        id: 'investment-guide',
        title: { en: 'A Beginner\'s Guide to Investing in Plots', te: 'ప్లాట్లలో పెట్టుబడికి ఒక ప్రాథమిక గైడ్' },
        summary: { en: 'Learn the essential tips and tricks for making a smart investment in land properties.', te: 'భూమి ఆస్తులలో తెలివైన పెట్టుబడి పెట్టడానికి అవసరమైన చిట్కాలు మరియు ట్రిక్స్ తెలుసుకోండి.' },
        date: '2023-09-28',
        imageUrl: 'https://i.imgur.com/MNOB10y.jpeg'
    }];

    const teamMembers = [
        { name: 'Mukesh Pediredla', role: { en: 'Founder', te: 'వ్యవస్థాపకుడు' }, image: 'https://i.imgur.com/5n22N2A.jpg', linkedin: 'https://www.linkedin.com/in/mukesh-pediredla-896a20282' },
        { name: 'Spandan Parida', role: { en: 'CEO', te: 'సీఈఓ' }, image: 'https://i.imgur.com/K1b5U2u.jpg', linkedin: 'https://www.linkedin.com/in/spandaniimr' },
        { name: 'Essam Hussein', role: { en: 'Web Developer', te: 'వెబ్ డెవలపర్' }, image: 'https://i.imgur.com/hBEe31Y.jpg', linkedin: 'https://www.linkedin.com/in/essam-hussein-522443255/' },
        { name: 'Sarthak Agarwal', role: { en: 'Product and Design', te: 'ఉత్పత్తి మరియు రూపకల్పన' }, image: 'https://i.imgur.com/xO4gA2B.jpg', linkedin: 'https://www.linkedin.com/in/sarthak-agarwal-4bb433287' }
    ];

    const uiTranslations = {
        en: {
            nav: { home: 'Home', projects: 'Projects', about: 'About', team: 'Our Team', blog: 'Blog', contact: 'Contact' },
            hero: {
                title: 'Find Your Future. Build Your Fortune.',
                subtitle: 'Discover premium plots, apartments, and real estate investment opportunities in Andhra Pradesh.',
                button: 'Explore Projects'
            },
            featured: 'Featured Projects',
            allProjects: 'All Projects',
            projectDetails: 'Project Details',
            amenities: 'Amenities & Benefits',
            location: 'Location',
            nearby: 'Nearby Locations',
            price: 'Price',
            area: 'Area',
            facing: 'Facing',
            status: 'Status',
            negotiable: 'Negotiable',
            notNegotiable: 'Non-Negotiable',
            contactForm: {
                title: 'Interested? Contact Us',
                subtitle: 'Fill out the form below or message us on WhatsApp to get more details.',
                name: 'Name',
                namePlaceholder: 'Enter your name',
                phone: 'Phone Number',
                phonePlaceholder: 'Enter your 10-digit number',
                submit: 'Submit Inquiry',
                whatsapp: 'Chat on WhatsApp',
                submitting: 'Submitting...',
                submitted: 'Thank you! We will contact you soon.',
                error: 'Please fill all fields correctly.',
                phoneError: 'Please enter a valid 10-digit phone number.',
            },
            blog: {
                title: 'Real Estate Insights',
                subtitle: 'Stay updated with the latest trends and news from the property market.',
                readMore: 'Read More'
            },
            contactPage: {
                title: 'Get in Touch',
                subtitle: 'We are here to help you with your property needs. Reach out to us via the form or contact details below.',
                phone: 'Phone',
                email: 'Email',
                address: 'Address',
                hours: 'Operating Hours',
                hoursValue: '10 AM - 6 PM'
            },
            about: {
                title: 'About Estate Mitra',
                subtitle: 'Your trusted partner in real estate, guiding you towards a prosperous future.',
                section1Title: 'Our Mission',
                section1Text: 'To democratize real estate investment by offering transparent, high-return opportunities for everyone. We believe in building wealth for our clients through meticulously planned projects and unwavering support.',
                section2Title: 'Our Vision',
                section2Text: 'To become the most trusted and innovative real estate wealth creation platform in India, recognized for our commitment to quality, customer satisfaction, and sustainable development.'
            },
            team: {
                title: 'Meet Our Team',
                subtitle: 'The dedicated professionals behind our success.'
            },
            compare: {
                title: 'Compare Properties',
                subtitle: 'View a side-by-side comparison of your selected properties.',
                selectPrompt: 'Select up to 4 properties to compare.',
                compareNow: 'Compare Now',
                clearAll: 'Clear All',
                maxItems: 'You can compare a maximum of 4 properties.',
                feature: 'Feature'
            },
            footer: { rights: 'All rights reserved.', quickLinks: 'Quick Links' }
        },
        te: {
            nav: { home: 'హోమ్', projects: 'ప్రాజెక్ట్‌లు', about: 'మా గురించి', team: 'మా బృందం', blog: 'బ్లాగ్', contact: 'కాంటాక్ట్' },
            hero: {
                title: 'మీ భవిష్యత్తును కనుగొనండి. మీ సంపదను నిర్మించుకోండి.',
                subtitle: 'ఆంధ్రప్రదేశ్‌లో ప్రీమియం ప్లాట్లు, అపార్ట్‌మెంట్లు మరియు రియల్ ఎస్టేట్ పెట్టుబడి అవకాశాలను కనుగొనండి.',
                button: 'ప్రాజెక్ట్‌లను అన్వేషించండి'
            },
            featured: 'ఫీచర్డ్ ప్రాజెక్ట్‌లు',
            allProjects: 'అన్ని ప్రాజెక్ట్‌లు',
            projectDetails: 'ప్రాజెక్ట్ వివరాలు',
            amenities: 'సౌకర్యాలు & ప్రయోజనాలు',
            location: 'ప్రదేశం',
            nearby: 'సమీపంలోని ప్రదేశాలు',
            price: 'ధర',
            area: 'విస్తీర్ణం',
            facing: 'ఫేసింగ్',
            status: 'స్థితి',
            negotiable: 'చర్చించదగినది',
            notNegotiable: 'చర్చించబడదు',
            contactForm: {
                title: 'ఆసక్తి ఉందా? మమ్మల్ని సంప్రదించండి',
                subtitle: 'మరిన్ని వివరాలు పొందడానికి దిగువ ఫారమ్‌ను పూరించండి లేదా వాట్సాప్‌లో మాకు సందేశం పంపండి.',
                name: 'పేరు',
                namePlaceholder: 'మీ పేరు నమోదు చేయండి',
                phone: 'ఫోన్ నంబర్',
                phonePlaceholder: 'మీ 10-అంకెల నంబర్‌ను నమోదు చేయండి',
                submit: 'విచారణ పంపండి',
                whatsapp: 'వాట్సాప్‌లో చాట్ చేయండి',
                submitting: 'సమర్పిస్తోంది...',
                submitted: 'ధన్యవాదాలు! మేము మిమ్మల్ని త్వరలో సంప్రదిస్తాము.',
                error: 'దయచేసి అన్ని వివరాలను సరిగ్గా పూరించండి.',
                phoneError: 'దయచేసి సరైన 10-అంకెల ఫోన్ నంబర్‌ను నమోదు చేయండి.',
            },
            blog: {
                title: 'రియల్ ఎస్టేట్ అంతర్దృష్టులు',
                subtitle: 'ఆస్తి మార్కెట్ నుండి తాజా పోకడలు మరియు వార్తలతో నవీకరించబడండి.',
                readMore: 'ఇంకా చదవండి'
            },
            contactPage: {
                title: 'సంప్రదించండి',
                subtitle: 'మీ ఆస్తి అవసరాలతో మీకు సహాయం చేయడానికి మేము ఇక్కడ ఉన్నాము. దిగువ ఫారం లేదా సంప్రదింపు వివరాల ద్వారా మమ్మల్ని సంప్రదించండి.',
                phone: 'ఫోన్',
                email: 'ఇమెయిల్',
                address: 'చిరునామా',
                hours: 'పని గంటలు',
                hoursValue: 'ఉదయం 10 - సాయంత్రం 6'
            },
            about: {
                title: 'ఎస్టేట్ మిత్రా గురించి',
                subtitle: 'రియల్ ఎస్టేట్‌లో మీ నమ్మకమైన భాగస్వామి, మీకు శ్రేయస్సు వైపు మార్గనిర్దేశం చేస్తుంది.',
                section1Title: 'మా లక్ష్యం',
                section1Text: 'ప్రతిఒక్కరికీ పారదర్శకమైన, అధిక-రాబడి అవకాశాలను అందించడం ద్వారా రియల్ ఎస్టేట్ పెట్టుబడిని ప్రజాస్వామ్యం చేయడం. మా ఖాతాదారుల కోసం మేము సూక్ష్మంగా ప్రణాళికాబద్ధమైన ప్రాజెక్టులు మరియు అచంచలమైన మద్దతు ద్వారా సంపదను నిర్మించడంలో నమ్ముతాము.',
                section2Title: 'మా దృష్టి',
                section2Text: 'భారతదేశంలో అత్యంత విశ్వసనీయమైన మరియు వినూత్నమైన రియల్ ఎస్టేట్ సంపద సృష్టి వేదికగా మారడం, నాణ్యత, కస్టమర్ సంతృప్తి మరియు స్థిరమైన అభివృద్ధికి మా నిబద్ధతకు గుర్తింపు పొందడం.'
            },
            team: {
                title: 'మా బృందాన్ని కలవండి',
                subtitle: 'మా విజయం వెనుక ఉన్న అంకితభావంతో కూడిన నిపుణులు.'
            },
            compare: {
                title: 'ఆస్తులను సరిపోల్చండి',
                subtitle: 'మీరు ఎంచుకున్న ఆస్తుల పక్కపక్క పోలికను వీక్షించండి.',
                selectPrompt: 'పోల్చడానికి 4 ఆస్తుల వరకు ఎంచుకోండి.',
                compareNow: 'ఇప్పుడు సరిపోల్చండి',
                clearAll: 'అన్నీ క్లియర్ చేయండి',
                maxItems: 'మీరు గరిష్టంగా 4 ఆస్తులను పోల్చవచ్చు.',
                feature: 'ఫీచర్'
            },
            footer: { rights: 'అన్ని హక్కులూ ప్రత్యేకించబడినవి.', quickLinks: 'త్వరిత లింకులు' }
        }
    };

    const iconMap = {
        Clubhouse: `<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6.375a.625.625 0 01.625.625v11.25" />`,
        Pool: `<path stroke-linecap="round" stroke-linejoin="round" d="M9.75 2.25h4.5m-4.5 6.25h4.5m-4.5 6.25h4.5m-4.5 6.25h4.5M3.75 3.75h16.5a.75.75 0 01.75.75v15a.75.75 0 01-.75.75H3.75a.75.75 0 01-.75-.75v-15a.75.75 0 01.75-.75z" />`,
        Playground: `<path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 2.13a14.98 14.98 0 00-6.16 12.12m12.12 4.8a14.987 14.987 0 01-8.246 2.34M9.63 2.13A14.987 14.987 0 011.384 4.47" />`,
        Car: `<path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h18" />`,
        Hotel: `<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18h16.5a2.25 2.25 0 012.25 2.25v11.25a2.25 2.25 0 01-2.25 2.25H3.75a2.25 2.25 0 01-2.25-2.25V5.25a2.25 2.25 0 012.25-2.25z" />`,
        Bike: `<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.375L15.625 3.375M12 6.375V20.25m0-13.875L8.375 3.375M12 6.375L14.25 12l-2.25 5.25m0 0l-2.25-5.25L12 6.375zM3.375 19.125c0-3.313 2.687-6 6-6s6 2.687 6 6-2.687 6-6 6-6-2.687-6-6z" />`,
        Gym: `<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />`,
        Garden: `<path stroke-linecap="round" stroke-linejoin="round" d="M20.25 15.75L12 21m0 0l-8.25-5.25M12 21V3.75m0 17.25c-3.032 0-5.5-2.468-5.5-5.5 0-1.33.468-2.553 1.25-3.5m9.25 3.5c.782.947 1.25 2.17 1.25 3.5 0 3.032-2.468 5.5-5.5 5.5" />`,
        Security: `<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.956 11.956 0 0112 3c2.114 0 4.122.593 5.855 1.658a11.96 11.96 0 01-1.855 9.686A11.956 11.956 0 0112 21a11.956 11.956 0 01-5.855-6.658 11.96 11.96 0 01-1.855-9.686A11.956 11.956 0 016 3c1.182 0 2.306.331 3.245.922" />`,
        Road: `<path stroke-linecap="round" stroke-linejoin="round" d="M12.75 3.375v17.25m-6-17.25v17.25M3 3.375h18M3 20.625h18" />`,
        MapPin: `<path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />`,
        WhatsApp: `<path fill-rule="evenodd" clip-rule="evenodd" d="M18.4,5.5c-1.5-1.5-3.6-2.3-5.8-2.3C10.4,3.2,8.3,4,6.8,5.5C5.3,7,4.5,9.1,4.5,11.3c0,2.2,0.8,4.3,2.3,5.8c1.5,1.5,3.6,2.3,5.8,2.3h0.1c2.2,0,4.3-0.8,5.8-2.3c1.5-1.5,2.3-3.6,2.3-5.8C20.8,9.1,20,7,18.4,5.5z M8.1,15.1l-1.3-1.3l2.5-2.5L6.8,8.8l1.3-1.3l2.5,2.5l2.5-2.5l1.3,1.3L11.9,11.3l2.5,2.5l-1.3,1.3l-2.5-2.5L8.1,15.1z" />`,
        LinkedIn: `<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM6 9H2v12h4V9zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>`,
        Plus: `<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />`,
        Check: `<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />`,
        XMark: `<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />`,
    };

    // --- DOM SELECTORS ---
    const dom = {
        body: document.body,
        pages: {
            home: document.getElementById('page-home'),
            projects: document.getElementById('page-projects'),
            projectDetail: document.getElementById('page-project-detail'),
            about: document.getElementById('page-about'),
            team: document.getElementById('page-team'),
            blog: document.getElementById('page-blog'),
            contact: document.getElementById('page-contact'),
            compare: document.getElementById('page-compare'),
            notFound: document.getElementById('page-404'),
        },
        themeSwitcher: document.getElementById('theme-switcher'),
        langEnBtn: document.getElementById('lang-en'),
        langTeBtn: document.getElementById('lang-te'),
        featuredProjectsGrid: document.getElementById('featured-projects-grid'),
        allProjectsGrid: document.getElementById('all-projects-grid'),
        projectFiltersContainer: document.getElementById('project-filters'),
        aboutPageContent: document.getElementById('about-page-content'),
        teamGrid: document.getElementById('team-grid'),
        blogList: document.getElementById('blog-list'),
        contactPageContent: document.getElementById('contact-page-content'),
        compareBar: document.getElementById('compare-bar'),
        compareContent: document.getElementById('compare-content'),
        footerProjectsList: document.getElementById('footer-projects-list'),
        footerPhone: document.getElementById('footer-phone'),
        currentYear: document.getElementById('current-year'),
        mobileMenuToggle: document.getElementById('mobile-menu-toggle'),
        mobileMenu: document.getElementById('mobile-menu'),
        navLinks: document.querySelectorAll('.nav-link'),
        structuredData: document.getElementById('structured-data'),
    };

    // --- SERVICES ---
    const submitLead = async (data) => {
        console.log("Submitting lead data (simulation):", data);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { success: true };
    };

    // --- TEMPLATING & RENDERING ---
    const t = (key) => {
        const keys = key.split('.');
        let result = uiTranslations[state.lang];
        for (const k of keys) {
            result = result[k];
            if (!result) return key;
        }
        return result;
    };

    const createIcon = (name, className = '') => {
        const svgPath = iconMap[name] || `<circle cx="12" cy="12" r="10" />`;
        const fill = name === 'WhatsApp' ? 'currentColor' : 'none';
        return `<svg xmlns="http://www.w3.org/2000/svg" fill="${fill}" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${className}">${svgPath}</svg>`;
    };
    
    const createContactForm = (projectName, container) => {
        const formId = `contact-form-${projectName.replace(/\s+/g, '-')}`;
        const T = uiTranslations[state.lang].contactForm;
        container.innerHTML = `
            <div class="detail-card contact-form" id="${formId}-wrapper">
                <h3>${T.title}</h3>
                <p class="form-subtitle">${T.subtitle}</p>
                <form id="${formId}">
                    <div class="form-group">
                        <label for="name-${formId}">${T.name}</label>
                        <input type="text" id="name-${formId}" name="name" placeholder="${T.namePlaceholder}" required>
                    </div>
                    <div class="form-group">
                        <label for="phone-${formId}">${T.phone}</label>
                        <input type="tel" id="phone-${formId}" name="phone" placeholder="${T.phonePlaceholder}" required pattern="[0-9]{10}">
                    </div>
                    <div class="form-error" id="error-${formId}"></div>
                    <button type="submit" class="form-btn btn-submit">${T.submit}</button>
                </form>
                <div class="form-divider">OR</div>
                <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I'm interested in the project: ${projectName}.`)}" target="_blank" rel="noopener noreferrer" class="form-btn btn-whatsapp">
                    ${createIcon('WhatsApp')}
                    <span>${T.whatsapp}</span>
                </a>
            </div>
        `;

        const form = document.getElementById(formId);
        form.addEventListener('submit', async(e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const errorDiv = document.getElementById(`error-${formId}`);
            const nameInput = form.querySelector('input[name="name"]');
            const phoneInput = form.querySelector('input[name="phone"]');

            errorDiv.textContent = '';
            if (!nameInput.value || !phoneInput.value) {
                errorDiv.textContent = T.error;
                return;
            }
            if (!/^\d{10}$/.test(phoneInput.value)) {
                errorDiv.textContent = T.phoneError;
                return;
            }

            submitBtn.disabled = true;
            submitBtn.textContent = T.submitting;

            const result = await submitLead({
                name: nameInput.value,
                phone: phoneInput.value,
                projectName: projectName,
                timestamp: new Date().toISOString()
            });

            if (result.success) {
                document.getElementById(`${formId}-wrapper`).innerHTML = `<div class="form-success-message">${T.submitted}</div>`;
            } else {
                errorDiv.textContent = 'An error occurred. Please try again.';
                submitBtn.disabled = false;
                submitBtn.textContent = T.submit;
            }
        });
    };

    const createProjectCard = (project) => {
        const amenitiesHtml = project.amenities.slice(0, 3).map(amenity => `
            <div class="amenity-badge">
                ${createIcon(amenity.icon)}
                <span>${amenity.name[state.lang]}</span>
            </div>
        `).join('');

        const moreAmenities = project.amenities.length > 3 ? `<div class="amenity-badge">+ ${project.amenities.length - 3} more</div>` : '';

        const isInCompare = state.comparisonList.includes(project.id);
        
        return `
            <div class="project-card-wrapper">
                <a href="#/projects/${project.id}" class="project-card">
                    <div class="project-card-image">
                        <img src="${project.images[0]}" alt="${project.name.en}" loading="lazy">
                        <div class="project-card-type">${project.type[state.lang]}</div>
                    </div>
                    <div class="project-card-content">
                        <h3>${project.name[state.lang]}</h3>
                        <p class="project-card-location">
                            ${createIcon('MapPin')}
                            ${project.location[state.lang]}
                        </p>
                        <p class="project-card-price">${project.details.price[state.lang]}</p>
                        <div class="project-card-amenities">${amenitiesHtml}${moreAmenities}</div>
                    </div>
                </a>
                <button class="compare-btn ${isInCompare ? 'active' : ''}" data-project-id="${project.id}" aria-label="Add to comparison">
                    ${isInCompare ? createIcon('Check') : createIcon('Plus')}
                </button>
            </div>
        `;
    };

    const renderHomePage = () => {
        const featured = projects.filter(p => p.isFeatured);
        dom.featuredProjectsGrid.innerHTML = featured.map(createProjectCard).join('');
        addCompareButtonListeners(dom.featuredProjectsGrid);
    };

    const renderProjectsPage = () => {
        const projectTypes = ['All', ...Array.from(new Set(projects.map(p => p.type.en)))];
        dom.projectFiltersContainer.innerHTML = projectTypes.map(type => {
             const typeName = type === 'All' ? t('allProjects') : projects.find(p => p.type.en === type).type[state.lang];
             return `<button data-filter="${type}">${typeName}</button>`;
        }).join('');
        
        const filterButtons = dom.projectFiltersContainer.querySelectorAll('button');
        
        const applyFilter = (filter = 'All') => {
            filterButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === filter));
            const filtered = filter === 'All' ? projects : projects.filter(p => p.type.en === filter);
            dom.allProjectsGrid.innerHTML = filtered.map(createProjectCard).join('');
            addCompareButtonListeners(dom.allProjectsGrid);
        };

        dom.projectFiltersContainer.addEventListener('click', e => {
            if (e.target.tagName === 'BUTTON') {
                applyFilter(e.target.dataset.filter);
            }
        });

        applyFilter();
    };

    const renderProjectDetailPage = (id) => {
        const project = projects.find(p => p.id === id);
        if (!project) {
            router(); // Go to 404
            return;
        }

        const detailItems = [
            { label: t('price'), value: project.details.price[state.lang] },
            { label: t('area'), value: `${project.details.propertyArea[state.lang]}${project.details.projectArea ? ` (${project.details.projectArea[state.lang]})` : ''}` },
            { label: t('facing'), value: project.details.facing[state.lang] },
            { label: t('status'), value: project.details.negotiable ? t('negotiable') : t('notNegotiable') },
        ];
        
        const isInCompare = state.comparisonList.includes(project.id);

        dom.pages.projectDetail.innerHTML = `
            <div class="container">
                <div class="project-detail-grid">
                    <div class="project-main-content">
                        <div class="project-gallery">
                            <div class="project-gallery-main">
                                <img src="${project.images[0]}" alt="${project.name.en} main image">
                            </div>
                            <div class="project-gallery-thumbnails">
                                ${project.images.map((img, idx) => `
                                    <img src="${img}" alt="thumbnail ${idx+1}" class="${idx === 0 ? 'active' : ''}" data-src="${img}">
                                `).join('')}
                            </div>
                        </div>
                        <div class="project-content">
                            <div class="project-title-bar">
                                <h1>${project.name[state.lang]}</h1>
                                <button class="btn-compare-detail ${isInCompare ? 'active' : ''}" data-project-id="${project.id}">
                                    ${isInCompare ? createIcon('Check') : createIcon('Plus')} 
                                    <span>${isInCompare ? 'In Compare' : 'Add to Compare'}</span>
                                </button>
                            </div>
                            <p class="location">${project.location[state.lang]}</p>
                            <p class="description">${project.description[state.lang]}</p>
                        </div>
                         ${project.amenities.length > 0 ? `
                        <div class="project-section amenities-section">
                            <h2 data-i18n-key="amenities">${t('amenities')}</h2>
                            <div class="amenities-grid">
                                ${project.amenities.map(a => `
                                    <div class="amenity-item">
                                        ${createIcon(a.icon)}
                                        <span>${a.name[state.lang]}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>` : ''}
                    </div>
                    <div class="detail-sidebar">
                        <div class="detail-card">
                            <h2 data-i18n-key="projectDetails">${t('projectDetails')}</h2>
                            <div class="detail-list">
                                ${detailItems.map(item => `
                                    <div class="detail-item">
                                        <span class="label">${item.label}</span>
                                        <span class="value">${item.value}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        <div id="detail-page-contact-form"></div>
                    </div>
                </div>
                <div class="project-section location-section">
                    <h2 data-i18n-key="location">${t('location')}</h2>
                    <div class="location-grid">
                        <div class="nearby-locations">
                            <h3 data-i18n-key="nearby">${t('nearby')}</h3>
                            <ul class="nearby-list">
                                ${project.nearbyLocations.map(l => `
                                    <li>${createIcon('MapPin')} ${l[state.lang]}</li>
                                `).join('')}
                            </ul>
                        </div>
                        <div class="map-container">
                            <iframe src="${project.gmapsUrl}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Map of ${project.name.en}"></iframe>
                        </div>
                    </div>
                </div>
            </div>`;

        createContactForm(project.name.en, document.getElementById('detail-page-contact-form'));
        
        // Add image gallery logic
        const mainImage = dom.pages.projectDetail.querySelector('.project-gallery-main img');
        const thumbnails = dom.pages.projectDetail.querySelectorAll('.project-gallery-thumbnails img');
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                mainImage.src = thumb.dataset.src;
                thumbnails.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
        });

        // Add compare button listener
        dom.pages.projectDetail.querySelector('.btn-compare-detail').addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.projectId;
            toggleCompare(id);
        });
    };
    
    const renderAboutPage = () => {
        dom.aboutPageContent.innerHTML = `
            <div class="about-section">
                <img src="https://i.imgur.com/2s42m6s.jpg" alt="Estate Mitra team discussion" class="about-image">
                <div class="about-text">
                    <h2 data-i18n-key="about.section1Title">${t('about.section1Title')}</h2>
                    <p data-i18n-key="about.section1Text">${t('about.section1Text')}</p>
                </div>
            </div>
            <div class="about-section reverse">
                <img src="https://i.imgur.com/9OqF6JC.jpg" alt="A modern building representing vision" class="about-image">
                <div class="about-text">
                    <h2 data-i18n-key="about.section2Title">${t('about.section2Title')}</h2>
                    <p data-i18n-key="about.section2Text">${t('about.section2Text')}</p>
                </div>
            </div>
        `;
    };

    const renderTeamPage = () => {
        dom.teamGrid.innerHTML = teamMembers.map(member => `
            <div class="team-card">
                <img src="${member.image}" alt="${member.name}" class="team-card-image" loading="lazy">
                <div class="team-card-content">
                    <h3>${member.name}</h3>
                    <p>${member.role[state.lang]}</p>
                    <a href="${member.linkedin}" target="_blank" rel="noopener noreferrer" class="team-social-link" aria-label="LinkedIn profile of ${member.name}">
                       ${createIcon('LinkedIn')}
                    </a>
                </div>
            </div>
        `).join('');
    };

    const renderBlogPage = () => {
        dom.blogList.innerHTML = blogs.map(blog => `
            <div class="blog-card">
                <img src="${blog.imageUrl}" alt="${blog.title.en}" class="blog-card-image" loading="lazy">
                <div class="blog-card-content">
                    <p class="blog-card-date">${blog.date}</p>
                    <h2 class="blog-card-title">${blog.title[state.lang]}</h2>
                    <p class="blog-card-summary">${blog.summary[state.lang]}</p>
                    <a href="#" class="blog-card-link">${t('blog.readMore')} &rarr;</a>
                </div>
            </div>
        `).join('');
    };

    const renderContactPage = () => {
        dom.contactPageContent.innerHTML = `
            <div class="contact-info-list">
                <div class="contact-info-item">
                    <h3 data-i18n-key="contactPage.phone">${t('contactPage.phone')}</h3>
                    <a href="tel:${WHATSAPP_NUMBER}">${WHATSAPP_NUMBER}</a>
                </div>
                <div class="contact-info-item">
                    <h3 data-i18n-key="contactPage.email">${t('contactPage.email')}</h3>
                    <a href="mailto:info@estatemitra.com">info@estatemitra.com</a>
                </div>
                <div class="contact-info-item">
                    <h3 data-i18n-key="contactPage.address">${t('contactPage.address')}</h3>
                    <p>Estate office, 301 A, GOD Apartments, HB Colony, Visakhapatnam.</p>
                </div>
                <div class="contact-info-item">
                    <h3 data-i18n-key="contactPage.hours">${t('contactPage.hours')}</h3>
                    <p>${t('contactPage.hoursValue')}</p>
                </div>
            </div>
            <div id="contact-page-form"></div>
        `;
        createContactForm('General Inquiry', document.getElementById('contact-page-form'));
    };

    const renderFooter = () => {
        dom.footerProjectsList.innerHTML = projects.slice(0, 4).map(p => `<li><a href="#/projects/${p.id}">${p.name[state.lang]}</a></li>`).join('');
        dom.footerPhone.textContent = WHATSAPP_NUMBER;
    };
    
    // --- COMPARE LOGIC ---

    const renderCompareBar = () => {
        if (state.comparisonList.length === 0) {
            dom.compareBar.classList.add('hidden');
            return;
        }

        const itemsHtml = state.comparisonList.map(id => {
            const project = projects.find(p => p.id === id);
            return `
                <div class="compare-item">
                    <img src="${project.images[0]}" alt="${project.name.en}">
                    <button class="remove-compare-item" data-id="${id}">${createIcon('XMark')}</button>
                </div>
            `;
        }).join('');

        dom.compareBar.innerHTML = `
            <div class="compare-bar-items">
                ${itemsHtml}
            </div>
            <div class="compare-bar-actions">
                <a href="#/compare" class="btn btn-primary">${t('compare.compareNow')} (${state.comparisonList.length})</a>
                <button id="clear-compare-btn" class="btn-clear">${t('compare.clearAll')}</button>
            </div>
        `;
        dom.compareBar.classList.remove('hidden');

        dom.compareBar.querySelector('#clear-compare-btn').addEventListener('click', clearCompareList);
        dom.compareBar.querySelectorAll('.remove-compare-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleCompare(e.currentTarget.dataset.id);
            });
        });
    };
    
    const renderComparePage = () => {
        if (state.comparisonList.length === 0) {
            dom.compareContent.innerHTML = `<p class="text-center">${t('compare.selectPrompt')}</p>`;
            return;
        }

        const compareProjects = state.comparisonList.map(id => projects.find(p => p.id === id));
        const features = ['price', 'propertyArea', 'projectArea', 'facing', 'negotiable'];
        
        const allAmenities = new Set();
        compareProjects.forEach(p => {
            p.amenities.forEach(a => allAmenities.add(a.name.en));
        });

        const headers = compareProjects.map(p => `
            <th>
                <div class="compare-header-content">
                    <img src="${p.images[0]}" alt="${p.name.en}">
                    <h3>${p.name[state.lang]}</h3>
                    <p>${p.location[state.lang]}</p>
                </div>
            </th>
        `).join('');

        const detailRows = features.map(feature => {
            const cells = compareProjects.map(p => {
                let value = p.details[feature] ? (p.details[feature][state.lang] || p.details[feature]) : 'N/A';
                if (feature === 'negotiable') {
                    value = p.details.negotiable ? t('negotiable') : t('notNegotiable');
                }
                return `<td>${value}</td>`;
            }).join('');
            return `<tr><td><strong>${t(feature === 'propertyArea' ? 'area' : feature)}</strong></td>${cells}</tr>`;
        }).join('');

        const amenityRows = [...allAmenities].map(amenityNameEn => {
            const cells = compareProjects.map(p => {
                const hasAmenity = p.amenities.some(a => a.name.en === amenityNameEn);
                return `<td>${hasAmenity ? createIcon('Check', 'check-icon') : createIcon('XMark', 'x-mark-icon')}</td>`;
            }).join('');
            const amenity = projects.flatMap(p => p.amenities).find(a => a.name.en === amenityNameEn);
            return `<tr><td>${amenity.name[state.lang]}</td>${cells}</tr>`;
        }).join('');

        dom.compareContent.innerHTML = `
            <div class="compare-table-wrapper">
                <table class="compare-table">
                    <thead>
                        <tr>
                            <th>${t('compare.feature')}</th>
                            ${headers}
                        </tr>
                    </thead>
                    <tbody>
                        ${detailRows}
                        ${amenityRows.length > 0 ? `<tr><td colspan="${compareProjects.length + 1}" class="section-header">${t('amenities')}</td></tr>${amenityRows}` : ''}
                    </tbody>
                </table>
            </div>
        `;
    };

    const toggleCompare = (projectId) => {
        const index = state.comparisonList.indexOf(projectId);
        if (index > -1) {
            state.comparisonList.splice(index, 1);
        } else {
            if (state.comparisonList.length >= 4) {
                alert(t('compare.maxItems'));
                return;
            }
            state.comparisonList.push(projectId);
        }
        localStorage.setItem('comparisonList', JSON.stringify(state.comparisonList));
        renderCompareBar();
        
        // Re-render current page to update buttons
        router(true);
    };

    const clearCompareList = () => {
        state.comparisonList = [];
        localStorage.removeItem('comparisonList');
        renderCompareBar();
        router(true);
    };

    const addCompareButtonListeners = (container) => {
        container.querySelectorAll('.compare-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleCompare(e.currentTarget.dataset.projectId);
            });
        });
    };


    const updateAllText = () => {
        document.querySelectorAll('[data-i18n-key]').forEach(el => {
            const key = el.getAttribute('data-i18n-key');
            el.textContent = t(key);
        });
    };

    // --- SEO ---
    const updateStructuredData = (type, data) => {
        let schema = {};
        const baseUrl = "https://estatemitra.com/";

        switch(type) {
            case 'Organization':
                schema = {
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Estate Mitra",
                    "url": baseUrl,
                    "logo": `${baseUrl}favicon.ico`
                };
                break;
            case 'LocalBusiness':
                schema = {
                    "@context": "https://schema.org",
                    "@type": "RealEstateAgent",
                    "name": "Estate Mitra",
                    "url": baseUrl,
                    "telephone": WHATSAPP_NUMBER,
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "301 A, GOD Apartments, HB Colony",
                        "addressLocality": "Visakhapatnam",
                        "addressRegion": "AP",
                        "postalCode": "530022",
                        "addressCountry": "IN"
                    },
                    "openingHours": "Mo-Sa 10:00-18:00"
                };
                break;
            case 'RealEstateListing':
                schema = {
                    "@context": "https://schema.org",
                    "@type": "RealEstateListing",
                    "name": data.name.en,
                    "url": `${baseUrl}#/projects/${data.id}`,
                    "image": data.images,
                    "description": data.description.en,
                    "geo": { "@type": "GeoCoordinates", "latitude": "17.78", "longitude": "83.38" }, // Placeholder
                };
                break;
        }
        dom.structuredData.textContent = JSON.stringify(schema);
    };
    
    // --- APP LOGIC & ROUTING ---
    
    const setLanguage = (lang) => {
        state.lang = lang;
        dom.langEnBtn.classList.toggle('active', lang === 'en');
        dom.langTeBtn.classList.toggle('active', lang === 'te');
        updateAllText();
        renderFooter();
        router(true); // Re-render current page
    };

    const setTheme = (theme) => {
        state.theme = theme;
        localStorage.setItem('theme', theme);
        dom.body.classList.toggle('dark-mode', theme === 'dark');
    };
    
    const router = (isUpdate = false) => {
        if(!isUpdate) window.scrollTo(0, 0);

        const path = window.location.hash || '#/';
        
        Object.values(dom.pages).forEach(page => page.classList.add('hidden'));
        dom.body.classList.remove('menu-open');
        
        let pageFound = false;
        let pageTitle = "Estate Mitra - Find Your Future";
        
        if (path === '#/') {
            dom.pages.home.classList.remove('hidden');
            renderHomePage();
            updateStructuredData('Organization');
            pageFound = true;
        } else if (path === '#/projects') {
            dom.pages.projects.classList.remove('hidden');
            renderProjectsPage();
            pageTitle = "Our Projects | Estate Mitra";
            pageFound = true;
        } else if (path.startsWith('#/projects/')) {
            const id = path.split('/')[2];
            const project = projects.find(p => p.id === id);
            if(project){
                dom.pages.projectDetail.classList.remove('hidden');
                renderProjectDetailPage(id);
                pageTitle = `${project.name.en} | Estate Mitra`;
                updateStructuredData('RealEstateListing', project);
                pageFound = true;
            }
        } else if (path === '#/about') {
            dom.pages.about.classList.remove('hidden');
            renderAboutPage();
            pageTitle = "About Us | Estate Mitra";
            pageFound = true;
        } else if (path === '#/team') {
            dom.pages.team.classList.remove('hidden');
            renderTeamPage();
            pageTitle = "Our Team | Estate Mitra";
            pageFound = true;
        } else if (path === '#/blog') {
            dom.pages.blog.classList.remove('hidden');
            renderBlogPage();
            pageTitle = "Blog | Estate Mitra";
            pageFound = true;
        } else if (path === '#/contact') {
            dom.pages.contact.classList.remove('hidden');
            renderContactPage();
            pageTitle = "Contact Us | Estate Mitra";
            updateStructuredData('LocalBusiness');
            pageFound = true;
        } else if (path === '#/compare') {
            dom.pages.compare.classList.remove('hidden');
            renderComparePage();
            pageTitle = "Compare Properties | Estate Mitra";
            pageFound = true;
        }

        if (!pageFound) {
            dom.pages.notFound.classList.remove('hidden');
            pageTitle = "404 Not Found | Estate Mitra";
        }
        document.title = pageTitle;

        // Update active nav link
        const currentPath = path.split('/')[1] || '';
        dom.navLinks.forEach(link => {
            const linkPath = link.getAttribute('href').split('/')[1] || '';
            link.classList.toggle('active', linkPath === currentPath);
        });
    };

    // --- INITIALIZATION ---
    const init = () => {
        setTheme(state.theme);
        renderCompareBar();

        // Set up event listeners
        dom.themeSwitcher.addEventListener('click', () => setTheme(state.theme === 'light' ? 'dark' : 'light'));
        dom.langEnBtn.addEventListener('click', () => setLanguage('en'));
        dom.langTeBtn.addEventListener('click', () => setLanguage('te'));
        dom.mobileMenuToggle.addEventListener('click', () => dom.body.classList.toggle('menu-open'));

        window.addEventListener('hashchange', () => router());
        
        dom.mobileMenu.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-link')) {
                dom.body.classList.remove('menu-open');
            }
        });
        document.querySelector('.main-nav').addEventListener('click', (e) => {
             if (e.target.classList.contains('nav-link')) {
                dom.body.classList.remove('menu-open');
            }
        });

        dom.currentYear.textContent = new Date().getFullYear();
        setLanguage(state.lang);
    };

    init();
});
