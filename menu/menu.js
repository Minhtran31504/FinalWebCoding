$(document).ready(function() {
    // Menu data
    const menuData = {
        appetizers: Array(6).fill(null).map((_, i) => ({
            id: i + 1,
            name: {
                vi: "Risotto nấm",
                us: "Risotto di Funghi"
            },
            description: {
                vi: "Cơm Arborio béo ngậy hòa quyện với hỗn hợp nấm rừng, phô mai Parmesan và một chút dầu nấm truffle",
                us: "Creamy Arborio rice infused with a medley of wild mushrooms, Parmesan cheese, and a hint of truffle oil"
            },
            price: {
                vnd: 600000,
                usd: 24
            },
            image: "https://via.placeholder.com/150",
            rating: 4.6
        })),
        mainCourses: [
            {
                id: 1,
                name: {
                    vi: "Tacos al Pastor",
                    us: "Tacos al Pastor"
                },
                description: {
                    vi: "Thịt heo nướng thơm ngon, đậm đà với các loại gia vị đặc trưng, thịt mềm và mọng nước, kết hợp với vị ngọt nhẹ từ những miếng dứa tươi, bánh tortilla mềm, ấm, tạo nên sự hòa quyện hài hòa giữa vị mặn ngọt và cay nhẹ.",
                    us: "Rich grilled pork, fragrant with typical spices, soft and succulent meat slices, mixed with a slight sweetness from fresh pineapple pieces, soft, warm tortillas, creating a harmonious combination of salty-sweet and mildly spicy."
                },
                price: {
                    vnd: 85000,
                    usd: 3.35
                },
                image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                rating: 4.8
            },
            {
                id: 2,
                name: {
                    vi: "Quesadilla",
                    us: "Quesadilla"
                },
                description: {
                    vi: "Bánh tortilla nướng giòn nhẹ, bên trong là phô mai tan chảy và kéo sợi, trộn với thịt gà hoặc bò mềm, thơm, vị mặn vừa phải. Được phục vụ kèm với salsa cà chua tươi chua chua, cân bằng hoàn hảo cho hương vị.",
                    us: "Lightly crispy grilled tortilla, filled with melted and pulled cheese, mixed with soft, fragrant chicken or beef, moderately salty. Served with sour and sour fresh tomato salsa, perfectly balancing the taste."
                },
                price: {
                    vnd: 80000,
                    usd: 3.15
                },
                image: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                rating: 4.6
            },
            {
                id: 3,
                name: {
                    vi: "Burrito",
                    us: "Burrito"
                },
                description: {
                    vi: "Bánh tortilla mềm, dai được cuộn chặt, bên trong là thịt bò hầm mọng nước, cơm trắng thơm, đậu nghiền béo ngậy, phô mai tan chảy, rau củ ngọt và giòn cùng sốt cay nhẹ, tạo cảm giác no và hài lòng.",
                    us: "Firmly rolled soft chewy tortilla, filled with succulent stewed beef, fragrant white rice, creamy mashed beans, melted cheese, sweet and crispy vegetables and mild spicy sauce, creating a feeling of fullness and satisfaction."
                },
                price: {
                    vnd: 95000,
                    usd: 3.75
                },
                image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
                rating: 4.7
            },
            {
                id: 4,
                name: {
                    vi: "Guacamole với Nachos",
                    us: "Guacamole with Nachos"
                },
                description: {
                    vi: "Sốt bơ tươi mịn màng, béo tự nhiên, thơm từ hành tím, cà chua tươi và rau mùi, chấm với bánh tortilla chiên giòn tan trong miệng, vị béo hòa quyện với vị giòn độc đáo.",
                    us: "Fresh avocado sauce is silky, naturally greasy, fragrant from red onions, fresh tomatoes and coriander, dipped in crispy fried tortillas that melt in your mouth, the fatty taste blends with a unique crunchy taste."
                },
                price: {
                    vnd: 70000,
                    usd: 2.75
                },
                image: "https://images.unsplash.com/photo-1600335895229-6e75511892c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
                rating: 4.5
            },
            {
                id: 5,
                name: {
                    vi: "Tamales",
                    us: "Tamales"
                },
                description: {
                    vi: "Bánh ngô mềm mịn được hấp trong lá chuối thơm nhẹ, bên trong là nhân thịt gà hoặc heo mềm, thơm và mọng nước, vị ngọt tự nhiên từ bột ngô hòa quyện hoàn hảo với hương thơm từ lá gói.",
                    us: "Soft and smooth corn cakes steamed in lightly fragrant banana leaves, filled with rich, soft and succulent chicken or pork, the natural sweetness from the corn flour blends perfectly with the aroma from the wrapping leaves."
                },
                price: {
                    vnd: 90000,
                    usd: 3.55
                },
                image: "https://images.unsplash.com/photo-1617918160302-7c394f905b9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                rating: 4.4
            },
            {
                id: 6,
                name: {
                    vi: "Chiles en Nogada",
                    us: "Chiles en Nogada"
                },
                description: {
                    vi: "Ớt chuông xanh lớn nhồi thịt băm, trái cây khô, có hương vị ngọt mặn hài hòa, phủ sốt kem hạt óc chó thơm béo. Khi thưởng thức, vỏ ớt mềm, nhân thơm ngon tan trong miệng, và hậu vị đặc biệt khó quên.",
                    us: "Large green bell peppers stuffed with minced meat, dried fruit, have a harmonious sweet and salty taste, covered with a rich, fragrant walnut cream sauce. When enjoying it, the chili skin is soft, the delicious filling melts in the mouth, and the aftertaste is especially unforgettable."
                },
                price: {
                    vnd: 120000,
                    usd: 4.70
                },
                image: "https://images.unsplash.com/photo-1562059390-a761a084768e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1419&q=80",
                rating: 4.9
            },
            {
                id: 7,
                name: {
                    vi: "Pozole",
                    us: "Pozole"
                },
                description: {
                    vi: "Súp nóng, nước dùng ngọt tự nhiên từ thịt heo hầm kỹ, hạt ngô lớn mềm, thịt heo mềm, vị cay nhẹ, được phục vụ kèm với rau sống giòn mát và chanh tươi, tạo nên vị sảng khoái trong từng thìa súp.",
                    us: "Hot soup, naturally sweet broth from carefully stewed pork, large soft corn kernels, tender pork, mild spicy taste, served with cool crispy raw vegetables and fresh lemon, creating a refreshing taste in every spoonful of soup."
                },
                price: {
                    vnd: 140000,
                    usd: 5.50
                },
                image: "https://images.unsplash.com/photo-1562967915-92ae0c320a01?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                rating: 4.7
            },
            {
                id: 8,
                name: {
                    vi: "Enchiladas",
                    us: "Enchiladas"
                },
                description: {
                    vi: "Bánh tortilla mềm, bên trong là thịt gà xé mềm, phủ sốt cay thơm, phô mai nướng tan chảy và vị mặn vừa phải, từng miếng như tan trong miệng, tạo nên hương vị ngon khó cưỡng.",
                    us: "Soft tortilla, filled with soft shredded chicken, covered with aromatic spicy sauce, melted grilled cheese and just the right amount of salt, each piece seems to melt in the mouth, creating an irresistible delicious taste."
                },
                price: {
                    vnd: 120000,
                    usd: 4.70
                },
                image: "https://images.unsplash.com/photo-1534352956036-cd81e27dd615?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                rating: 4.6
            },
            {
                id: 9,
                name: {
                    vi: "Mole Poblano",
                    us: "Mole Poblano"
                },
                description: {
                    vi: "Thịt gà mềm tan, hòa quyện với sốt mole đặc, vị ngọt nhẹ từ sô cô la đen, vị cay nhẹ từ ớt, và một chút hương thơm từ vừng rang, tạo nên hương vị phong phú và độc đáo.",
                    us: "Melting tender chicken, mixed with thick mole sauce, light sweetness from dark chocolate, mild spicy flavor from chili, and a bit of aroma from roasted sesame, creating a rich and unique flavor."
                },
                price: {
                    vnd: 175000,
                    usd: 6.90
                },
                image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                rating: 4.8
            },
            {
                id: 10,
                name: {
                    vi: "Bắp Mexico",
                    us: "Mexican Corn"
                },
                description: {
                    vi: "Bắp nướng thơm phức, từng hạt bắp căng mọng, ngọt tự nhiên, phủ mayonnaise béo ngậy, phô mai mặn nhẹ và một chút bột ớt cay kích thích vị giác ngay từ miếng đầu tiên.",
                    us: "Fragrant grilled corn, each grain of corn is plump, naturally sweet, covered with fatty mayonnaise, lightly salty cheese and a little spicy chili powder that stimulates the taste buds right from the first bite."
                },
                price: {
                    vnd: 65000,
                    usd: 2.55
                },
                image: "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                rating: 4.3
            },
            {
                id: 11,
                name: {
                    vi: "Ceviche",
                    us: "Ceviche"
                },
                description: {
                    vi: "Salad cá hoặc tôm tươi ngon, thịt giòn được nấu chín với chanh tươi, trộn với cà chua chua ngọt, hành tím thơm, rau mùi mát, mang lại cảm giác nhẹ nhàng, sảng khoái.",
                    us: "Delicious fresh fish or shrimp salad, crispy meat cooked with fresh lemon, mixed with sweet and sour tomatoes, fragrant purple onions, cool coriander, giving a light, refreshing feeling."
                },
                price: {
                    vnd: 120000,
                    usd: 4.70
                },
                image: "https://images.unsplash.com/photo-1632789395770-20e6f63be806?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                rating: 4.5
            },
            {
                id: 12,
                name: {
                    vi: "Chilaquiles",
                    us: "Chilaquiles"
                },
                description: {
                    vi: "Bánh tortilla chiên giòn được ngâm trong sốt salsa cay nhẹ, trứng chiên béo ngậy tan chảy, phủ kem chua nhẹ, vị béo cân bằng và độ giòn của bánh tortilla tạo cảm giác mới lạ khi thưởng thức.",
                    us: "Crispy fried tortillas are soaked in mild spicy salsa sauce, fatty fried eggs are melted, covered with mild sour cream, the balanced fatty taste and crunchiness of the tortilla create a new feeling when enjoying."
                },
                price: {
                    vnd: 95000,
                    usd: 3.75
                },
                image: "https://images.unsplash.com/photo-1640719028782-8230f1bdc42a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                rating: 4.4
            },
            {
                id: 13,
                name: {
                    vi: "Tostadas",
                    us: "Tostadas"
                },
                description: {
                    vi: "Bánh tortilla chiên giòn, phủ đậu nghiền mềm và béo, thịt gà hoặc cá ngọt và mềm, thêm phô mai và rau tươi giòn, tạo nên các lớp hương vị đa dạng, ngon miệng mà không nhàm chán.",
                    us: "Crispy fried tortillas, covered with soft and fatty refried beans, sweet and tender chicken or fish, and added with cheese and fresh crunchy vegetables, create layers of diverse, delicious flavors without being boring."
                },
                price: {
                    vnd: 90000,
                    usd: 3.55
                },
                image: "https://images.unsplash.com/photo-1611250188496-e966043a0629?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80",
                rating: 4.3
            },
            {
                id: 14,
                name: {
                    vi: "Carnitas",
                    us: "Carnitas"
                },
                description: {
                    vi: "Thịt heo hầm mềm và thơm, các sợi thịt tan ngay trong miệng, được phục vụ với bánh tortilla mềm ấm, hành và rau mùi tươi, tạo nên sự cân bằng hoàn hảo giữa vị béo mềm và vị tươi mát.",
                    us: "Braised pork is tender and fragrant, the meat fibers melt right in the mouth, served with warm soft tortillas, onions and fresh coriander, creating the perfect balance between soft fat and freshness."
                },
                price: {
                    vnd: 120000,
                    usd: 4.70
                },
                image: "https://images.unsplash.com/photo-1593030911380-a9ef8812d72c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                rating: 4.7
            },
            {
                id: 15,
                name: {
                    vi: "Fajitas",
                    us: "Fajitas"
                },
                description: {
                    vi: "Thịt bò hoặc gà xào thơm và mềm, giữ được độ mọng nước, ớt chuông và hành tây xào giòn ngọt, được phục vụ với bánh tortilla mềm nóng, phô mai và kem chua nhẹ, tạo nên trải nghiệm vị giác tuyệt vời.",
                    us: "Stir-fried beef or chicken is fragrant and soft, retains its succulence, stir-fried bell peppers and onions are crispy and sweet, served with soft hot tortillas, cheese and light sour cream, creating a wonderful taste experience."
                },
                price: {
                    vnd: 135000,
                    usd: 5.30
                },
                image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
                rating: 4.6
            },
            {
                id: 16,
                name: {
                    vi: "Empanadas",
                    us: "Empanadas"
                },
                description: {
                    vi: "Bánh chiên giòn và thơm, bên ngoài giòn, bên trong là nhân thịt bò hoặc gà thơm mềm, phô mai béo nhẹ, hòa quyện với vị cay nhẹ của sốt cà chua salsa, hấp dẫn ngay từ miếng đầu tiên.",
                    us: "Crispy and fragrant fried bread, crispy outside, soft fragrant beef or chicken filling, light fatty cheese, mixed with the mild spicy taste of tomato salsa, attractive from the first bite."
                },
                price: {
                    vnd: 85000,
                    usd: 3.35
                },
                image: "https://images.unsplash.com/photo-1604467715878-83e57e8bc129?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                rating: 4.5
            },
            {
                id: 17,
                name: {
                    vi: "Súp Tortilla",
                    us: "Tortilla Soup"
                },
                description: {
                    vi: "Súp cà chua nóng, chua nhẹ và sảng khoái, bánh tortilla chiên giòn, phô mai béo tan chảy, lát bơ mềm và thơm, tạo nên hương vị ấm áp, dễ chịu trong từng thìa.",
                    us: "Hot tomato soup, mildly sour and refreshing, crispy fried tortillas, melted fatty cheese, soft and fragrant avocado slices, creating a warm, pleasant flavor in every spoonful."
                },
                price: {
                    vnd: 95000,
                    usd: 3.75
                },
                image: "https://images.unsplash.com/photo-1623595119708-26b1f7500cca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                rating: 4.4
            },
            {
                id: 18,
                name: {
                    vi: "Trứng Ranchero",
                    us: "Ranchero Eggs"
                },
                description: {
                    vi: "Trứng chiên tan chảy, béo ngậy đặt trên bánh tortilla mềm, giòn, sốt cà chua cay nhẹ, và đậu nghiền thơm, tạo nên sự kết hợp phong phú, bổ dưỡng cho bữa sáng lý tưởng.",
                    us: "Melted, fatty fried eggs topped with soft, crispy tortillas, mildly spicy tomato sauce, and fragrant refried beans, creating a rich, nutritious blend for the ideal breakfast."
                },
                price: {
                    vnd: 100000,
                    usd: 3.95
                },
                image: "https://images.unsplash.com/photo-1600335895229-6e75511892c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
                rating: 4.5
            },
            {
                id: 19,
                name: {
                    vi: "Chubby",
                    us: "Chubby"
                },
                description: {
                    vi: "Bánh tortilla dày chiên vàng, bên ngoài giòn nhẹ, bên trong mềm, nhân thịt heo mềm và thơm, đậu nghiền béo ngậy, phô mai tan chảy, cảm giác hài hòa giữa độ giòn và mềm.",
                    us: "Thick tortillas fried until golden brown, lightly crispy on the outside, soft on the inside, filled with soft and fragrant pork, fatty refried beans, melted cheese, a harmonious feeling between crunchiness and softness."
                },
                price: {
                    vnd: 85000,
                    usd: 3.35
                },
                image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
                rating: 4.4
            }
        ],
        drinks: [
            {
                id: 1,
                name: {
                    vi: "Horchata",
                    us: "Horchata"
                },
                description: {
                    vi: "Thức uống làm từ gạo xay nhuyễn, nước, đường và quế, tạo nên vị ngọt, mát và mùi quế đặc trưng.",
                    us: "A drink made from pureed rice, water, sugar and cinnamon, creating a sweet, cool and characteristic cinnamon scent."
                },
                price: {
                    vnd: 55000,
                    usd: 2.20
                },
                image: "https://images.unsplash.com/photo-1615887625746-f3d2aa27e048?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
                rating: 4.7
            },
            {
                id: 2,
                name: {
                    vi: "Nước hoa Hibiscus",
                    us: "Jamaican water"
                },
                description: {
                    vi: "Nước hoa dâm bụt được làm từ cánh hoa dâm bụt khô, có màu đỏ tươi, vị chua ngọt nhẹ, thường được uống lạnh để giải khát.",
                    us: "Hibiscus flower water is made from dried hibiscus petals, has a bright red color, mild sour and sweet taste, and is often drunk cold to quench thirst."
                },
                price: {
                    vnd: 50000,
                    usd: 1.95
                },
                image: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                rating: 4.5
            },
            {
                id: 3,
                name: {
                    vi: "Tepache",
                    us: "Tepache"
                },
                description: {
                    vi: "Đồ uống lên men nhẹ làm từ vỏ dứa, đường nâu và quế, với vị ngọt, hương thơm dứa và một chút ga, thường được phục vụ lạnh.",
                    us: "A lightly fermented drink made from pineapple peel, brown sugar and cinnamon, with a sweet taste, pineapple aroma and a slight carbonation, usually served cold."
                },
                price: {
                    vnd: 55000,
                    usd: 2.20
                },
                image: "https://images.unsplash.com/photo-1616360151857-3914da25dbe0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                rating: 4.6
            },
            {
                id: 4,
                name: {
                    vi: "Atole",
                    us: "Atole"
                },
                description: {
                    vi: "Đồ uống nóng làm từ bột ngô, nước hoặc sữa, đường và hương liệu như vani hoặc quế, tạo nên thức uống mịn, ấm, thường được dùng vào buổi sáng hoặc tối.",
                    us: "A hot drink made from cornstarch, water or milk, sugar and flavorings such as vanilla or cinnamon, creating a smooth, warm drink, often used in the morning or evening."
                },
                price: {
                    vnd: 60000,
                    usd: 2.35
                },
                image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1421&q=80",
                rating: 4.4
            },
            {
                id: 5,
                name: {
                    vi: "Champurrado",
                    us: "Champurrado"
                },
                description: {
                    vi: "Một biến thể khác của Atole nhưng với sô cô la đen đắng được thêm vào, tạo nên thức uống nóng, mịn, kết hợp hương vị phong phú của ngô và sô cô la, thường được thưởng thức với bánh ngọt.",
                    us: "Another variation of Atole but with bitter dark chocolate added, creating a hot, smooth drink, combining the rich flavors of corn and chocolate, often enjoyed with cakes."
                },
                price: {
                    vnd: 60000,
                    usd: 2.35
                },
                image: "https://images.unsplash.com/photo-1514508985285-52fa488e199a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                rating: 4.8
            },
            {
                id: 6,
                name: {
                    vi: "Coca",
                    us: "Coca"
                },
                description: {
                    vi: "Coca-Cola là thức uống có ga phổ biến với vị ngọt caramel và một chút hương cam quýt, ngon nhất khi uống lạnh.",
                    us: "Coca-Cola is a popular fizzy drink with caramel sweetness and a hint of citrus, best enjoyed chilled."
                },
                price: {
                    vnd: 40000,
                    usd: 1.70
                },
                image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
                rating: 4.5
            },
            {
                id: 7,
                name: {
                    vi: "Fanta",
                    us: "Fanta"
                },
                description: {
                    vi: "Fanta là nước ngọt cam sáng với vị ngọt chua và sự sảng khoái của đồ uống có ga, ngon nhất khi uống lạnh.",
                    us: "Fanta is a bright, orange soda with a sweet, tangy taste and fizzy refreshment, best served ice-cold."
                },
                price: {
                    vnd: 40000,
                    usd: 1.70
                },
                image: "https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
                rating: 4.3
            },
            {
                id: 8,
                name: {
                    vi: "Sprite",
                    us: "Sprite"
                },
                description: {
                    vi: "Sprite là nước ngọt chanh-vôi giòn với hương vị sạch, sảng khoái. Không chứa caffeine, nó mang lại cảm giác sắc nét, sủi bọt làm dịu và giải khát ngay lập tức.",
                    us: "Sprite is a crisp, lemon-lime soda with a clean, refreshing taste. Caffeine-free, it delivers a sharp, fizzy sensation that instantly cools and quenches thirst."
                },
                price: {
                    vnd: 40000,
                    usd: 1.70
                },
                image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
                rating: 4.4
            },
            {
                id: 9,
                name: {
                    vi: "Nước ép dứa tươi",
                    us: "Fresh Pineapple Juice"
                },
                description: {
                    vi: "Nước ép dứa tươi có vị ngọt, chua của trái cây nhiệt đới với màu sắc rực rỡ và kết cấu tươi mát, mọng nước.",
                    us: "Fresh pineapple juice is a sweet, tangy tropical drink with a vibrant color and refreshing, juicy texture."
                },
                price: {
                    vnd: 50000,
                    usd: 2.10
                },
                image: "https://images.unsplash.com/photo-1587157412974-6f6d309455a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                rating: 4.7
            },
            {
                id: 10,
                name: {
                    vi: "Nước cam tươi",
                    us: "Fresh Orange Juice"
                },
                description: {
                    vi: "Nước cam tươi có vị ngọt, chua của trái cây họ cam quýt, giàu vitamin C với kết cấu mịn, có cùi.",
                    us: "Fresh orange juice is a sweet, tangy citrus drink, rich in vitamin C with a smooth, pulpy texture."
                },
                price: {
                    vnd: 50000,
                    usd: 2.10
                },
                image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
                rating: 4.6
            },
            {
                id: 11,
                name: {
                    vi: "Nước ép chanh dây",
                    us: "Passion Fruit Juice"
                },
                description: {
                    vi: "Nước ép chanh dây là thức uống nhiệt đới chua ngọt với sự cân bằng giữa vị chua và ngọt, có màu sắc rực rỡ và kết cấu sảng khoái.",
                    us: "Passion fruit juice is a tangy, tropical drink with a balance of tartness and sweetness, featuring a vibrant color and refreshing texture."
                },
                price: {
                    vnd: 55000,
                    usd: 2.30
                },
                image: "https://images.unsplash.com/photo-1615478503562-ec2d8aa0e24e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
                rating: 4.8
            },
            {
                id: 12,
                name: {
                    vi: "Trà chanh",
                    us: "Lemon Tea"
                },
                description: {
                    vi: "Trà chanh là trà đen thơm với chanh tươi, mang lại hương vị mịn, hơi chua và hương thơm sảng khoái.",
                    us: "Lemon tea is a fragrant black tea with zesty lemon, offering a smooth, slightly tart taste and a refreshing aroma."
                },
                price: {
                    vnd: 45000,
                    usd: 1.90
                },
                image: "https://images.unsplash.com/photo-1556679343-c1306ee3f376?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80",
                rating: 4.5
            }
        ],
        dessert: [
            {
                id: 1,
                name: {
                    vi: "Churros",
                    us: "Churros"
                },
                description: {
                    vi: "Bánh rán giòn, phủ đường và bột quế, thường được phục vụ với sốt sô cô la nóng hoặc kẹo sữa dulce de leche, tạo nên hương vị ngọt ngào và thơm nồng.",
                    us: "Crispy fried cakes, coated with sugar and cinnamon powder, often served with hot chocolate sauce or dulce de leche milk candy, creating a sweet and fragrant flavor."
                },
                price: {
                    vnd: 65000,
                    usd: 2.55
                },
                image: "https://images.unsplash.com/photo-1624371414361-e670efd642e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                rating: 4.7
            },
            {
                id: 2,
                name: {
                    vi: "Bánh Tres Leches",
                    us: "Tres Leches Cake"
                },
                description: {
                    vi: "Bánh bông lan mềm được ngâm trong hỗn hợp ba loại sữa: sữa đặc có đường, sữa bốc hơi và sữa tươi, tạo nên độ ẩm và vị ngọt đặc trưng, thường được phủ kem tươi và trái cây tươi.",
                    us: "Soft sponge cake is soaked in a mixture of three types of milk: sweetened condensed milk, evaporated milk and fresh milk, creating a characteristic moisture and sweetness, often topped with fresh cream and fresh fruit."
                },
                price: {
                    vnd: 70000,
                    usd: 2.75
                },
                image: "https://images.unsplash.com/photo-1602663491496-73f07481dbea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                rating: 4.8
            },
            {
                id: 3,
                name: {
                    vi: "Chè gạo",
                    us: "Rice Pudding"
                },
                description: {
                    vi: "Chè gạo nấu với sữa, đường và quế, tạo nên hương vị ngọt, thơm mùi quế và kết cấu mịn màng, thường được phục vụ lạnh hoặc ấm.",
                    us: "Rice sweet soup cooked with milk, sugar and cinnamon, creating a sweet, cinnamon-scented flavor and smooth texture, is often served cold or warm."
                },
                price: {
                    vnd: 60000,
                    usd: 2.35
                },
                image: "https://images.unsplash.com/photo-1630356221292-a87102916582?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
                rating: 4.5
            },
            {
                id: 4,
                name: {
                    vi: "Bánh rán",
                    us: "Fritters"
                },
                description: {
                    vi: "Bánh rán mỏng, giòn, thường có hình tròn, phủ đường và quế, đôi khi với mật ong hoặc siro sô cô la, tạo nên món tráng miệng giòn và ngọt.",
                    us: "Thin, crispy fried cakes, usually round in shape, coated with sugar and cinnamon, sometimes with honey or chocolate syrup, creating a crunchy and sweet dessert."
                },
                price: {
                    vnd: 60000,
                    usd: 2.35
                },
                image: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
                rating: 4.4
            },
            {
                id: 5,
                name: {
                    vi: "Capirotada",
                    us: "Capirotada"
                },
                description: {
                    vi: "Bánh mì nướng xếp lớp với phô mai, trái cây khô và rưới xi-rô đường nâu hương quế, sau đó nướng, tạo nên hương vị phong phú và kết cấu giòn, thường được phục vụ trong mùa Phục sinh.",
                    us: "The toast layered with cheese, dried fruit and drizzled with cinnamon-flavored brown sugar syrup, then baked, creates a rich flavor and crispy texture and is often served during the Easter season."
                },
                price: {
                    vnd: 65000,
                    usd: 2.55
                },
                image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80",
                rating: 4.6
            },
            {
                id: 6,
                name: {
                    vi: "Bánh Flan Mexico",
                    us: "Flan Mexico"
                },
                description: {
                    vi: "Bánh flan caramel mềm và tan trong miệng, có độ ngọt vừa phải, thơm nhẹ mùi vani và caramel vàng óng, tạo nên hậu vị ngọt ngào, tinh tế, hoàn hảo để kết thúc bữa ăn.",
                    us: "Caramel flan cake is soft and melts in your mouth, has a moderate sweetness, is lightly fragrant with vanilla and golden caramel, creating a sweet, delicate aftertaste, perfect to end the meal."
                },
                price: {
                    vnd: 70000,
                    usd: 2.75
                },
                image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                rating: 4.9
            },
            {
                id: 7,
                name: {
                    vi: "Kem que chanh",
                    us: "Paletas de limon"
                },
                description: {
                    vi: "Kem que chanh kiểu Mexico sảng khoái với hương vị chanh đậm đà, độ ngọt cân bằng và kết cấu mịn, lạnh. Hoàn hảo cho những ngày nóng bức.",
                    us: "A refreshing Mexican-style lemon popsicle with a bold citrus punch, balanced sweetness, and a smooth, icy texture. Perfect for hot days."
                },
                price: {
                    vnd: 60000,
                    usd: 2.30
                },
                image: "https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
                rating: 4.3
            },
            {
                id: 8,
                name: {
                    vi: "Kem que sữa chua dâu",
                    us: "Paletas de yogur con fresa"
                },
                description: {
                    vi: "Kem que dâu tây kiểu Mexico sảng khoái với kết cấu mịn, hơi lạnh và có miếng trái cây thật. Vị ngọt tự nhiên của dâu tây được tăng cường bởi một chút chanh, tạo nên hương vị mọng nước, đậm đà vị dâu. Khi kết hợp với nước cốt chanh, nó mang đến sự cân bằng hoàn hảo giữa vị chua và ngọt, tạo nên món ăn sảng khoái và giải khát.",
                    us: "A refreshing Mexican-style strawberry popsicle with a smooth, slightly icy texture and real fruit bits. The natural sweetness of strawberries is enhanced by a hint of lime, creating a juicy, berry-rich taste. When combined with lemon juice, it offers a perfect balance of tartness and sweetness, making it an invigorating and thirst-quenching treat."
                },
                price: {
                    vnd: 60000,
                    usd: 2.30
                },
                image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1527&q=80",
                rating: 4.5
            },
            {
                id: 9,
                name: {
                    vi: "Kem bắp Mexico",
                    us: "Helado de Elote"
                },
                description: {
                    vi: "Kem bắp ngọt Mexico béo ngậy làm từ bắp tươi, sữa, đường và một chút quế. Nó có vị ngọt tự nhiên nhẹ nhàng với hương vị caramel và vani tinh tế. Kết cấu mịn màng, kết hợp với những miếng bắp dai, tạo nên món ăn đầy hoài niệm nhưng cũng rất đáng thưởng thức.",
                    us: "A rich and creamy Mexican sweet corn ice cream made with fresh corn, milk, sugar, and a hint of cinnamon. It has a mild natural sweetness with subtle caramel and vanilla notes. The velvety texture, combined with chewy corn bits, creates a nostalgic yet indulgent treat."
                },
                price: {
                    vnd: 65000,
                    usd: 2.60
                },
                image: "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
                rating: 4.7
            },
            {
                id: 10,
                name: {
                    vi: "Raspado",
                    us: "Raspado"
                },
                description: {
                    vi: "Món tráng miệng đá bào truyền thống của Mexico được phủ xi-rô trái cây hoặc sốt me. Kết cấu nhẹ, thoáng của nó tan chảy nhanh chóng, giải phóng hương vị trái cây, chua ngọt và đôi khi cay nồng. Hoàn hảo cho những ngày nóng bức, Raspado là món ăn sảng khoái và có thể tùy chỉnh.",
                    us: "A traditional Mexican shaved ice dessert topped with fruit syrup or tamarind sauce. Its light, airy texture melts quickly, releasing fruity, tangy, and sometimes spicy flavors. Perfect for hot days, Raspado is a refreshing and customizable treat."
                },
                price: {
                    vnd: 65000,
                    usd: 2.60
                },
                image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
                rating: 4.6
            }
        ]
    };

    // Language switching functionality
    let currentLanguage = 'us'; // Default language

    // Function to create a menu item HTML
    function createMenuItem(item) {
        // Kiểm tra xem item.name và item.description có phải là đối tượng không
        const name = typeof item.name === 'object' ? (item.name[currentLanguage] || item.name.us) : item.name;
        const description = typeof item.description === 'object' ? (item.description[currentLanguage] || item.description.us) : item.description;
        
        // Định dạng giá theo ngôn ngữ
        const price = currentLanguage === 'vi' ? 
            `${typeof item.price === 'object' ? item.price.vnd.toLocaleString() : (item.price * 25000).toLocaleString()}đ` : 
            `$${typeof item.price === 'object' ? item.price.usd : item.price}`;
        
        // Nút đặt hàng theo ngôn ngữ
        const orderButtonText = currentLanguage === 'vi' ? 'ĐẶT NGAY' : 'ORDER NOW';
        
        return `
            <div class="menu-item">
                <div class="menu-item-image">
                    <img src="${item.image}" alt="${name}">
                    <div class="menu-item-price">${price}</div>
                </div>
                
                <h4 class="menu-item-name">${name}</h4>
                <p class="menu-item-description">${description}</p>
                
                <div class="menu-item-footer">
                    <div class="menu-item-actions">
                        <button class="action-btn">
                            <i class="fa-solid fa-circle-exclamation"></i>
                        </button>
                        <button class="action-btn">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                    <div class="menu-item-rating">
                        ${'★'.repeat(Math.floor(item.rating))}${'☆'.repeat(5 - Math.floor(item.rating))}
                    </div>
                </div>
                
                <button class="order-btn">${orderButtonText}</button>
            </div>
        `;
    }

    // Populate menu sections
    function populateMenuSection(sectionId, items) {
        const menuGrid = $(`#${sectionId} .menu-grid`);
        menuGrid.empty();
        
        items.forEach(item => {
            menuGrid.append(createMenuItem(item));
        });
    }

    // Initialize menu
    populateMenuSection('appetizers', menuData.appetizers);
    populateMenuSection('main-courses', menuData.mainCourses);
    populateMenuSection('drinks', menuData.drinks);
    populateMenuSection('dessert', menuData.dessert);

    // Tab switching functionality
    $('.tab-btn').click(function() {
        $('.tab-btn').removeClass('active');
        $(this).addClass('active');
        
        const category = $(this).data('category');
        
        if (category === 'all') {
            $('.menu-section').show();
        } else {
            $('.menu-section').hide();
            $(`#${category}`).show();
        }
    });

    // Like button functionality
    $(document).on('click', '.fa-heart', function() {
        $(this).toggleClass('fa-regular fa-solid');
        $(this).toggleClass('text-danger');
    });

    // Language switching event handler
    $(document).on('click', '.language-btn', function() {
        currentLanguage = $(this).data('language');
        
        // Refresh all menu sections with new language
        populateMenuSection('appetizers', menuData.appetizers);
        populateMenuSection('main-courses', menuData.mainCourses);
        populateMenuSection('drinks', menuData.drinks);
        populateMenuSection('dessert', menuData.dessert);
        
        // Update UI elements for language
        $('.language-btn').removeClass('active');
        $(this).addClass('active');
    });

    // Chef's Recommendation functionality
    $('.buy-now-btn').click(function() {
        // Xử lý khi người dùng nhấn nút "BUY NOW"
        alert('Đã thêm Risotto ai Funghi vào giỏ hàng của bạn!');
    });

    $('.learn-more-btn').click(function() {
        // Xử lý khi người dùng nhấn nút "LEARN MORE"
        // Có thể chuyển đến trang chi tiết hoặc hiển thị modal
        alert('Xem thêm thông tin về Risotto ai Funghi');
    });

    // Cập nhật phần giới thiệu món ăn theo ngôn ngữ
    function updateRecommendationLanguage() {
        if (currentLanguage === 'vi') {
            $('.recommendation-content h2').html('Món ăn<br>Đầu bếp khuyên dùng hôm nay');
            $('.recommendation-content h3').text('Risotto nấm');
            $('.recommendation-description').text('Cơm Arborio béo ngậy hòa quyện với hỗn hợp nấm rừng, phô mai Parmesan và một chút dầu nấm truffle. Món ăn tinh tế này mang đến một bản giao hưởng của các hương vị, được chế biến tỉ mỉ để nâng tầm trải nghiệm ẩm thực của bạn. Hãy đắm mình trong hương vị Ý, từng thìa thưởng thức đầy thú vị.');
            $('.recommendation-price').text('600.000đ');
            $('.buy-now-btn').text('ĐẶT NGAY');
            $('.learn-more-btn').text('TÌM HIỂU THÊM');
        } else {
            $('.recommendation-content h2').html('Today\'s<br>Chef-Recommended Delight');
            $('.recommendation-content h3').text('Risotto ai Funghi');
            $('.recommendation-description').text('Creamy Arborio rice infused with a medley of wild mushrooms, Parmesan cheese, and a hint of truffle oil. This exquisite dish promises a symphony of flavors, meticulously crafted to elevate your dining experience. Immerse yourself in the taste of Italy, one delightful spoonful at a time.');
            $('.recommendation-price').text('$24');
            $('.buy-now-btn').text('BUY NOW');
            $('.learn-more-btn').text('LEARN MORE');
        }
    }

    // Cập nhật ngôn ngữ cho phần giới thiệu khi chuyển đổi ngôn ngữ
    $(document).on('click', '.language-btn', function() {
        // ... existing language switching code ...
        
        // Cập nhật phần giới thiệu món ăn
        updateRecommendationLanguage();
    });

    // Khởi tạo ngôn ngữ mặc định cho phần giới thiệu
    updateRecommendationLanguage();

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(event) {
        event.preventDefault();
        
        const target = $($.attr(this, 'href'));
        
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 800);
        }
    });
    
    // Update footer copyright year dynamically
    const currentYear = new Date().getFullYear();
    $('.copyright p').text(`COPYRIGHT©ELAMORHUYANH ${currentYear}`);

    // Thêm xử lý sự kiện cho nút dấu chấm than và nút ORDER NOW
    $(document).on('click', '.fa-circle-exclamation, .order-btn', function() {
        // Tìm phần tử menu-item gần nhất
        const menuItem = $(this).closest('.menu-item');
        
        // Lấy thông tin món ăn
        const itemName = menuItem.find('.menu-item-name').text();
        const itemDescription = menuItem.find('.menu-item-description').text();
        const itemPrice = menuItem.find('.menu-item-price').text();
        const itemImage = menuItem.find('img').attr('src');
        const itemRating = menuItem.find('.menu-item-rating').text().length / 2; // Đếm số sao
        
        // Lưu thông tin vào localStorage
        const itemData = {
            name: itemName,
            description: itemDescription,
            price: itemPrice,
            image: itemImage,
            rating: itemRating,
            language: currentLanguage
        };
        
        localStorage.setItem('selectedItem', JSON.stringify(itemData));
        
        // Chuyển hướng đến trang chi tiết
        window.location.href = '../item-details/item-details.html';
    });
});