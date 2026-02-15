// ============================================================
// Thing of the Week — Item Catalog & Weekly Selection
// ============================================================

var ITEM_CATALOG = [
    // ─── FOOD & DRINK ───
    { name: 'Pizza', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg/250px-Eq_it-na_pizza-margherita_sep2005_sml.jpg', category: 'food' },
    { name: 'Sushi', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Sushi_platter.jpg/250px-Sushi_platter.jpg', category: 'food' },
    { name: 'Tacos', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/250px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg', category: 'food' },
    { name: 'Burger', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cheeseburger.jpg/250px-Cheeseburger.jpg', category: 'food' },
    { name: 'Ice Cream', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Ice_cream_with_whipped_cream%2C_chocolate_syrup%2C_and_a_wafer_%28cropped%29.jpg/250px-Ice_cream_with_whipped_cream%2C_chocolate_syrup%2C_and_a_wafer_%28cropped%29.jpg', category: 'food' },
    { name: 'Ramen', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Shoyu_ramen%2C_at_Kasukabe_Station_%282014.05.05%29_1.jpg/250px-Shoyu_ramen%2C_at_Kasukabe_Station_%282014.05.05%29_1.jpg', category: 'food' },
    { name: 'Croissant', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Croissant-Petr_Kratochvil.jpg/250px-Croissant-Petr_Kratochvil.jpg', category: 'food' },
    { name: 'Steak', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Beef_fillet_steak_with_mushrooms.jpg/250px-Beef_fillet_steak_with_mushrooms.jpg', category: 'food' },
    { name: 'Pad Thai', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Phat_Thai_kung_Chang_Khien_street_stall.jpg/250px-Phat_Thai_kung_Chang_Khien_street_stall.jpg', category: 'food' },
    { name: 'Döner Kebab', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/D%C3%B6ner_kebab_slicing.jpg/250px-D%C3%B6ner_kebab_slicing.jpg', category: 'food' },
    { name: 'Chocolate', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chocolate_%28blue_background%29.jpg/250px-Chocolate_%28blue_background%29.jpg', category: 'food' },
    { name: 'Pancakes', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Foodiesfeed.com_pouring-honey-on-pancakes-with-walnuts.jpg/250px-Foodiesfeed.com_pouring-honey-on-pancakes-with-walnuts.jpg', category: 'food' },
    { name: 'Fries', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/French_Fries.JPG/250px-French_Fries.JPG', category: 'food' },
    { name: 'Dim Sum', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Dim_Sum_Trang.jpg/250px-Dim_Sum_Trang.jpg', category: 'food' },
    { name: 'Curry', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Chicken_tikka_masala_%28cropped%29.jpg/250px-Chicken_tikka_masala_%28cropped%29.jpg', category: 'food' },
    { name: 'Pasta', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/%28Pasta%29_by_David_Adam_Kess_%28pic.2%29.jpg/250px-%28Pasta%29_by_David_Adam_Kess_%28pic.2%29.jpg', category: 'food' },
    { name: 'Waffles', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Waffles_with_Strawberries.jpg/250px-Waffles_with_Strawberries.jpg', category: 'food' },
    { name: 'Nachos', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Nachos-cheese.jpg/250px-Nachos-cheese.jpg', category: 'food' },
    { name: 'Pho', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pho-Beef-Noodles-2008.jpg/250px-Pho-Beef-Noodles-2008.jpg', category: 'food' },
    { name: 'Cheesecake', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Baked_cheesecake_with_raspberries_and_blueberries.jpg/250px-Baked_cheesecake_with_raspberries_and_blueberries.jpg', category: 'food' },
    { name: 'Coffee', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/250px-A_small_cup_of_coffee.JPG', category: 'food' },
    { name: 'Bubble Tea', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Bubble_Tea.png/250px-Bubble_Tea.png', category: 'food' },
    { name: 'Pretzel', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/BrezelnSalz02_%28cropped%29.JPG/250px-BrezelnSalz02_%28cropped%29.JPG', category: 'food' },
    { name: 'Baklava', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Baklava%281%29.png/250px-Baklava%281%29.png', category: 'food' },
    { name: 'Tiramisu', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Tiramisu_-_Raffaele_Diomede.jpg/250px-Tiramisu_-_Raffaele_Diomede.jpg', category: 'food' },
    { name: 'Popcorn', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Popcorn_-_Studio_-_2011.jpg/250px-Popcorn_-_Studio_-_2011.jpg', category: 'food' },
    { name: 'Avocado', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Persea_americana_fruit_2.JPG/250px-Persea_americana_fruit_2.JPG', category: 'food' },
    { name: 'Macarons', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Macarons%2C_March_2011.jpg/250px-Macarons%2C_March_2011.jpg', category: 'food' },
    { name: 'Poutine', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Poutine.JPG/250px-Poutine.JPG', category: 'food' },
    { name: 'Spring Rolls', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Goi_Cuon.jpg/250px-Goi_Cuon.jpg', category: 'food' },
    { name: 'Mochi', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Mochi.jpg/250px-Mochi.jpg', category: 'food' },
    { name: 'Hummus', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Hummus_from_The_Nile.jpg/250px-Hummus_from_The_Nile.jpg', category: 'food' },

    // ─── ANIMALS ───
    { name: 'Cat', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/250px-Cat03.jpg', category: 'animals' },
    { name: 'Dog', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/YellowLabradorLooking_new.jpg/250px-YellowLabradorLooking_new.jpg', category: 'animals' },
    { name: 'Red Panda', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/RedPandaFullBody.JPG/250px-RedPandaFullBody.JPG', category: 'animals' },
    { name: 'Penguin', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Emperor_Penguin_Manchot_empereur.jpg/250px-Emperor_Penguin_Manchot_empereur.jpg', category: 'animals' },
    { name: 'Owl', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Bubo_virginianus_06.jpg/250px-Bubo_virginianus_06.jpg', category: 'animals' },
    { name: 'Fox', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Vulpes_vulpes_ssp_fulvus.jpg/250px-Vulpes_vulpes_ssp_fulvus.jpg', category: 'animals' },
    { name: 'Dolphin', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Tursiops_truncatus_01.jpg/250px-Tursiops_truncatus_01.jpg', category: 'animals' },
    { name: 'Elephant', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/250px-African_Bush_Elephant.jpg', category: 'animals' },
    { name: 'Otter', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Sea_Otter_%28Enhydra_lutris%29_%2825169790524%29_crop.jpg/250px-Sea_Otter_%28Enhydra_lutris%29_%2825169790524%29_crop.jpg', category: 'animals' },
    { name: 'Capybara', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Capybara_%28Hydrochoerus_hydrochaeris%29.JPG/250px-Capybara_%28Hydrochoerus_hydrochaeris%29.JPG', category: 'animals' },
    { name: 'Koala', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Koala_climbing_tree.jpg/250px-Koala_climbing_tree.jpg', category: 'animals' },
    { name: 'Wolf', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Canis_lupus_laying.jpg/250px-Canis_lupus_laying.jpg', category: 'animals' },
    { name: 'Parrot', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Graupapagei_03.jpg/250px-Graupapagei_03.jpg', category: 'animals' },
    { name: 'Turtle', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Florida_Box_Turtle_Digon3_re-edited.jpg/250px-Florida_Box_Turtle_Digon3_re-edited.jpg', category: 'animals' },
    { name: 'Octopus', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Octopus2.jpg/250px-Octopus2.jpg', category: 'animals' },
    { name: 'Raccoon', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Raccoon_Procyon_lotor_2.jpg/250px-Raccoon_Procyon_lotor_2.jpg', category: 'animals' },
    { name: 'Hedgehog', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Igel.JPG/250px-Igel.JPG', category: 'animals' },
    { name: 'Chameleon', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Panther_chameleon_%28Furcifer_pardalis%29_male_Nosy_Be.jpg/250px-Panther_chameleon_%28Furcifer_pardalis%29_male_Nosy_Be.jpg', category: 'animals' },
    { name: 'Sloth', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Bicho-pregui%C3%A7a_3.jpg/250px-Bicho-pregui%C3%A7a_3.jpg', category: 'animals' },
    { name: 'Flamingo', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Flamingos_Laguna_Colorada.jpg/250px-Flamingos_Laguna_Colorada.jpg', category: 'animals' },
    { name: 'Panda', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/250px-Grosser_Panda.JPG', category: 'animals' },
    { name: 'Tiger', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Walking_tiger_female.jpg/250px-Walking_tiger_female.jpg', category: 'animals' },
    { name: 'Axolotl', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/AxolsotlBaby.jpg/250px-AxolsotlBaby.jpg', category: 'animals' },
    { name: 'Jellyfish', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Jelly_cc11.jpg/250px-Jelly_cc11.jpg', category: 'animals' },
    { name: 'Frog', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Frog_on_pond.jpg/250px-Frog_on_pond.jpg', category: 'animals' },
    { name: 'Bee', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/European_honey_bee_extracts_nectar.jpg/250px-European_honey_bee_extracts_nectar.jpg', category: 'animals' },
    { name: 'Seahorse', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Hippocampus.jpg/250px-Hippocampus.jpg', category: 'animals' },
    { name: 'Corgi', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/WelshCorworgi.jpg/250px-WelshCorworgi.jpg', category: 'animals' },
    { name: 'Shark', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/White_shark.jpg/250px-White_shark.jpg', category: 'animals' },

    // ─── SPORTS & ACTIVITIES ───
    { name: 'Soccer', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Soccerball.svg/250px-Soccerball.svg.png', category: 'sports' },
    { name: 'Basketball', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Basketball.png/250px-Basketball.png', category: 'sports' },
    { name: 'Skateboarding', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/BackSmithGrind.jpg/250px-BackSmithGrind.jpg', category: 'sports' },
    { name: 'Surfing', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Surfer_at_the_Cayucos_Pier%2C_Cayucos%2C_CA.jpg/250px-Surfer_at_the_Cayucos_Pier%2C_Cayucos%2C_CA.jpg', category: 'sports' },
    { name: 'Tennis', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Tennis_Racket_and_Balls.jpg/250px-Tennis_Racket_and_Balls.jpg', category: 'sports' },
    { name: 'Snowboarding', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Snowboarder_in_halfpipe.jpg/250px-Snowboarder_in_halfpipe.jpg', category: 'sports' },
    { name: 'Swimming', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Swimming_in_the_ocean.jpg/250px-Swimming_in_the_ocean.jpg', category: 'sports' },
    { name: 'Cycling', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Cycling_-_road.jpg/250px-Cycling_-_road.jpg', category: 'sports' },
    { name: 'Boxing', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Boxing_Tournament_in_Aid_of_King_George%27s_Fund_For_Sailors_at_the_Royal_Naval_Air_Station%2C_Henstridge%2C_Somerset%2C_July_1945_A29806.jpg/250px-Boxing_Tournament_in_Aid_of_King_George%27s_Fund_For_Sailors_at_the_Royal_Naval_Air_Station%2C_Henstridge%2C_Somerset%2C_July_1945_A29806.jpg', category: 'sports' },
    { name: 'Rock Climbing', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Rock_climbing_in_Asturias-2013.jpg/250px-Rock_climbing_in_Asturias-2013.jpg', category: 'sports' },
    { name: 'Table Tennis', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Table_tennis.jpg/250px-Table_tennis.jpg', category: 'sports' },
    { name: 'Golf', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Golf_ball_2.jpg/250px-Golf_ball_2.jpg', category: 'sports' },
    { name: 'Archery', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/ArcheryGermanyEarly1980s-2.jpg/250px-ArcheryGermanyEarly1980s-2.jpg', category: 'sports' },
    { name: 'Ice Skating', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Ice_skating_-_IMG_4773.JPG/250px-Ice_skating_-_IMG_4773.JPG', category: 'sports' },
    { name: 'Bowling', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Bowlerbowling.jpg/250px-Bowlerbowling.jpg', category: 'sports' },
    { name: 'Darts', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Darts_in_a_dartboard.jpg/250px-Darts_in_a_dartboard.jpg', category: 'sports' },
    { name: 'Chess', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Chess_Board.jpg/250px-Chess_Board.jpg', category: 'sports' },
    { name: 'Yoga', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Scorpion_pose_Yoga.jpg/250px-Scorpion_pose_Yoga.jpg', category: 'sports' },
    { name: 'Fencing', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Final_Trophee_Monal_2012_n10.jpg/250px-Final_Trophee_Monal_2012_n10.jpg', category: 'sports' },
    { name: 'Volleyball', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Beach_volleyball_at_the_2012_Summer_Olympics_%287925309806%29.jpg/250px-Beach_volleyball_at_the_2012_Summer_Olympics_%287925309806%29.jpg', category: 'sports' },

    // ─── PLACES & TRAVEL ───
    { name: 'Tokyo', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Skyscrapers_of_Shinjuku_2009_January.jpg/250px-Skyscrapers_of_Shinjuku_2009_January.jpg', category: 'places' },
    { name: 'Paris', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/250px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg', category: 'places' },
    { name: 'New York', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/New_york_times_square-terabytes.jpg/250px-New_york_times_square-terabytes.jpg', category: 'places' },
    { name: 'Iceland', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Seljalandsfoss%2C_Su%C3%B0urland%2C_Islandia%2C_2014-08-16%2C_DD_201-203_HDR.JPG/250px-Seljalandsfoss%2C_Su%C3%B0urland%2C_Islandia%2C_2014-08-16%2C_DD_201-203_HDR.JPG', category: 'places' },
    { name: 'Hawaii', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/NaPali_overlook_Kalalau_Valley.jpg/250px-NaPali_overlook_Kalalau_Valley.jpg', category: 'places' },
    { name: 'Rome', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Colosseum_in_Rome%2C_Italy_-_April_2007.jpg/250px-Colosseum_in_Rome%2C_Italy_-_April_2007.jpg', category: 'places' },
    { name: 'Dubai', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Dubai_Marina_Skyline.jpg/250px-Dubai_Marina_Skyline.jpg', category: 'places' },
    { name: 'Machu Picchu', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Machu_Picchu%2C_Peru.jpg/250px-Machu_Picchu%2C_Peru.jpg', category: 'places' },
    { name: 'Maldives', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Malediwy_a3.jpg/250px-Malediwy_a3.jpg', category: 'places' },
    { name: 'London', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/London_Skyline_%28125508655%29.jpeg/250px-London_Skyline_%28125508655%29.jpeg', category: 'places' },
    { name: 'Grand Canyon', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Dawn_on_the_S_rim_of_the_Grand_Canyon_%288645178272%29.jpg/250px-Dawn_on_the_S_rim_of_the_Grand_Canyon_%288645178272%29.jpg', category: 'places' },
    { name: 'Northern Lights', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Polarlicht_2.jpg/250px-Polarlicht_2.jpg', category: 'places' },
    { name: 'Venice', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Venice_-_Grand_Canal.jpg/250px-Venice_-_Grand_Canal.jpg', category: 'places' },
    { name: 'Santorini', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Fira_on_Santorini.jpg/250px-Fira_on_Santorini.jpg', category: 'places' },
    { name: 'Swiss Alps', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Matterhorn_from_Domh%C3%BCtte_-_2.jpg/250px-Matterhorn_from_Domh%C3%BCtte_-_2.jpg', category: 'places' },
    { name: 'Bali', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Tanah_Lot_Bali_Indonesia.jpg/250px-Tanah_Lot_Bali_Indonesia.jpg', category: 'places' },
    { name: 'Barcelona', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/%CE%A3%CE%B1%CE%B3%CF%81%CE%AC%CE%B4%CE%B1_%CE%A6%CE%B1%CE%BC%CE%AF%CE%BB%CE%B9%CE%B1_2941.jpg/250px-%CE%A3%CE%B1%CE%B3%CF%81%CE%AC%CE%B4%CE%B1_%CE%A6%CE%B1%CE%BC%CE%AF%CE%BB%CE%B9%CE%B1_2941.jpg', category: 'places' },
    { name: 'Amsterdam', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/KeijssersAmsterdam.jpg/250px-KeijsersAmsterdam.jpg', category: 'places' },
    { name: 'Great Wall', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/20090529_Great_Wall_8185.jpg/250px-20090529_Great_Wall_8185.jpg', category: 'places' },
    { name: 'Pyramids', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Kheops-Pyramid.jpg/250px-Kheops-Pyramid.jpg', category: 'places' },

    // ─── MUSIC & INSTRUMENTS ───
    { name: 'Electric Guitar', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/250px-Black_Strat.jpg', category: 'music' },
    { name: 'Piano', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Grand_piano_and_upright_piano.jpg/250px-Grand_piano_and_upright_piano.jpg', category: 'music' },
    { name: 'Drums', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Caisse_claire.jpg/250px-Caisse_claire.jpg', category: 'music' },
    { name: 'Violin', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Violin_VL100.png/250px-Violin_VL100.png', category: 'music' },
    { name: 'Saxophone', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Yamaha_Saxophone_YAS-62.jpg/250px-Yamaha_Saxophone_YAS-62.jpg', category: 'music' },
    { name: 'Turntable', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/DJ_Q-bert_in_France_%28cropped%29.jpg/250px-DJ_Q-bert_in_France_%28cropped%29.jpg', category: 'music' },
    { name: 'Cello', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Cello_front_side.jpg/250px-Cello_front_side.jpg', category: 'music' },
    { name: 'Trumpet', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Trumpet_1.png/250px-Trumpet_1.png', category: 'music' },
    { name: 'Ukulele', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Ukulele1_HiRes.jpg/250px-Ukulele1_HiRes.jpg', category: 'music' },
    { name: 'Harmonica', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Harmonica.jpg/250px-Harmonica.jpg', category: 'music' },

    // ─── MOVIES & TV (concepts, not copyrighted content) ───
    { name: 'Movie Night', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Movie_camera.jpg/250px-Movie_camera.jpg', category: 'entertainment' },
    { name: 'Popcorn Cinema', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Ptuj%2C_city_cinema.jpg/250px-Ptuj%2C_city_cinema.jpg', category: 'entertainment' },
    { name: 'Board Games', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Monopoly_board_on_white_bg.jpg/250px-Monopoly_board_on_white_bg.jpg', category: 'entertainment' },
    { name: 'Video Games', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Xbox-360-S-Controller.png/250px-Xbox-360-S-Controller.png', category: 'entertainment' },
    { name: 'Karaoke', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Karaoke_in_progress.jpg/250px-Karaoke_in_progress.jpg', category: 'entertainment' },
    { name: 'Roller Coaster', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Expedition_Everest.jpg/250px-Expedition_Everest.jpg', category: 'entertainment' },
    { name: 'Fireworks', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Fireworks_in_Jaen_%28Spain%29.jpg/250px-Fireworks_in_Jaen_%28Spain%29.jpg', category: 'entertainment' },
    { name: 'Camping', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Campingtent.jpg/250px-Campingtent.jpg', category: 'entertainment' },
    { name: 'Aquarium', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Osaka_Aquarium2.jpg/250px-Osaka_Aquarium2.jpg', category: 'entertainment' },
    { name: 'Concert', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Crowd_at_concert.jpg/250px-Crowd_at_concert.jpg', category: 'entertainment' },

    // ─── NATURE & WEATHER ───
    { name: 'Sunset', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/250px-GoldenGateBridge-001.jpg', category: 'nature' },
    { name: 'Thunderstorm', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Lightning_over_Oradea_Romania_2.jpg/250px-Lightning_over_Oradea_Romania_2.jpg', category: 'nature' },
    { name: 'Snow', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Snow_Scene_at_Shipka_Pass_2.jpg/250px-Snow_Scene_at_Shipka_Pass_2.jpg', category: 'nature' },
    { name: 'Rainbow', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Double-alaskan-rainbow.jpg/250px-Double-alaskan-rainbow.jpg', category: 'nature' },
    { name: 'Volcano', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Paricutin_30_612.jpg/250px-Paricutin_30_612.jpg', category: 'nature' },
    { name: 'Coral Reef', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Coral_reef_at_palmyra.jpg/250px-Coral_reef_at_palmyra.jpg', category: 'nature' },
    { name: 'Waterfall', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Niagara_Falls_from_American_Side.jpg/250px-Niagara_Falls_from_American_Side.jpg', category: 'nature' },
    { name: 'Cherry Blossoms', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Kenwood_Cherrys_2012.jpg/250px-Kenwood_Cherrys_2012.jpg', category: 'nature' },
    { name: 'Starry Night Sky', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Starsinthesky.jpg/250px-Starsinthesky.jpg', category: 'nature' },
    { name: 'Desert', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Rub_al_Khali_002.JPG/250px-Rub_al_Khali_002.JPG', category: 'nature' },
    { name: 'Rainforest', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Valdivian_temperate_rainforest.jpg/250px-Valdivian_temperate_rainforest.jpg', category: 'nature' },
    { name: 'Full Moon', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Full_Moon_Luc_Viatour.jpg/250px-Full_Moon_Luc_Viatour.jpg', category: 'nature' },
    { name: 'Glacier', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Perito_Moreno_Glacier_Patagonia_Argentina_Luca_Galuzzi_2005.JPG/250px-Perito_Moreno_Glacier_Patagonia_Argentina_Luca_Galuzzi_2005.JPG', category: 'nature' },
    { name: 'Sunflower', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Sunflower_sky_backdrop.jpg/250px-Sunflower_sky_backdrop.jpg', category: 'nature' },
    { name: 'Autumn Leaves', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Maple_trees_in_fall_colors._Stanley_Park.jpg/250px-Maple_trees_in_fall_colors._Stanley_Park.jpg', category: 'nature' },

    // ─── TECHNOLOGY ───
    { name: 'Robot', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/24_Solda%C3%A0_alef_Modell.jpg/250px-24_Solda%C3%A0_alef_Modell.jpg', category: 'tech' },
    { name: 'Drone', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/DJI_Phantom_4_Pro_V2.0.jpg/250px-DJI_Phantom_4_Pro_V2.0.jpg', category: 'tech' },
    { name: 'VR Headset', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Oculus-Rift-CV1-Headset-Front.jpg/250px-Oculus-Rift-CV1-Headset-Front.jpg', category: 'tech' },
    { name: 'Retro Console', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Nintendo-Super-Famicom-Set-FL.jpg/250px-Nintendo-Super-Famicom-Set-FL.jpg', category: 'tech' },
    { name: 'Mechanical Keyboard', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Keyboard_Construction.JPG/250px-Keyboard_Construction.JPG', category: 'tech' },
    { name: 'Telescope', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/100inchHooker.jpg/250px-100inchHooker.jpg', category: 'tech' },
    { name: 'Vinyl Record', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Vinyl_record.jpg/250px-Vinyl_record.jpg', category: 'tech' },
    { name: 'Polaroid Camera', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Polaroid_SX-70.jpg/250px-Polaroid_SX-70.jpg', category: 'tech' },
    { name: 'Game Boy', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Game-Boy-FL.jpg/250px-Game-Boy-FL.jpg', category: 'tech' },
    { name: 'Arcade Machine', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/DSCN1610-centipede-cabinet.jpg/250px-DSCN1610-centipede-cabinet.jpg', category: 'tech' },
    { name: 'Lava Lamp', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Lava_lamp_green.jpg/250px-Lava_lamp_green.jpg', category: 'tech' },
    { name: '3D Printer', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/3D_Printer_-_Tekniska_museet.jpg/250px-3D_Printer_-_Tekniska_museet.jpg', category: 'tech' },

    // ─── VEHICLES & TRANSPORT ───
    { name: 'Sports Car', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/2020_Chevrolet_Corvette_C8_in_Torch_Red%2C_front_9.30.19.jpg/250px-2020_Chevrolet_Corvette_C8_in_Torch_Red%2C_front_9.30.19.jpg', category: 'vehicles' },
    { name: 'Motorcycle', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Kawasaki_Ninja_400_KRT_Edition_%28facelift_model%29_right_side.jpg/250px-Kawasaki_Ninja_400_KRT_Edition_%28facelift_model%29_right_side.jpg', category: 'vehicles' },
    { name: 'Hot Air Balloon', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Hot_air_balloons_over_Cappadocia.JPG/250px-Hot_air_balloons_over_Cappadocia.JPG', category: 'vehicles' },
    { name: 'Sailboat', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Volvo_Ocean_Race_-_Alicante_2008_-_Telefonica_Blue.jpg/250px-Volvo_Ocean_Race_-_Alicante_2008_-_Telefonica_Blue.jpg', category: 'vehicles' },
    { name: 'Space Shuttle', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/STS120LaunchHiRes-edit1.jpg/250px-STS120LaunchHiRes-edit1.jpg', category: 'vehicles' },
    { name: 'Train', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Shinkansen_N700_with_arrow.jpg/250px-Shinkansen_N700_with_arrow.jpg', category: 'vehicles' },
    { name: 'Helicopter', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/HAL_Dhruv_Indian_Air_Force.jpg/250px-HAL_Dhruv_Indian_Air_Force.jpg', category: 'vehicles' },
    { name: 'Submarine', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/USS_Virginia_%28SSN-774%29.jpg/250px-USS_Virginia_%28SSN-774%29.jpg', category: 'vehicles' },
    { name: 'Monster Truck', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Bigfoot_at_a_car_crushing_exhibition.jpg/250px-Bigfoot_at_a_car_crushing_exhibition.jpg', category: 'vehicles' },
    { name: 'Cable Car', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Cable_car_19_on_Hyde_Street%2C_July_2023.JPG/250px-Cable_car_19_on_Hyde_Street%2C_July_2023.JPG', category: 'vehicles' },

    // ─── ART & CULTURE ───
    { name: 'Origami', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Origami-crane.jpg/250px-Origami-crane.jpg', category: 'culture' },
    { name: 'Graffiti', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Graffiti_in_Shoreditch%2C_London_-_Zabou_%2813820948475%29.jpg/250px-Graffiti_in_Shoreditch%2C_London_-_Zabou_%2813820948475%29.jpg', category: 'culture' },
    { name: 'Pottery', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pottery_in_Iran-Lalejin_%2828%29.jpg/250px-Pottery_in_Iran-Lalejin_%2828%29.jpg', category: 'culture' },
    { name: 'Ballet', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Giselle_-Carlotta_Grisi_-1841_-2.jpg/250px-Giselle_-Carlotta_Grisi_-1841_-2.jpg', category: 'culture' },
    { name: 'Calligraphy', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Chinese_calligraphy_-_Guo_Moruo.jpg/250px-Chinese_calligraphy_-_Guo_Moruo.jpg', category: 'culture' },
    { name: 'Manga', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Manga_at_a_store_in_Tokyo.jpg/250px-Manga_at_a_store_in_Tokyo.jpg', category: 'culture' },
    { name: 'Sculpture', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/%27David%27_by_Michelangelo_Fir_JBU005.jpg/250px-%27David%27_by_Michelangelo_Fir_JBU005.jpg', category: 'culture' },
    { name: 'Pixel Art', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Space_invaders_mosaic.jpg/250px-Space_invaders_mosaic.jpg', category: 'culture' },
    { name: 'Photography', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Nikon_D5100.jpg/250px-Nikon_D5100.jpg', category: 'culture' },
    { name: 'Breakdancing', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Breakdance-oldschool.jpg/250px-Breakdance-oldschool.jpg', category: 'culture' },

    // ─── RANDOM / FUN THINGS ───
    { name: 'Napping', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Siesta_del_gat.JPG/250px-Siesta_del_gat.JPG', category: 'random' },
    { name: 'Bubble Wrap', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Bubblewrap.jpg/250px-Bubblewrap.jpg', category: 'random' },
    { name: 'Trampoline', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Trampoline.jpg/250px-Trampoline.jpg', category: 'random' },
    { name: 'Hammock', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Hammock.jpg/250px-Hammock.jpg', category: 'random' },
    { name: 'Lego', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Lego_Color_Bricks.jpg/250px-Lego_Color_Bricks.jpg', category: 'random' },
    { name: 'Snow Globe', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Vienna_snow_globe_1.jpg/250px-Vienna_snow_globe_1.jpg', category: 'random' },
    { name: 'Rubik\'s Cube', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Rubik%27s_cube.svg/250px-Rubik%27s_cube.svg.png', category: 'random' },
    { name: 'Candles', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Candles_in_the_dark.jpg/250px-Candles_in_the_dark.jpg', category: 'random' },
    { name: 'House Plant', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Aloe_vera_-_Aloe_barbadensis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-007.jpg/250px-Aloe_vera_-_Aloe_barbadensis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-007.jpg', category: 'random' },
    { name: 'Puzzle', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Jigsaw_puzzle_01_by_Scouten.jpg/250px-Jigsaw_puzzle_01_by_Scouten.jpg', category: 'random' },
    { name: 'Blanket Fort', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Blanketfort.jpg/250px-Blanketfort.jpg', category: 'random' },
    { name: 'Kite', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Kite_over_High_Line.jpg/250px-Kite_over_High_Line.jpg', category: 'random' },
    { name: 'Bonsai', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Japanese_Black_Pine%2C_bonsai%2C_2011-05-29.jpg/250px-Japanese_Black_Pine%2C_bonsai%2C_2011-05-29.jpg', category: 'random' },
    { name: 'Dream Catcher', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Dreamcatcher.jpg/250px-Dreamcatcher.jpg', category: 'random' },
    { name: 'Disco Ball', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Disco_ball4.jpg/250px-Disco_ball4.jpg', category: 'random' },
    { name: 'Typewriter', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MEK_II-371.jpg/250px-MEK_II-371.jpg', category: 'random' },
    { name: 'Crystal', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Quartz_Br%C3%A9sil.jpg/250px-Quartz_Br%C3%A9sil.jpg', category: 'random' },
    { name: 'Globe', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Terrestrial_globe.jpg/250px-Terrestrial_globe.jpg', category: 'random' },
    { name: 'Compass', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Compass_rose_en_04p.svg/250px-Compass_rose_en_04p.svg.png', category: 'random' },
    { name: 'Treehouse', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Treehouse_in_Geneseo_New_York.jpg/250px-Treehouse_in_Geneseo_New_York.jpg', category: 'random' },

    // ─── FASHION & STYLE ───
    { name: 'Sneakers', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Puma_sneakers.jpg/250px-Puma_sneakers.jpg', category: 'fashion' },
    { name: 'Sunglasses', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Nerd_glasses.svg/250px-Nerd_glasses.svg.png', category: 'fashion' },
    { name: 'Leather Jacket', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ramones_Jacket.jpg/250px-Ramones_Jacket.jpg', category: 'fashion' },
    { name: 'Watch', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Wrist_watch_Tissot.jpg/250px-Wrist_watch_Tissot.jpg', category: 'fashion' },
    { name: 'Beanie', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Knit-cap.jpg/250px-Knit-cap.jpg', category: 'fashion' },
    { name: 'Hoodie', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Hoodie.jpg/250px-Hoodie.jpg', category: 'fashion' },

    // ─── SCIENCE & SPACE ───
    { name: 'Black Hole', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Black_hole_-_Messier_87_crop_max_res.jpg/250px-Black_hole_-_Messier_87_crop_max_res.jpg', category: 'science' },
    { name: 'DNA', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/DNA_orbit_animated.gif/250px-DNA_orbit_animated.gif', category: 'science' },
    { name: 'Saturn', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/250px-Saturn_during_Equinox.jpg', category: 'science' },
    { name: 'Mars', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/250px-OSIRIS_Mars_true_color.jpg', category: 'science' },
    { name: 'Nebula', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Orion_Nebula_-_Hubble_2006_mosaic_18000.jpg/250px-Orion_Nebula_-_Hubble_2006_mosaic_18000.jpg', category: 'science' },
    { name: 'Dinosaur Fossil', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Stego.jpg/250px-Stego.jpg', category: 'science' },
    { name: 'Microscope', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Mikroskop.jpg/250px-Mikroskop.jpg', category: 'science' },
    { name: 'Aurora Borealis', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Aurora_borealis_above_Lyngen%2C_2012_March.jpg/250px-Aurora_borealis_above_Lyngen%2C_2012_March.jpg', category: 'science' },
    { name: 'International Space Station', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/International_Space_Station_after_undocking_of_STS-132.jpg/250px-International_Space_Station_after_undocking_of_STS-132.jpg', category: 'science' },
    { name: 'Lightning', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Lightning3.jpg/250px-Lightning3.jpg', category: 'science' },

    // ─── SEASONS & HOLIDAYS ───
    { name: 'Christmas Tree', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Arbol_de_Navidad_en_la_Plaza_Mayor_de_Madrid.jpg/250px-Arbol_de_Navidad_en_la_Plaza_Mayor_de_Madrid.jpg', category: 'seasonal' },
    { name: 'Halloween', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Jack-o%27-Lantern_2003-10-31.jpg/250px-Jack-o%27-Lantern_2003-10-31.jpg', category: 'seasonal' },
    { name: 'Beach Day', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Onetangi_Beach_-_Waiheke_Island.jpg/250px-Onetangi_Beach_-_Waiheke_Island.jpg', category: 'seasonal' },
    { name: 'Snowman', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Schneemann_im_Rieterpark.jpg/250px-Schneemann_im_Rieterpark.jpg', category: 'seasonal' },
    { name: 'Spring Garden', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Keukenhof_340.JPG/250px-Keukenhof_340.JPG', category: 'seasonal' },
    { name: 'Bonfire', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Campfire_Pinecone.png/250px-Campfire_Pinecone.png', category: 'seasonal' },

    // ─── ARCHITECTURE ───
    { name: 'Castle', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/All_Souls_College_Oxford.jpg/250px-All_Souls_College_Oxford.jpg', category: 'architecture' },
    { name: 'Lighthouse', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Portland_Head_Light%2C_Cape_Elizabeth_ME.jpg/250px-Portland_Head_Light%2C_Cape_Elizabeth_ME.jpg', category: 'architecture' },
    { name: 'Skyscraper', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Burj_Khalifa.jpg/250px-Burj_Khalifa.jpg', category: 'architecture' },
    { name: 'Windmill', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Kinderdijk_Molens.jpg/250px-Kinderdijk_Molens.jpg', category: 'architecture' },
    { name: 'Japanese Garden', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Koishikawa_Korakuen_autumn_2016.jpg/250px-Koishikawa_Korakuen_autumn_2016.jpg', category: 'architecture' },
    { name: 'Library', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Melk_-_Abbey_-_Library.jpg/250px-Melk_-_Abbey_-_Library.jpg', category: 'architecture' },

    // ─── MYTHOLOGY & FANTASY ───
    { name: 'Dragon', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Friedrich-Johann-Justin-Bertuch_Mythical-Creature-Dragon_1806.jpg/250px-Friedrich-Johann-Justin-Bertuch_Mythical-Creature-Dragon_1806.jpg', category: 'fantasy' },
    { name: 'Unicorn', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Offrande_%C3%A0_la_licorne.jpg/250px-Offrande_%C3%A0_la_licorne.jpg', category: 'fantasy' },
    { name: 'Phoenix', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Phoenix_detail_from_Aberdeen_Bestiary.jpg/250px-Phoenix_detail_from_Aberdeen_Bestiary.jpg', category: 'fantasy' },
    { name: 'Kraken', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Giant_octopus_attacks_ship.jpg/250px-Giant_octopus_attacks_ship.jpg', category: 'fantasy' },
    { name: 'Wizard', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Wizard_Oz_1903_No1.jpg/250px-Wizard_Oz_1903_No1.jpg', category: 'fantasy' },
    { name: 'Treasure Chest', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Treasure_chest.jpg/250px-Treasure_chest.jpg', category: 'fantasy' },

    // ─── ADDITIONAL ITEMS (to reach 300+) ───
    { name: 'Milkshake', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Strawberry_milkshake.jpg/250px-Strawberry_milkshake.jpg', category: 'food' },
    { name: 'Donut', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Glazed-Donut.jpg/250px-Glazed-Donut.jpg', category: 'food' },
    { name: 'Cinnamon Roll', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Cinnamon_roll.jpg/250px-Cinnamon_roll.jpg', category: 'food' },
    { name: 'Parrot Fish', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Bicolor_parrotfish.JPG/250px-Bicolor_parrotfish.JPG', category: 'animals' },
    { name: 'Mantis Shrimp', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Mantis_shrimp_from_front.jpg/250px-Mantis_shrimp_from_front.jpg', category: 'animals' },
    { name: 'Butterfly', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Papilio_machaon_butterfly.jpg/250px-Papilio_machaon_butterfly.jpg', category: 'animals' },
    { name: 'Eagle', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Bald_eagle_about_to_fly_in_Alaska_%282016%29.jpg/250px-Bald_eagle_about_to_fly_in_Alaska_%282016%29.jpg', category: 'animals' },
    { name: 'Meteor Shower', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Leonids-33.jpg/250px-Leonids-33.jpg', category: 'science' },
    { name: 'Telescope View', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Hubble_ultra_deep_field_high_rez_edit1.jpg/250px-Hubble_ultra_deep_field_high_rez_edit1.jpg', category: 'science' },
    { name: 'Espresso', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tazzina_di_caff%C3%A8_a_Ventimiglia.jpg/250px-Tazzina_di_caff%C3%A8_a_Ventimiglia.jpg', category: 'food' },
    { name: 'Matcha', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Matcha_Latte.jpg/250px-Matcha_Latte.jpg', category: 'food' },
    { name: 'Hot Chocolate', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Hot_chocolate_in_glass_mug.jpg/250px-Hot_chocolate_in_glass_mug.jpg', category: 'food' },
    { name: 'Smoothie', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Smoothie_Banana-Blueberry.jpg/250px-Smoothie_Banana-Blueberry.jpg', category: 'food' },
    { name: 'Pinball', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Pinball_Wizard%21.jpg/250px-Pinball_Wizard%21.jpg', category: 'entertainment' },
    { name: 'Ferris Wheel', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/London_Eye_-_April_2006.jpg/250px-London_Eye_-_April_2006.jpg', category: 'entertainment' },
    { name: 'Go Karting', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Outdoor_Kart_Racing.jpg/250px-Outdoor_Kart_Racing.jpg', category: 'entertainment' },
    { name: 'Laser Tag', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Laser_game.jpg/250px-Laser_game.jpg', category: 'entertainment' },
    { name: 'Hot Spring', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Grand_Prismatic_Spring_and_Midway_Geyser_Basin_from_above.jpg/250px-Grand_Prismatic_Spring_and_Midway_Geyser_Basin_from_above.jpg', category: 'nature' },
    { name: 'Bamboo Forest', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Bamboo_forest.jpg/250px-Bamboo_forest.jpg', category: 'nature' },
    { name: 'Cliffs', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Cliffs_of_Moher.jpg/250px-Cliffs_of_Moher.jpg', category: 'nature' },
    { name: 'Cave', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Carlsbad_Interior.jpg/250px-Carlsbad_Interior.jpg', category: 'nature' },
    { name: 'Bagpipes', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Bagpiper_in_Edinburgh_001.jpg/250px-Bagpiper_in_Edinburgh_001.jpg', category: 'music' },
    { name: 'Harp', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Harp.png/250px-Harp.png', category: 'music' },
    { name: 'Accordion', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Hohner_Trichord3.jpg/250px-Hohner_Trichord3.jpg', category: 'music' },
    { name: 'Flute', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Western_concert_flute.jpg/250px-Western_concert_flute.jpg', category: 'music' },
    { name: 'Parachuting', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Tandem_paragliding.JPG/250px-Tandem_paragliding.JPG', category: 'sports' },
    { name: 'Scuba Diving', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Scuba_diver_Lembeh.jpg/250px-Scuba_diver_Lembeh.jpg', category: 'sports' },
    { name: 'Kayaking', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Kayaking_in_the_South_of_France.jpg/250px-Kayaking_in_the_South_of_France.jpg', category: 'sports' },
    { name: 'Horseback Riding', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Horseback_riding_in_Luxor_-_Egypt.jpg/250px-Horseback_riding_in_Luxor_-_Egypt.jpg', category: 'sports' },
    { name: 'Badminton', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Badminton_Peter_Gade.jpg/250px-Badminton_Peter_Gade.jpg', category: 'sports' },
    { name: 'Sandcastle', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Elaborate_sandcastle.jpg/250px-Elaborate_sandcastle.jpg', category: 'random' },
    { name: 'Kaleidoscope', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Kaleidoscope_pattern.jpg/250px-Kaleidoscope_pattern.jpg', category: 'random' },
    { name: 'Music Box', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Spieluhr_Weihnachten_fcm.jpg/250px-Spieluhr_Weihnachten_fcm.jpg', category: 'random' },
    { name: 'Hourglass', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Wooden_hourglass_3.jpg/250px-Wooden_hourglass_3.jpg', category: 'random' },
    { name: 'Teddy Bear', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Teddy_bear_-_Fenn_Wright_Manson.jpg/250px-Teddy_bear_-_Fenn_Wright_Manson.jpg', category: 'random' },
    { name: 'Paper Airplane', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Paper_Airplane.png/250px-Paper_Airplane.png', category: 'random' },
    { name: 'Soap Bubbles', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Reflection_in_a_soap_bubble_edit.jpg/250px-Reflection_in_a_soap_bubble_edit.jpg', category: 'random' },
    { name: 'Sewing Machine', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Singer_sewing_machine_table.jpg/250px-Singer_sewing_machine_table.jpg', category: 'random' }
];

// ============================================================
// Seeded PRNG — mulberry32
// ============================================================

function mulberry32(seed) {
    var t = seed | 0;
    return function () {
        t = (t + 0x6D2B79F5) | 0;
        var r = Math.imul(t ^ (t >>> 15), 1 | t);
        r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
        return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
}

function hashString(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
    }
    return hash;
}

// ============================================================
// Week Key — ISO week starting Monday, UTC
// ============================================================

function getWeekKey(date) {
    var d = date ? new Date(date) : new Date();
    // Find the Monday of the current ISO week
    var day = d.getUTCDay(); // 0=Sun, 1=Mon, ...
    var diff = (day === 0 ? -6 : 1) - day;
    var monday = new Date(d);
    monday.setUTCDate(d.getUTCDate() + diff);
    monday.setUTCHours(0, 0, 0, 0);

    // ISO week number
    var year = monday.getUTCFullYear();
    var janFourth = new Date(Date.UTC(year, 0, 4));
    var daysSinceJan4 = Math.floor((monday - janFourth) / 86400000);
    var weekNum = Math.ceil((daysSinceJan4 + janFourth.getUTCDay()) / 7);
    if (weekNum < 1) {
        year--;
        weekNum = 52;
    }

    return year + '-W' + (weekNum < 10 ? '0' : '') + weekNum;
}

function getMondayDate(date) {
    var d = date ? new Date(date) : new Date();
    var day = d.getUTCDay();
    var diff = (day === 0 ? -6 : 1) - day;
    var monday = new Date(d);
    monday.setUTCDate(d.getUTCDate() + diff);
    monday.setUTCHours(0, 0, 0, 0);
    return monday;
}

function getNextMondayUTC(date) {
    var d = date ? new Date(date) : new Date();
    var day = d.getUTCDay();
    var daysUntilMonday = (day === 0 ? 1 : 8 - day);
    var nextMonday = new Date(d);
    nextMonday.setUTCDate(d.getUTCDate() + daysUntilMonday);
    nextMonday.setUTCHours(0, 0, 0, 0);
    return nextMonday;
}

// ============================================================
// Weekly Item Selection — deterministic from week key
// ============================================================

function getWeeklyItems(weekKey) {
    var seed = hashString(weekKey || getWeekKey());
    var rng = mulberry32(seed);

    // Fisher-Yates shuffle with seeded RNG
    var indices = [];
    for (var i = 0; i < ITEM_CATALOG.length; i++) indices.push(i);

    for (var j = indices.length - 1; j > 0; j--) {
        var k = Math.floor(rng() * (j + 1));
        var tmp = indices[j];
        indices[j] = indices[k];
        indices[k] = tmp;
    }

    // Pick first 30
    var items = [];
    for (var n = 0; n < 30 && n < indices.length; n++) {
        var idx = indices[n];
        items.push({
            index: n,
            catalogIndex: idx,
            name: ITEM_CATALOG[idx].name,
            image: ITEM_CATALOG[idx].image,
            category: ITEM_CATALOG[idx].category
        });
    }
    return items;
}

// Export for both browser (global) and Node.js (ESM)
if (typeof window !== 'undefined') {
    window.TierlistItems = {
        ITEM_CATALOG: ITEM_CATALOG,
        getWeekKey: getWeekKey,
        getMondayDate: getMondayDate,
        getNextMondayUTC: getNextMondayUTC,
        getWeeklyItems: getWeeklyItems,
        hashString: hashString,
        mulberry32: mulberry32
    };
}
