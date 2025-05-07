INSERT INTO office (id, address, contact_number, city)
VALUES ('9996484d-6b25-4530-8465-f37f4e6bb49b', '1 Independence Ave', '+380441234500', 'Kyiv'),
       ('a5396e3b-e26f-401a-a831-f172105aa07a', '2 Shevchenka Blvd', '+380441234501', 'Lviv'),
       ('cf0e5477-4438-4fb2-a6da-aaf4c17ee757', '3 Hrushevskoho St', '+380441234502', 'Odesa'),
       ('bd8d9e52-bd9a-4135-93ad-f778b91b106c', '4 Soborna St', '+380441234503', 'Khmelnytskyi'),
       ('7bb29c36-823f-43ea-9055-6d52047dff0d', '5 Central Square', '+380441234504',
        'Ivano-Frankivsk');

INSERT INTO worker (id, full_name, contact_number, email, address, position)
VALUES ('9a3b654a-e076-484f-9156-bfb9e71361d4', 'John Smith', '+1234567891',
        'john.smith@rental.com', '100 Worker St', 'MANAGER'),
       ('9809ca53-1569-411f-9d82-9a6b3c1c5da5', 'Sarah Johnson', '+1234567892',
        'sarah.j@rental.com', '101 Worker St', 'ASSISTANT'),
       ('04061920-c86b-4b48-aec0-180e638a07b8', 'Mike Brown', '+1234567893', 'mike.b@rental.com',
        '102 Worker St', 'ASSISTANT'),
       ('e1cb4706-06c3-4de6-b558-31d7a0c6f74c', 'Anna Kovalenko', '+380501234564',
        'anna.k@rental.com', '103 Worker Ln', 'ASSISTANT'),
       ('dda6460d-fc1a-43b8-99f3-612922ea010e', 'Dmytro Petrov', '+380501234565',
        'dmytro.p@rental.com', '104 Worker Ln', 'MANAGER'),
       ('a3f830ad-6606-41b3-9f52-3ad91223904a', 'Olha Shevchenko', '+380501234566',
        'olha.s@rental.com', '105 Worker Ln', 'ASSISTANT'),
       ('db64502c-577e-4a66-a5e2-b233c954c890', 'Oleksii Moroz', '+380501234567',
        'oleksii@email.com', '106 Worker Ln', 'ASSISTANT');

INSERT INTO client (id, full_name, contact_number, email, rating, address, driver_license_number)
VALUES ('4c0e6a0a-dfd1-404c-88d1-1e9c9cc77885', 'Daryna Bondar', '+380987654324',
        'daryna@email.com', 4.7, '203 Client Ave', 'DL456789'),
       ('77b70ebe-835a-4897-bfa2-ed3618032784', 'Ivan Kravets', '+380987654325', 'ivan@email.com',
        4.6, '204 Client Ave', 'DL567890'),
       ('a0ad38ea-88bf-4020-84f1-55d06372ab7e', 'Nadiia Melnyk', '+380987654326',
        'nadiia@email.com', 4.4, '205 Client Ave', 'DL678901'),
       ('a7ae17bb-c999-4806-9c56-991621206fc0', 'Olena Yaremchuk', '+380987654327',
        'olena@email.com', 4.9, '206 Client Ave', 'DL789012'),
       ('7dd15947-58b0-47c6-b158-59d003ddfbc2', 'Roman Shulha', '+380987654328', 'roman@email.com',
        4.3, '207 Client Ave', 'DL890123'),
       ('ac42fc40-d33c-45c3-a410-c22978b8e29d', 'Andrii Zabolotnyi', '+380987654329',
        'andrii@email.com', 4.6, '208 Client Ave', 'DL901234'),
       ('e46e13a4-99f3-49ba-9006-98e172c16e9e', 'Iryna Poliakova', '+380987654330',
        'iryna@email.com', 4.8, '209 Client Ave', 'DL012345'),
       ('ade4c85a-ec6e-429c-b399-fceb499fad5b', 'Taras Hrytsenko', '+380987654331',
        'taras@email.com', 4.7, '210 Client Ave', 'DL123457'),
       ('05490cdd-d051-4010-93c5-cc461f64e2d2', 'Kateryna Melnyk', '+380987654332',
        'kateryna@email.com', 4.5, '211 Client Ave', 'DL234568'),
       ('2a24dd1c-75ad-42cd-8f15-6c0538c3034b', 'Yurii Samofalov', '+380987654333',
        'yurii@email.com', 4.9, '212 Client Ave', 'DL345679'),
       ('39626cce-6d62-4909-a215-d6c83854c243', 'Svitlana Dmytruk', '+380987654334',
        'svitlana@email.com', 4.6, '213 Client Ave', 'DL456780'),
       ('e2faaaa4-8af5-4d52-9a39-79a585d74b03', 'Oksana Verbytska', '+380987654335',
        'oksana@email.com', 4.4, '214 Client Ave', 'DL567891'),
       ('57ba70ba-9549-46dc-a4d2-088483ddd8e9', 'Petro Ivanov', '+380987654336', 'petro@email.com',
        4.7, '215 Client Ave', 'DL678902'),
       ('9216d733-9ebb-4144-b43f-cfd8f3070c3b', 'Maria Lytvyn', '+380987654337', 'maria@email.com',
        4.6, '216 Client Ave', 'DL789013');

INSERT INTO car (id, vin, license_plate_num, color, status, mileage, fuel_type, transmission_type,
                 brand, model, year, category, seats_number, daily_rental_cost, office_id)
VALUES ('49beeb6a-2073-43ef-b4c7-5d833814d77a', '67BDC3F10F8141DCB', 'XYZ-1665', 'Green',
        'MAINTENANCE', '76944.7', 'GASOLINE', 'AUTOMATIC', 'Ford', 'Focus', 2009, 'suv', 4, 156.45,
        '9996484d-6b25-4530-8465-f37f4e6bb49b'),
       ('35f06b82-7cc8-4032-8396-9bbe57045c40', '35633F5150F64394B', 'XYZ-4664', 'Black',
        'AVAILABLE', '154699.1', 'ELECTRIC', 'MANUAL', 'Hyundai', 'Elantra', 2011, 'compact', 2,
        96.85, '9996484d-6b25-4530-8465-f37f4e6bb49b'),
       ('ae8636e5-af3e-4567-ae66-981a29e9147f', 'D59863EDDD3A46B2B', 'JKL-8178', 'Green',
        'AVAILABLE', '174116.0', 'ELECTRIC', 'MANUAL', 'Ford', 'Focus', 2021, 'economy', 2, 99.69,
        '9996484d-6b25-4530-8465-f37f4e6bb49b'),
       ('5a372963-a29f-4d23-85ae-87afb1ca1ab4', 'EB42D75769F040FCA', 'XYZ-7818', 'Red',
        'MAINTENANCE', '139242.5', 'HYBRID', 'AUTOMATIC', 'Ford', 'Focus', 2006, 'truck', 2, 187.00,
        'a5396e3b-e26f-401a-a831-f172105aa07a'),
       ('a96a77ca-0536-4bc2-ab13-cced2a4f3b5f', 'E0B853ED975B41C9A', 'JKL-2860', 'Green',
        'MAINTENANCE', '72512.6', 'HYBRID', 'AUTOMATIC', 'Ford', 'Focus', 2019, 'truck', 2, 61.53,
        '9996484d-6b25-4530-8465-f37f4e6bb49b'),
       ('ac9514e9-3af8-44c7-af5a-fe70d93982e5', '838147E4F29E49E08', 'JKL-3855', 'Silver',
        'AVAILABLE', '95829.1', 'DIESEL', 'AUTOMATIC', 'Nissan', 'Rogue', 2012, 'van', 7, 111.75,
        'cf0e5477-4438-4fb2-a6da-aaf4c17ee757'),
       ('9dc68134-0875-4a36-b6f3-ddd09a8fc469', '491F11E3F2094915B', 'JKL-1193', 'Green',
        'AVAILABLE', '45828.0', 'HYBRID', 'MANUAL', 'Ford', 'Focus', 2013, 'truck', 4, 165.76,
        'cf0e5477-4438-4fb2-a6da-aaf4c17ee757'),
       ('11ed4e59-3dee-4b90-b966-019b25cd24f9', 'E5FC51D9F8E24E61B', 'JKL-4472', 'Red', 'RENTED',
        '31394.9', 'ELECTRIC', 'AUTOMATIC', 'Ford', 'Focus', 2017, 'suv', 3, 195.16,
        'bd8d9e52-bd9a-4135-93ad-f778b91b106c'),
       ('7aa96d0d-fde2-4d0a-b255-bdc27b95a4c4', '4377D26450FA42A48', 'XYZ-6692', 'Blue',
        'MAINTENANCE', '171524.9', 'HYBRID', 'MANUAL', 'Volkswagen', 'Golf', 2006, 'suv', 6, 120.89,
        '7bb29c36-823f-43ea-9055-6d52047dff0d'),
       ('d71f7f67-3de8-4ed8-a0db-b51fd2b002a3', '4EE655364158496F8', 'ABC-2599', 'Red', 'AVAILABLE',
        '78712.3', 'DIESEL', 'AUTOMATIC', 'Volkswagen', 'Golf', 2021, 'truck', 4, 42.40,
        '9996484d-6b25-4530-8465-f37f4e6bb49b'),
       ('27702547-78c0-49c1-b68f-fd966d3cc3b2', '047B27CF5450488F9', 'MNO-6638', 'Blue',
        'AVAILABLE', '139690.7', 'ELECTRIC', 'AUTOMATIC', 'Ford', 'Focus', 2006, 'truck', 4, 145.40,
        'a5396e3b-e26f-401a-a831-f172105aa07a'),
       ('e6e43b4f-c54a-4467-910b-6682d4a8b5fc', '243ABD70659C494C8', 'ABC-3927', 'Silver',
        'AVAILABLE', '111303.6', 'DIESEL', 'MANUAL', 'BMW', 'X5', 2011, 'truck', 6, 86.71,
        '9996484d-6b25-4530-8465-f37f4e6bb49b'),
       ('38d864d3-a57e-4ed0-9649-9d75c91ae88e', 'CFEEDF75E91C4A85B', 'MNO-4393', 'White',
        'AVAILABLE', '123060.9', 'HYBRID', 'MANUAL', 'BMW', 'X5', 2008, 'suv', 7, 168.52,
        'bd8d9e52-bd9a-4135-93ad-f778b91b106c'),
       ('80f7186f-3d3c-4ea2-9de7-85d1129e5c30', '2BD897A8816C42B2B', 'XYZ-8881', 'Silver', 'RENTED',
        '146297.9', 'GASOLINE', 'AUTOMATIC', 'Chevrolet', 'Impala', 2007, 'truck', 3, 38.24,
        '9996484d-6b25-4530-8465-f37f4e6bb49b'),
       ('072c2918-75fa-461a-b57f-4fcc6e6e2e09', 'CC1429C1346C4C95A', 'MNO-3582', 'White',
        'MAINTENANCE', '115583.7', 'ELECTRIC', 'AUTOMATIC', 'Hyundai', 'Elantra', 2022, 'van', 5,
        194.54, '9996484d-6b25-4530-8465-f37f4e6bb49b'),
       ('c66baa29-8c15-4492-877d-800741cdc170', 'F5DE37B147A74B22A', 'MNO-8067', 'Green',
        'AVAILABLE', '101832.4', 'DIESEL', 'MANUAL', 'Chevrolet', 'Impala', 2009, 'van', 7, 103.63,
        'a5396e3b-e26f-401a-a831-f172105aa07a'),
       ('126690fa-a12a-4768-b775-8b2a3ba91032', '6999D91D2A9F4FD7B', 'ABC-5368', 'Green',
        'MAINTENANCE', '159138.7', 'DIESEL', 'AUTOMATIC', 'Tesla', 'Model 3', 2020, 'van', 6,
        158.11, 'cf0e5477-4438-4fb2-a6da-aaf4c17ee757'),
       ('b3e69f58-c45a-4f9e-a5a5-2ea333ebbc2f', '2D74F0F754794374A', 'XYZ-8195', 'Black',
        'MAINTENANCE', '63233.6', 'ELECTRIC', 'MANUAL', 'Honda', 'Civic', 2020, 'economy', 4,
        118.37, '9996484d-6b25-4530-8465-f37f4e6bb49b'),
       ('f089748e-c036-4bea-9a81-041b0537b4ba', 'C07BBC2FA53C47AEB', 'XYZ-7833', 'Silver',
        'AVAILABLE', '82530.4', 'HYBRID', 'AUTOMATIC', 'Kia', 'Sportage', 2020, 'suv', 6, 68.02,
        '9996484d-6b25-4530-8465-f37f4e6bb49b'),
       ('246f9149-cf5e-4876-b1b8-b239d97bc44f', '75DE806BDD4D42439', 'ABC-1987', 'Black',
        'MAINTENANCE', '163389.5', 'ELECTRIC', 'AUTOMATIC', 'Volkswagen', 'Golf', 2005, 'van', 8,
        160.10, 'a5396e3b-e26f-401a-a831-f172105aa07a'),
       ('b3c3f009-1b70-4bca-81ac-44f3e84b3044', 'C6DCC8A30BA5446F9', 'JKL-2937', 'Silver',
        'MAINTENANCE', '52317.1', 'GASOLINE', 'MANUAL', 'Ford', 'Focus', 2006, 'economy', 7, 70.26,
        'a5396e3b-e26f-401a-a831-f172105aa07a'),
       ('31811a79-034f-4b51-8a24-25180158aa93', '5A0ED82F9C364E579', 'XYZ-7835', 'Silver', 'RENTED',
        '67560.6', 'HYBRID', 'MANUAL', 'Honda', 'Civic', 2017, 'suv', 8, 31.52,
        'a5396e3b-e26f-401a-a831-f172105aa07a'),
       ('68d5bb39-22a8-4e52-888a-4dd8b9c81d09', '105C8EED4F6D458D8', 'ABC-8246', 'Green',
        'MAINTENANCE', '61702.6', 'GASOLINE', 'MANUAL', 'Tesla', 'Model 3', 2006, 'compact', 5,
        70.87, 'a5396e3b-e26f-401a-a831-f172105aa07a'),
       ('3d9d87fd-84c5-4b70-b930-6a0cffa57af8', 'A8D47CB3F5E44F1D8', 'ABC-6929', 'White', 'RENTED',
        '129674.3', 'ELECTRIC', 'MANUAL', 'Kia', 'Sportage', 2006, 'compact', 7, 127.82,
        'bd8d9e52-bd9a-4135-93ad-f778b91b106c'),
       ('9b12240a-edee-405e-8ae9-ba6b0b68d6f5', '64DC9001C2C943E88', 'ABC-2632', 'Red', 'AVAILABLE',
        '41499.0', 'GASOLINE', 'AUTOMATIC', 'Toyota', 'Corolla', 2015, 'suv', 3, 33.78,
        'a5396e3b-e26f-401a-a831-f172105aa07a'),
       ('ba6c8b3f-46ac-4cae-9301-c52a2778a60f', '7D493CCC5E5B4984B', 'MNO-7780', 'Black', 'RENTED',
        '135300.2', 'HYBRID', 'MANUAL', 'Kia', 'Sportage', 2022, 'economy', 8, 147.41,
        '7bb29c36-823f-43ea-9055-6d52047dff0d'),
       ('240de771-3985-4798-8635-be09c034d81d', '8A9FBE9E81BF4FEAA', 'JKL-4856', 'Silver', 'RENTED',
        '7253.8', 'GASOLINE', 'MANUAL', 'Nissan', 'Rogue', 2006, 'compact', 7, 166.70,
        '7bb29c36-823f-43ea-9055-6d52047dff0d'),
       ('8ce7fcf2-6e5f-48af-85f9-1d175f07fdac', '5771C66BCBEC4BA5A', 'JKL-5443', 'Red', 'RENTED',
        '67012.1', 'GASOLINE', 'AUTOMATIC', 'Ford', 'Focus', 2016, 'van', 7, 64.27,
        '9996484d-6b25-4530-8465-f37f4e6bb49b'),
       ('3b5ff3aa-7f3c-4eaf-a7a7-ea79850c0a36', '55D9A781CB924CDD8', 'MNO-4143', 'Black',
        'MAINTENANCE', '114.7', 'HYBRID', 'MANUAL', 'Hyundai', 'Elantra', 2021, 'van', 8, 174.05,
        'cf0e5477-4438-4fb2-a6da-aaf4c17ee757'),
       ('6bcecc07-9fdc-47f2-a513-7eb7c62ef7d1', '8F849DE3F7694C3BB', 'ABC-6867', 'Black',
        'MAINTENANCE', '154936.8', 'HYBRID', 'AUTOMATIC', 'Nissan', 'Rogue', 2019, 'economy', 8,
        176.08, '7bb29c36-823f-43ea-9055-6d52047dff0d'),
       ('b8097e90-ef5e-40db-816a-132c946921f7', '251B95D9411041818', 'JKL-2915', 'Green',
        'MAINTENANCE', '66106.7', 'ELECTRIC', 'AUTOMATIC', 'Volkswagen', 'Golf', 2014, 'economy', 6,
        96.96, 'cf0e5477-4438-4fb2-a6da-aaf4c17ee757'),
       ('f29cbcf0-0f4c-46f0-9299-b84a58581023', '9AC346BD0B7C468AB', 'ABC-3798', 'Silver',
        'AVAILABLE', '140336.0', 'DIESEL', 'MANUAL', 'BMW', 'X5', 2013, 'suv', 6, 34.83,
        '7bb29c36-823f-43ea-9055-6d52047dff0d'),
       ('d5a47b51-f288-4ecc-a3a9-a34550ea2959', '30E5502D8CEF4AB89', 'MNO-6150', 'Silver', 'RENTED',
        '92130.8', 'HYBRID', 'AUTOMATIC', 'BMW', 'X5', 2010, 'compact', 4, 174.50,
        'bd8d9e52-bd9a-4135-93ad-f778b91b106c'),
       ('62892a13-b130-43b3-a2e9-bebfb10b4be6', '6D007BCFEEBB4B7BA', 'ABC-8151', 'Blue',
        'MAINTENANCE', '77640.6', 'DIESEL', 'MANUAL', 'Hyundai', 'Elantra', 2011, 'compact', 4,
        153.19, 'cf0e5477-4438-4fb2-a6da-aaf4c17ee757'),
       ('99c79d1d-2a93-4804-816b-39ebb231ddc8', '4E71C96C16DE44BAA', 'XYZ-9857', 'Blue',
        'AVAILABLE', '187127.1', 'ELECTRIC', 'AUTOMATIC', 'Honda', 'Civic', 2008, 'truck', 8, 30.12,
        'a5396e3b-e26f-401a-a831-f172105aa07a'),
       ('caa05ec8-3ab2-4665-a2ce-80333df912b4', '0F3C511DC4494BEEB', 'JKL-5828', 'Silver', 'RENTED',
        '180719.3', 'HYBRID', 'AUTOMATIC', 'BMW', 'X5', 2012, 'economy', 2, 49.98,
        'a5396e3b-e26f-401a-a831-f172105aa07a'),
       ('290ccbbd-52f1-428e-addd-108dca23a973', 'CFE1352D8BB643A7B', 'MNO-5300', 'Silver', 'RENTED',
        '4152.5', 'ELECTRIC', 'MANUAL', 'Nissan', 'Rogue', 2009, 'compact', 8, 35.57,
        'cf0e5477-4438-4fb2-a6da-aaf4c17ee757'),
       ('9c3a98fc-a907-4268-ade6-31f1c5997a55', '2DAA5BBB30734814A', 'ABC-7230', 'Silver', 'RENTED',
        '91258.6', 'DIESEL', 'MANUAL', 'Nissan', 'Rogue', 2013, 'van', 3, 105.49,
        '9996484d-6b25-4530-8465-f37f4e6bb49b'),
       ('064612d3-ea44-4848-9783-58778ecfce8b', 'A797D177FD3A4AA8B', 'MNO-5665', 'Red', 'AVAILABLE',
        '23821.9', 'ELECTRIC', 'MANUAL', 'BMW', 'X5', 2020, 'suv', 3, 182.14,
        '7bb29c36-823f-43ea-9055-6d52047dff0d'),
       ('8086a1e1-3030-4525-9e39-735c638d8f9b', 'A50A8EE552E04B409', 'MNO-3708', 'Silver',
        'MAINTENANCE', '9386.6', 'DIESEL', 'MANUAL', 'Chevrolet', 'Impala', 2020, 'suv', 6, 146.28,
        'a5396e3b-e26f-401a-a831-f172105aa07a'),
       ('1630b89f-35a9-4539-be20-77df7ac448a2', '742E8C82CA76467EB', 'MNO-9217', 'Silver',
        'AVAILABLE', '18380.3', 'GASOLINE', 'AUTOMATIC', 'Honda', 'Civic', 2018, 'van', 2, 127.31,
        'bd8d9e52-bd9a-4135-93ad-f778b91b106c'),
       ('36e73898-4fd7-4a16-a4e6-0ff2da6885db', 'E09B91DA47394763B', 'ABC-4383', 'White',
        'MAINTENANCE', '44488.1', 'ELECTRIC', 'MANUAL', 'Kia', 'Sportage', 2020, 'compact', 4,
        181.45, '9996484d-6b25-4530-8465-f37f4e6bb49b'),
       ('5a0b3e7a-9057-4246-964c-535cd1cedec9', '615FBAC71BF847699', 'XYZ-5951', 'Black',
        'MAINTENANCE', '46996.7', 'GASOLINE', 'MANUAL', 'Honda', 'Civic', 2020, 'van', 2, 126.16,
        'a5396e3b-e26f-401a-a831-f172105aa07a'),
       ('2035d73b-5adb-4701-b0be-8de0c5065dd2', 'D31AB0BAA9AF4E8CA', 'XYZ-5274', 'Red',
        'MAINTENANCE', '41617.6', 'HYBRID', 'MANUAL', 'Tesla', 'Model 3', 2005, 'truck', 2, 83.88,
        'cf0e5477-4438-4fb2-a6da-aaf4c17ee757'),
       ('73640028-c714-4a4a-a0bf-65f4512dfc78', '8DB1C6C31E8F4E878', 'MNO-8561', 'White', 'RENTED',
        '78012.4', 'DIESEL', 'AUTOMATIC', 'Volkswagen', 'Golf', 2006, 'suv', 7, 52.90,
        'cf0e5477-4438-4fb2-a6da-aaf4c17ee757'),
       ('a420674b-bf38-42f8-a113-2bae8e012c12', '329D4B775C3B4E8BB', 'XYZ-3228', 'Black', 'RENTED',
        '71933.6', 'DIESEL', 'AUTOMATIC', 'Chevrolet', 'Impala', 2005, 'van', 7, 177.40,
        'bd8d9e52-bd9a-4135-93ad-f778b91b106c'),
       ('0b142df2-766c-4845-908b-386c029be70e', 'ECAC8E115F7B44718', 'MNO-8270', 'Green', 'RENTED',
        '129535.7', 'HYBRID', 'AUTOMATIC', 'Tesla', 'Model 3', 2022, 'truck', 7, 159.83,
        '9996484d-6b25-4530-8465-f37f4e6bb49b'),
       ('b16a9e01-82eb-4212-a5bb-155f367f092a', '2B230D1BB9BB4B368', 'MNO-7595', 'Green',
        'AVAILABLE', '107406.3', 'HYBRID', 'AUTOMATIC', 'Kia', 'Sportage', 2013, 'economy', 8,
        142.70, 'bd8d9e52-bd9a-4135-93ad-f778b91b106c'),
       ('ef393077-1898-42b1-a20e-2893bc883e97', 'C318A31EA2D947F79', 'ABC-7437', 'Black', 'RENTED',
        '20286.7', 'GASOLINE', 'MANUAL', 'Honda', 'Civic', 2006, 'suv', 7, 120.00,
        '7bb29c36-823f-43ea-9055-6d52047dff0d'),
       ('a220e4ad-934e-4203-a405-ff351db7ed25', '36F540DC6DDF4D8BB', 'MNO-5420', 'Blue',
        'AVAILABLE', '161715.4', 'ELECTRIC', 'AUTOMATIC', 'Ford', 'Focus', 2008, 'suv', 2, 180.23,
        'cf0e5477-4438-4fb2-a6da-aaf4c17ee757'),
       ('fadf4bf8-08c9-48d0-befa-58dee5dedfaf', 'VDRHLFYCX8OHPLBRX', 'FUE-2603', 'Red', 'RENTED',
        '170155.5', 'DIESEL', 'AUTOMATIC', 'Ford', 'Focus', 2011, 'truck', 5, 44.68,
        'cf0e5477-4438-4fb2-a6da-aaf4c17ee757')
        ,
       ('1b5098c3-23fd-41b8-840d-2353e00a746f', 'OKQZ31F58ICWECD9Z', 'DXA-1008', 'Green',
        'MAINTENANCE', '161879.0', 'HYBRID', 'MANUAL', 'Honda', 'Civic', 2017, 'compact', 6, 66.52,
        '9996484d-6b25-4530-8465-f37f4e6bb49b')
        ,
       ('834f1a8c-069a-47ee-9c3c-71237aa008c1', '0VM9QJ3L1B2CUP3FH', 'CET-4831', 'White',
        'MAINTENANCE', '150931.9', 'DIESEL', 'AUTOMATIC', 'Honda', 'Civic', 2016, 'van', 3, 78.59,
        '7bb29c36-823f-43ea-9055-6d52047dff0d')
        ,
       ('06ffa276-6ea0-4016-923d-b5b5637b6978', '70CHOAX3OP5QXEPXH', 'KIS-6316', 'White', 'RENTED',
        '84146.8', 'GASOLINE', 'MANUAL', 'Hyundai', 'Elantra', 2010, 'van', 2, 137.82,
        '7bb29c36-823f-43ea-9055-6d52047dff0d')
        ,
       ('f75ae6a9-c0a4-41b1-a3a7-4aa76e5db961', 'TUBL8UHX5A1ZKAZTN', 'BWI-7064', 'Green', 'RENTED',
        '41498.8', 'DIESEL', 'MANUAL', 'Nissan', 'Rogue', 2015, 'van', 6, 57.11,
        'bd8d9e52-bd9a-4135-93ad-f778b91b106c')
        ,
       ('81c6df1e-486d-4a7d-9799-47d35751a9a6', '0WMHFVOL03VCK82A4', 'RAN-7125', 'Silver',
        'MAINTENANCE', '144375.9', 'ELECTRIC', 'AUTOMATIC', 'Ford', 'Focus', 2006, 'van', 8, 32.61,
        'cf0e5477-4438-4fb2-a6da-aaf4c17ee757')
        ,
       ('e978b42f-2e80-450c-b1fd-6695a92eac06', '1BAURE3UD8H3N0QCG', 'KDX-2654', 'Red',
        'MAINTENANCE', '15988.7', 'ELECTRIC', 'AUTOMATIC', 'Chevrolet', 'Impala', 2005, 'economy',
        7, 118.72, 'a5396e3b-e26f-401a-a831-f172105aa07a')
        ,
       ('a15153af-c724-4d97-ad15-1f461a9994ab', 'YHBFEJCN8P1XDIE6I', 'CNG-4167', 'Green',
        'MAINTENANCE', '38415.1', 'DIESEL', 'AUTOMATIC', 'Honda', 'Civic', 2020, 'truck', 7, 60.22,
        'cf0e5477-4438-4fb2-a6da-aaf4c17ee757')
        ,
       ('9daa7019-e1cf-4f36-ab38-aa569499949a', '67LFLG4ICA0YED2MB', 'UNZ-4037', 'Blue',
        'MAINTENANCE', '24302.2', 'GASOLINE', 'AUTOMATIC', 'Ford', 'Focus', 2008, 'compact', 5,
        183.3, '7bb29c36-823f-43ea-9055-6d52047dff0d')
        ,
       ('424df473-8b8d-4d84-be33-ae4c645a3cf5', 'E9S99JM5506Y7W6QY', 'ALA-3264', 'Blue',
        'AVAILABLE', '88881.2', 'HYBRID', 'AUTOMATIC', 'Kia', 'Sportage', 2005, 'suv', 5, 117.16,
        '9996484d-6b25-4530-8465-f37f4e6bb49b')
        ,
       ('c67da197-3c39-431a-8b80-2c14e50941a2', 'T13AUEMUJIHB5JMBH', 'NYP-5414', 'Silver',
        'MAINTENANCE', '133485.6', 'GASOLINE', 'MANUAL', 'Honda', 'Civic', 2020, 'truck', 3, 99.22,
        '9996484d-6b25-4530-8465-f37f4e6bb49b')
        ,
       ('651e9e37-a19b-4e09-b64c-efbeb91e8ca0', 'JKRGFZXSR4HOLTDYW', 'WEJ-7363', 'Green',
        'MAINTENANCE', '142329.2', 'GASOLINE', 'AUTOMATIC', 'Chevrolet', 'Impala', 2019, 'economy',
        5, 141.94, 'a5396e3b-e26f-401a-a831-f172105aa07a')
        ,
       ('2d73c558-5209-4129-a328-5a443eb1e074', 'DTLXJUWUHRZUELKLE', 'JVC-8740', 'Red', 'RENTED',
        '94992.6', 'GASOLINE', 'MANUAL', 'Volkswagen', 'Golf', 2017, 'suv', 6, 110.44,
        '7bb29c36-823f-43ea-9055-6d52047dff0d')
        ,
       ('31422611-cfff-4b4e-9537-ff55acb0e88e', 'QAFMNC46J7DNP6SY4', 'IYX-9779', 'White',
        'AVAILABLE', '112290.6', 'DIESEL', 'AUTOMATIC', 'Ford', 'Focus', 2005, 'suv', 2, 76.89,
        'a5396e3b-e26f-401a-a831-f172105aa07a')
        ,
       ('aaadf79e-71b2-48a4-9faf-a603512d47c1', 'R77FQWAJKK36CX8ZF', 'OKM-8652', 'Silver',
        'AVAILABLE', '104077.5', 'ELECTRIC', 'AUTOMATIC', 'Hyundai', 'Elantra', 2011, 'truck', 3,
        45.92, '9996484d-6b25-4530-8465-f37f4e6bb49b')
        ,
       ('1abaa26d-3393-4b97-a032-3cf612209707', 'MORW5C103S19VDOPF', 'TEJ-5916', 'Silver',
        'MAINTENANCE', '156888.6', 'ELECTRIC', 'AUTOMATIC', 'Hyundai', 'Elantra', 2015, 'compact',
        7, 105.75, 'cf0e5477-4438-4fb2-a6da-aaf4c17ee757')
        ,
       ('158cabde-5f40-44f0-ac48-88e8658c7b3a', '09BATW4MNPLA13O5S', 'HVK-6938', 'White',
        'MAINTENANCE', '117506.8', 'GASOLINE', 'MANUAL', 'Hyundai', 'Elantra', 2006, 'van', 4,
        32.64, '7bb29c36-823f-43ea-9055-6d52047dff0d')
        ,
       ('77b2aaad-1d4b-4d6f-81dc-e1337d3fe7f1', 'OYWJ7K701B9YUGR9T', 'MQK-2508', 'Silver',
        'MAINTENANCE', '20024.2', 'GASOLINE', 'AUTOMATIC', 'Hyundai', 'Elantra', 2012, 'truck', 7,
        120.07, 'a5396e3b-e26f-401a-a831-f172105aa07a')
        ,
       ('737f3524-5b37-4290-ac6a-2e08432100d4', '12RQS2WMFBGLQBDLZ', 'IVW-5245', 'Silver',
        'MAINTENANCE', '75802.7', 'GASOLINE', 'MANUAL', 'Ford', 'Focus', 2008, 'van', 6, 185.51,
        '9996484d-6b25-4530-8465-f37f4e6bb49b')
        ,
       ('b2457809-39b1-43ec-8226-9867597c8414', 'J4D7J98VKBURAL6DY', 'SVQ-8146', 'Red', 'RENTED',
        '34847.7', 'ELECTRIC', 'MANUAL', 'Tesla', 'Model 3', 2010, 'economy', 8, 120.34,
        '9996484d-6b25-4530-8465-f37f4e6bb49b')
        ,
       ('c0fa28af-5b1e-451a-b2ac-ec1a7496a3cd', '24PVI4L36TC5KT1X6', 'WJQ-7728', 'Black',
        'AVAILABLE', '13074.9', 'GASOLINE', 'AUTOMATIC', 'Chevrolet', 'Impala', 2008, 'compact', 2,
        147.16, '7bb29c36-823f-43ea-9055-6d52047dff0d')
        ,
       ('7b7b34f2-817c-49e7-9467-7a510f061e89', 'DSRK81BQQ8NI1OIWG', 'KLB-6109', 'Green', 'RENTED',
        '33918.6', 'DIESEL', 'AUTOMATIC', 'Toyota', 'Corolla', 2011, 'truck', 2, 143.73,
        'a5396e3b-e26f-401a-a831-f172105aa07a')
        ,
       ('799717bf-afd0-484c-b6d1-e4ed5099b16e', 'CNFU3HO7KMTUVHIEZ', 'LJH-1424', 'Silver', 'RENTED',
        '45567.3', 'GASOLINE', 'MANUAL', 'BMW', 'X5', 2015, 'compact', 7, 125.92,
        'cf0e5477-4438-4fb2-a6da-aaf4c17ee757')
        ,
       ('aff3eb9e-bfe0-47e3-9b06-1ceb60c75168', 'MZP75HDOXFYI9Z6V3', 'HSH-3849', 'Silver',
        'AVAILABLE', '197483.9', 'DIESEL', 'AUTOMATIC', 'Nissan', 'Rogue', 2009, 'truck', 4, 123.61,
        '9996484d-6b25-4530-8465-f37f4e6bb49b')
        ,
       ('1aa80996-6933-44d2-86ef-d740aff67a65', 'M36FRDRU8BVJOR6T6', 'GEP-6742', 'Green', 'RENTED',
        '171237.2', 'HYBRID', 'AUTOMATIC', 'Volkswagen', 'Golf', 2006, 'truck', 4, 192.91,
        'a5396e3b-e26f-401a-a831-f172105aa07a')
        ,
       ('514d9259-7f2c-4c57-866c-e69647616b55', '1AB15CV5QZZREW2MZ', 'MWP-5074', 'Silver',
        'MAINTENANCE', '101153.3', 'ELECTRIC', 'MANUAL', 'Ford', 'Focus', 2017, 'truck', 4, 49.29,
        '9996484d-6b25-4530-8465-f37f4e6bb49b')
        ,
       ('cab08872-d099-4cab-9521-890d6f3da61d', '66FEO9XAWJUG8TVZY', 'GNT-7154', 'Silver',
        'MAINTENANCE', '131068.2', 'HYBRID', 'MANUAL', 'Volkswagen', 'Golf', 2015, 'economy', 3,
        111.12, 'bd8d9e52-bd9a-4135-93ad-f778b91b106c')
        ,
       ('bc2cd9a0-572b-4164-a623-d2a9bad809f2', 'DBIVD62KQHTEJ7ZGA', 'UUC-2206', 'Blue',
        'AVAILABLE', '118194.2', 'GASOLINE', 'AUTOMATIC', 'Tesla', 'Model 3', 2020, 'suv', 6,
        128.82, 'cf0e5477-4438-4fb2-a6da-aaf4c17ee757')
        ,
       ('0b8ad698-8d2b-4b2a-8cc3-d67a7e20fdf8', 'V2BOGYIH1WQU6XQFI', 'GZF-4446', 'Green',
        'AVAILABLE', '142821.5', 'GASOLINE', 'MANUAL', 'Hyundai', 'Elantra', 2022, 'economy', 3,
        198.08, 'cf0e5477-4438-4fb2-a6da-aaf4c17ee757')
        ,
       ('32724f70-9b3b-4d63-a667-7ae5b52c3dd5', 'CVDQ17GFR17NZVNOK', 'BCV-5202', 'White',
        'MAINTENANCE', '141173.4', 'HYBRID', 'AUTOMATIC', 'Honda', 'Civic', 2008, 'truck', 2,
        168.72, 'cf0e5477-4438-4fb2-a6da-aaf4c17ee757')
        ,
       ('0eb9b949-be80-44d6-90b5-95d8beb511ad', 'SK8I3MVDL994LCLZL', 'VGA-9543', 'Red',
        'MAINTENANCE', '13179.7', 'ELECTRIC', 'MANUAL', 'Honda', 'Civic', 2019, 'suv', 4, 185.71,
        '9996484d-6b25-4530-8465-f37f4e6bb49b')
        ,
       ('ce5c2f88-21a1-41b9-8315-13d14f497267', 'J4E0Q6FHJNYVHU1GE', 'VUO-4522', 'Silver',
        'MAINTENANCE', '54139.9', 'GASOLINE', 'MANUAL', 'Toyota', 'Corolla', 2007, 'economy', 4,
        73.61, 'bd8d9e52-bd9a-4135-93ad-f778b91b106c')
        ,
       ('e8978584-cb87-475f-8aa9-4f8f0a1cf72b', 'ICFXA161MJIMXUF3M', 'HMM-1249', 'White',
        'MAINTENANCE', '135574.5', 'HYBRID', 'MANUAL', 'Kia', 'Sportage', 2006, 'economy', 2, 64.55,
        'cf0e5477-4438-4fb2-a6da-aaf4c17ee757')
        ,
       ('6f0fb89a-b28f-4d3f-9c91-d2d5dce30491', 'A8IFDJAVEJBMI9GKP', 'HXA-1528', 'Black', 'RENTED',
        '77354.8', 'DIESEL', 'AUTOMATIC', 'Volkswagen', 'Golf', 2020, 'truck', 6, 178.12,
        'bd8d9e52-bd9a-4135-93ad-f778b91b106c')
        ,
       ('46ae30af-dc12-45c8-931f-410d9db1fc8a', 'PMNYVV4DFPZFATG6Q', 'QEF-2423', 'Green', 'RENTED',
        '65434.9', 'HYBRID', 'AUTOMATIC', 'Ford', 'Focus', 2022, 'compact', 8, 118.58,
        'bd8d9e52-bd9a-4135-93ad-f778b91b106c')
        ,
       ('624d6911-33bc-49ac-968d-e58a246bb267', 'DTVQR9DQPVNY2A987', 'NOK-5197', 'Blue', 'RENTED',
        '74311.6', 'HYBRID', 'AUTOMATIC', 'Chevrolet', 'Impala', 2020, 'compact', 7, 126.66,
        'bd8d9e52-bd9a-4135-93ad-f778b91b106c')
        ,
       ('adec299e-94f9-4967-9d59-60d8c28dc71f', 'DOEE4MRZ2XX5ASZDS', 'MBI-7805', 'Blue', 'RENTED',
        '115440.7', 'GASOLINE', 'MANUAL', 'Ford', 'Focus', 2010, 'truck', 4, 116.74,
        '9996484d-6b25-4530-8465-f37f4e6bb49b')
        ,
       ('8b0ee4e0-fee6-4036-a6c5-b41cf61319f8', 'LSTS2Z44X8NDZELR5', 'QZE-7786', 'Black',
        'MAINTENANCE', '140027.1', 'HYBRID', 'AUTOMATIC', 'Nissan', 'Rogue', 2016, 'economy', 4,
        72.49, '7bb29c36-823f-43ea-9055-6d52047dff0d')
        ,
       ('00425ce8-13a6-4e74-ad57-0a8bad7a62b2', 'XBLW74O7JBTH36ZAN', 'SMW-5512', 'Black',
        'MAINTENANCE', '65542.4', 'HYBRID', 'AUTOMATIC', 'Ford', 'Focus', 2014, 'suv', 2, 97.74,
        '7bb29c36-823f-43ea-9055-6d52047dff0d')
        ,
       ('e8f1affb-bf5c-4cdf-8908-4947529dd526', 'BWVQEWPSW2NV1PELV', 'THN-6178', 'Green', 'RENTED',
        '128875.0', 'HYBRID', 'MANUAL', 'Hyundai', 'Elantra', 2021, 'truck', 6, 33.96,
        '7bb29c36-823f-43ea-9055-6d52047dff0d')
        ,
       ('d87b7b47-f141-4597-be3b-7376fce96045', 'Q42MBHMCXXIVZV7B1', 'FLD-4587', 'Red', 'RENTED',
        '75707.8', 'GASOLINE', 'AUTOMATIC', 'Chevrolet', 'Impala', 2012, 'van', 4, 198.89,
        'a5396e3b-e26f-401a-a831-f172105aa07a')
        ,
       ('8ffda148-3d2c-4c3f-8948-587921902a30', '692EAD39Z4DRHCVVR', 'VKT-7600', 'Black',
        'MAINTENANCE', '37545.0', 'ELECTRIC', 'MANUAL', 'Chevrolet', 'Impala', 2011, 'compact', 5,
        158.16, 'bd8d9e52-bd9a-4135-93ad-f778b91b106c')
        ,
       ('68dd72ac-c575-4634-b6e1-330b9e6f1441', 'H7UQTX9CSMAHJVXIY', 'ASI-9505', 'Black',
        'AVAILABLE', '98588.8', 'DIESEL', 'AUTOMATIC', 'Nissan', 'Rogue', 2021, 'truck', 7, 144.27,
        '7bb29c36-823f-43ea-9055-6d52047dff0d')
        ,
       ('b7b4f68b-16cd-4124-9be5-322dd32d1f1a', '9MQDZN1NNE4B8I82W', 'GZE-8034', 'Green', 'RENTED',
        '144483.3', 'HYBRID', 'MANUAL', 'Tesla', 'Model 3', 2009, 'suv', 3, 131.1,
        '9996484d-6b25-4530-8465-f37f4e6bb49b')
        ,
       ('7523d520-d42a-43af-b26c-a5d277608a15', 'MQZ6NEJ1X8QKYM6R5', 'RSQ-2057', 'Red', 'AVAILABLE',
        '22461.3', 'HYBRID', 'MANUAL', 'Hyundai', 'Elantra', 2010, 'compact', 4, 94.7,
        'a5396e3b-e26f-401a-a831-f172105aa07a')
        ,
       ('1af9caa8-e6d2-4506-a6db-0898068ef028', 'V4AER9B1EZ2L4LOHZ', 'XVT-1139', 'White',
        'AVAILABLE', '152934.9', 'HYBRID', 'AUTOMATIC', 'Tesla', 'Model 3', 2012, 'compact', 8,
        121.82, 'bd8d9e52-bd9a-4135-93ad-f778b91b106c')
        ,
       ('92c223b9-3e14-42ba-b05f-86d65141e0b4', '8EXHA0ZY769AIKTR4', 'MWB-8671', 'Red', 'RENTED',
        '161712.0', 'GASOLINE', 'AUTOMATIC', 'Chevrolet', 'Impala', 2021, 'van', 3, 132.3,
        'cf0e5477-4438-4fb2-a6da-aaf4c17ee757')
        ,
       ('b69e9938-b570-4894-8c36-fdbf50b65129', 'EPHQ6OEF02OWWTDTX', 'ODN-5048', 'Silver', 'RENTED',
        '31666.0', 'DIESEL', 'MANUAL', 'BMW', 'X5', 2020, 'economy', 3, 106.79,
        'cf0e5477-4438-4fb2-a6da-aaf4c17ee757')
        ,
       ('c3753b14-724b-4a0f-b556-4ffd0e2e092a', '90Z3YFDU76AIEQUC6', 'RUZ-4155', 'Green',
        'MAINTENANCE', '187849.8', 'HYBRID', 'AUTOMATIC', 'Toyota', 'Corolla', 2021, 'truck', 5,
        85.36, '7bb29c36-823f-43ea-9055-6d52047dff0d')
        ,
       ('fae40d62-30b7-4469-af19-8da4c29c910a', 'AAUSKF0XV667ESE2K', 'JDS-9857', 'Red',
        'MAINTENANCE', '41400.7', 'HYBRID', 'AUTOMATIC', 'Honda', 'Civic', 2010, 'economy', 4,
        145.17, 'bd8d9e52-bd9a-4135-93ad-f778b91b106c')
        ,
       ('3d957af1-2dfe-456f-8322-82f657adc2bc', '0CXRHZ0DIKD1WBK3G', 'LEE-4579', 'Blue',
        'AVAILABLE', '137746.5', 'DIESEL', 'MANUAL', 'BMW', 'X5', 2016, 'compact', 6, 112.24,
        '9996484d-6b25-4530-8465-f37f4e6bb49b')
        ,
       ('d7d1cbf1-614f-44de-83e7-5c16094b9f85', '274KKQZ2EPMZDY81E', 'EOA-1152', 'Green', 'RENTED',
        '188953.5', 'HYBRID', 'AUTOMATIC', 'Tesla', 'Model 3', 2020, 'van', 3, 194.97,
        '9996484d-6b25-4530-8465-f37f4e6bb49b')
        ,
       ('119d4ab9-0fe9-436d-a75f-d2f6304fa9ca', '3JVHW4C796J63CCO4', 'YQW-8769', 'Black',
        'AVAILABLE', '77938.0', 'GASOLINE', 'MANUAL', 'Nissan', 'Rogue', 2006, 'compact', 5, 102.59,
        'a5396e3b-e26f-401a-a831-f172105aa07a')
        ,
       ('97a915d8-8f71-4d3f-b506-6a036297b62f', 'VKKCQ2R2JB7FHLMYX', 'ZBI-4161', 'Red', 'AVAILABLE',
        '136115.1', 'HYBRID', 'AUTOMATIC', 'Toyota', 'Corolla', 2020, 'compact', 6, 96.39,
        '7bb29c36-823f-43ea-9055-6d52047dff0d')
        ,
       ('655a564c-b1ee-40eb-a311-2bbebb3dbcfd', 'USD8KJUDYDMMMF94N', 'YFO-9666', 'Red', 'RENTED',
        '89907.4', 'ELECTRIC', 'AUTOMATIC', 'Nissan', 'Rogue', 2013, 'suv', 5, 197.22,
        '9996484d-6b25-4530-8465-f37f4e6bb49b')
        ,
       ('59d28c97-9b25-4858-b98d-00f6d59881b6', '2RM7F6ZUKJMVMHE3L', 'QOL-1318', 'Green', 'RENTED',
        '93221.5', 'DIESEL', 'MANUAL', 'Tesla', 'Model 3', 2021, 'van', 2, 163.89,
        'a5396e3b-e26f-401a-a831-f172105aa07a')
        ,
       ('646ae67b-ea9e-4655-86cb-32c1a8ff4ef7', '47D65N7EJJIU40QKP', 'ZBU-8997', 'Silver',
        'MAINTENANCE', '174817.9', 'ELECTRIC', 'MANUAL', 'Chevrolet', 'Impala', 2016, 'truck', 8,
        172.41, '9996484d-6b25-4530-8465-f37f4e6bb49b')
        ,
       ('9418fb49-27ad-4af5-b021-2b18c03a44f4', 'YTBH79LO1108IP3UB', 'CUQ-6056', 'Black',
        'MAINTENANCE', '87612.7', 'GASOLINE', 'MANUAL', 'Nissan', 'Rogue', 2010, 'suv', 7, 171.16,
        '7bb29c36-823f-43ea-9055-6d52047dff0d')
        ,
       ('5e680436-f160-4a4d-99f4-5b3be2ad9b66', '8RCQ001WUL55Y90F3', 'YQR-5750', 'Silver',
        'AVAILABLE', '185107.1', 'ELECTRIC', 'MANUAL', 'Chevrolet', 'Impala', 2017, 'compact', 7,
        175.68, 'bd8d9e52-bd9a-4135-93ad-f778b91b106c')
        ,
       ('242d5702-64f6-4b9b-bbd6-66442102214b', '7ECSKEZIAFWYYPBZE', 'KMC-3550', 'Black',
        'MAINTENANCE', '40296.7', 'ELECTRIC', 'AUTOMATIC', 'Ford', 'Focus', 2009, 'compact', 8,
        165.37, '9996484d-6b25-4530-8465-f37f4e6bb49b')
        ,
       ('8f6f4b20-f304-4562-9d6a-8c5e42c8da8d', '37S5WA531F643UCN0', 'GEB-2216', 'Silver',
        'AVAILABLE', '106589.2', 'GASOLINE', 'AUTOMATIC', 'Toyota', 'Corolla', 2008, 'suv', 7,
        37.82, '7bb29c36-823f-43ea-9055-6d52047dff0d')
        ,
       ('2ea51dd5-64d7-44bf-b667-500da7675e9d', 'DX92UUS9NQW7Z8G4E', 'SFB-6067', 'Black',
        'MAINTENANCE', '110013.7', 'ELECTRIC', 'MANUAL', 'Chevrolet', 'Impala', 2009, 'compact', 4,
        150.82, 'cf0e5477-4438-4fb2-a6da-aaf4c17ee757')
        ,
       ('fbd1544b-a12c-4eb1-b239-e8dc7d100be9', '22AH4YH4IN4CNDGRL', 'NKG-9491', 'Blue',
        'MAINTENANCE', '50906.3', 'GASOLINE', 'AUTOMATIC', 'Toyota', 'Corolla', 2013, 'truck', 5,
        63.6, '9996484d-6b25-4530-8465-f37f4e6bb49b')
        ,
       ('3e19a28e-37e2-4f52-a0cb-17851693a3cd', '10FMMG5MDBYQNI871', 'FXR-5041', 'Red', 'AVAILABLE',
        '60228.0', 'HYBRID', 'MANUAL', 'Honda', 'Civic', 2019, 'truck', 7, 115.93,
        '9996484d-6b25-4530-8465-f37f4e6bb49b')
        ,
       ('7ce9ee70-2f0b-4aa2-831e-4fca620a5f39', 'CPI23JU6PN5T1F6VU', 'MMC-8797', 'White',
        'MAINTENANCE', '63791.8', 'GASOLINE', 'MANUAL', 'Chevrolet', 'Impala', 2019, 'van', 4,
        155.45, '7bb29c36-823f-43ea-9055-6d52047dff0d')
        ,
       ('55a64fa4-b698-46a8-9055-29ef00166bb2', '8D83TJM2XCDPRG3AK', 'XWL-8876', 'Black',
        'MAINTENANCE', '103119.4', 'GASOLINE', 'MANUAL', 'Ford', 'Focus', 2009, 'compact', 3, 89.91,
        'a5396e3b-e26f-401a-a831-f172105aa07a')
        ,
       ('d420a27f-33f6-4329-a6c0-63c95aa225a3', '5LYLDM0CIJ2NG0V4N', 'TQF-4007', 'Green', 'RENTED',
        '108312.9', 'ELECTRIC', 'AUTOMATIC', 'Kia', 'Sportage', 2019, 'economy', 5, 181.73,
        '7bb29c36-823f-43ea-9055-6d52047dff0d')
        ,
       ('2af9022d-f209-4d74-9daf-99ee3b7c32b8', 'ST7QR4HK52DKTAR0Z', 'RLS-1233', 'Black', 'RENTED',
        '100284.5', 'HYBRID', 'MANUAL', 'Hyundai', 'Elantra', 2013, 'van', 5, 152.13,
        'cf0e5477-4438-4fb2-a6da-aaf4c17ee757')
        ,
       ('5bfc0b65-25b1-405f-bda4-85fdca68c2bc', 'N9I2K3N2BP0Y79GDX', 'GXG-5693', 'Green',
        'MAINTENANCE', '124154.4', 'HYBRID', 'AUTOMATIC', 'Chevrolet', 'Impala', 2007, 'van', 6,
        83.94, '7bb29c36-823f-43ea-9055-6d52047dff0d')
        ,
       ('e467ad3f-4e2c-4042-abbd-48f9f355e774', 'ZAZA4SR3A3FAAKHKZ', 'VYL-9049', 'Red', 'AVAILABLE',
        '197281.2', 'HYBRID', 'MANUAL', 'Ford', 'Focus', 2011, 'economy', 2, 46.68,
        '9996484d-6b25-4530-8465-f37f4e6bb49b')
        ,
       ('b6edc3b7-d4f3-4db4-842c-532be6a12ed8', 'IIP885S5B16GW0YX6', 'GVH-6428', 'Black',
        'MAINTENANCE', '54055.4', 'DIESEL', 'AUTOMATIC', 'Nissan', 'Rogue', 2005, 'truck', 6,
        142.84, 'cf0e5477-4438-4fb2-a6da-aaf4c17ee757')
        ,
       ('8125a7ff-1ccf-4f9f-8a66-f668768aa822', 'FZGPNW6H2410LO0O8', 'HNN-6604', 'White',
        'AVAILABLE', '119202.9', 'ELECTRIC', 'MANUAL', 'Hyundai', 'Elantra', 2013, 'suv', 4, 197.27,
        'cf0e5477-4438-4fb2-a6da-aaf4c17ee757')
        ,
       ('f522993a-38f1-493b-a41f-f497df7c4e8a', 'LBMEVJ5NXF0ZPM66Z', 'UWW-2201', 'White', 'RENTED',
        '75181.8', 'HYBRID', 'AUTOMATIC', 'Chevrolet', 'Impala', 2013, 'compact', 8, 64.28,
        'cf0e5477-4438-4fb2-a6da-aaf4c17ee757')
        ,
       ('f3fbd2e5-f252-4291-9f75-28c92be5672f', '92UWDLK5SM85OVF9W', 'GCL-9125', 'Black', 'RENTED',
        '157755.9', 'GASOLINE', 'AUTOMATIC', 'Chevrolet', 'Impala', 2018, 'van', 5, 120.11,
        'cf0e5477-4438-4fb2-a6da-aaf4c17ee757')
        ,
       ('598e2715-6fee-4791-960c-ea1b2bfb870c', 'LJQXN2E0OZ2QAJWCE', 'OHN-1714', 'White',
        'AVAILABLE', '161995.7', 'GASOLINE', 'AUTOMATIC', 'Chevrolet', 'Impala', 2013, 'economy', 6,
        44.1, '7bb29c36-823f-43ea-9055-6d52047dff0d')
        ,
       ('0f8b56e6-ce78-4aea-85b3-61d39ac863c7', 'YQL6GOO1UUECTDNDI', 'ILO-6162', 'Silver',
        'AVAILABLE', '117137.9', 'HYBRID', 'MANUAL', 'Tesla', 'Model 3', 2019, 'truck', 2, 168.92,
        'bd8d9e52-bd9a-4135-93ad-f778b91b106c')
        ,
       ('edb03d7c-2065-4f52-9f01-8ff6311448e8', 'QT1LHT81WNXXELVZ3', 'OWP-5409', 'Black',
        'MAINTENANCE', '45048.9', 'HYBRID', 'MANUAL', 'Volkswagen', 'Golf', 2019, 'compact', 3,
        37.18, '7bb29c36-823f-43ea-9055-6d52047dff0d')
        ,
       ('0e9658e0-4f88-46d5-8a46-2b2f3cfb2d8d', 'JZ38YDGZLAIPUGHZQ', 'FGD-6381', 'White',
        'AVAILABLE', '88113.2', 'GASOLINE', 'AUTOMATIC', 'Tesla', 'Model 3', 2014, 'truck', 6,
        169.8, '7bb29c36-823f-43ea-9055-6d52047dff0d')
        ,
       ('b16a9dc7-a566-4c92-8f3d-a410912d8500', '3FK48X2YL7WLJ52IJ', 'RGK-7657', 'Green',
        'MAINTENANCE', '156102.2', 'ELECTRIC', 'AUTOMATIC', 'Volkswagen', 'Golf', 2018, 'truck', 2,
        69.64, 'bd8d9e52-bd9a-4135-93ad-f778b91b106c')
        ,
       ('59913d34-77fb-46c1-954d-233406ac6692', 'RO34HXQXKQGT7ZZU0', 'BGF-9410', 'White',
        'AVAILABLE', '10311.2', 'HYBRID', 'MANUAL', 'Hyundai', 'Elantra', 2017, 'van', 2, 120.19,
        '7bb29c36-823f-43ea-9055-6d52047dff0d')
        ,
       ('bb7969c8-441a-41c3-a3a3-79bd15fcdc0b', 'F69KV75547YVD194R', 'JAY-8099', 'Silver',
        'MAINTENANCE', '82592.8', 'DIESEL', 'MANUAL', 'Toyota', 'Corolla', 2015, 'van', 2, 191.71,
        '7bb29c36-823f-43ea-9055-6d52047dff0d')
        ,
       ('603aaae2-5a8a-47f6-84d7-5b04e3210037', 'ALBO225COZLY8M3AA', 'LOF-6513', 'Red', 'RENTED',
        '85241.8', 'HYBRID', 'MANUAL', 'Kia', 'Sportage', 2005, 'suv', 5, 48.08,
        '9996484d-6b25-4530-8465-f37f4e6bb49b')
        ,
       ('6d84e71b-2b88-4277-a020-1ead701cceaf', 'XQIFMCNSBN1QX9MFZ', 'FSO-9663', 'Silver', 'RENTED',
        '128845.4', 'DIESEL', 'MANUAL', 'Ford', 'Focus', 2015, 'economy', 2, 92.56,
        'cf0e5477-4438-4fb2-a6da-aaf4c17ee757')
        ,
       ('a26da9c3-03e8-4024-9a9e-3db5e3951d2e', 'WBFHJ4WY7TQG9FGL6', 'QAM-9711', 'White', 'RENTED',
        '145578.9', 'HYBRID', 'AUTOMATIC', 'Volkswagen', 'Golf', 2021, 'economy', 5, 49.06,
        'cf0e5477-4438-4fb2-a6da-aaf4c17ee757')
        ,
       ('fe8bee6f-3524-4380-8984-45f5809fc299', 'Q4EN4VYSARJ970F3W', 'SSQ-3338', 'Black',
        'MAINTENANCE', '15549.7', 'ELECTRIC', 'MANUAL', 'Ford', 'Focus', 2009, 'economy', 7, 78.45,
        'bd8d9e52-bd9a-4135-93ad-f778b91b106c')
        ,
       ('61adce85-8cea-494c-a089-b11995bf2c4e', 'J27U1KFSJ8IKMTPEJ', 'NJN-7011', 'Green', 'RENTED',
        '158528.2', 'HYBRID', 'AUTOMATIC', 'Toyota', 'Corolla', 2006, 'truck', 5, 59.26,
        'cf0e5477-4438-4fb2-a6da-aaf4c17ee757')
        ,
       ('1874e695-fc75-4988-8c90-bc947228665f', 'QQA4IIIRHUFLZFJT6', 'WFJ-9946', 'Silver', 'RENTED',
        '199073.1', 'HYBRID', 'AUTOMATIC', 'Ford', 'Focus', 2013, 'economy', 3, 75.67,
        '9996484d-6b25-4530-8465-f37f4e6bb49b')
        ,
       ('ec369658-bf57-44d8-bb57-c131d334cd5f', 'L3MRGYCH0YOAO35VT', 'INS-8758', 'White', 'RENTED',
        '199789.7', 'ELECTRIC', 'AUTOMATIC', 'Tesla', 'Model 3', 2020, 'suv', 3, 51.59,
        '9996484d-6b25-4530-8465-f37f4e6bb49b')
        ,
       ('cbeb58a4-1f67-46f7-ada5-1a78ac48e0a7', '3EIFRFBNDGMUJ5JN4', 'ZUP-8464', 'White',
        'MAINTENANCE', '64205.5', 'ELECTRIC', 'MANUAL', 'Kia', 'Sportage', 2022, 'suv', 3, 130.63,
        'bd8d9e52-bd9a-4135-93ad-f778b91b106c')
        ,
       ('aab5cda6-d6ad-4858-961b-aab94fbef86f', '1JXEOUUUHLFG45MNV', 'VUU-4799', 'Green',
        'AVAILABLE', '49517.3', 'ELECTRIC', 'MANUAL', 'Hyundai', 'Elantra', 2017, 'van', 2, 61.48,
        'a5396e3b-e26f-401a-a831-f172105aa07a')
        ,
       ('dc4e3f03-6207-48d7-935c-f8e8a22e2ba8', 'HJ2390BJ8PWHOXAF1', 'UJW-1818', 'Red', 'AVAILABLE',
        '15712.9', 'HYBRID', 'MANUAL', 'Toyota', 'Corolla', 2009, 'compact', 3, 170.36,
        'a5396e3b-e26f-401a-a831-f172105aa07a')
        ,
       ('8918b9d7-9a90-4067-aea2-60b7f80f0028', 'Y3F8B5NEF1I6V4VRL', 'MMS-5433', 'Blue',
        'MAINTENANCE', '95313.3', 'DIESEL', 'MANUAL', 'Ford', 'Focus', 2018, 'economy', 4, 198.01,
        'a5396e3b-e26f-401a-a831-f172105aa07a')
        ,
       ('0e64a6d8-4a27-4155-8690-90b5f457115f', 'VXQO1NW34JIHK1TJF', 'ZUL-2863', 'Red', 'RENTED',
        '186725.8', 'GASOLINE', 'AUTOMATIC', 'BMW', 'X5', 2022, 'truck', 5, 160.34,
        'bd8d9e52-bd9a-4135-93ad-f778b91b106c')
        ,
       ('cff3735a-f330-43c9-a76b-44658f1b25c5', 'SZ1CHG2EXOE4YJ9QG', 'ZPM-8616', 'Black',
        'MAINTENANCE', '96498.7', 'HYBRID', 'MANUAL', 'Kia', 'Sportage', 2009, 'suv', 5, 78.18,
        '7bb29c36-823f-43ea-9055-6d52047dff0d')
        ,
       ('a5586706-a318-4f57-8932-6d0ef81d9762', 'EJWVO4EJSVHKKIE54', 'JVF-6872', 'White', 'RENTED',
        '30920.8', 'ELECTRIC', 'AUTOMATIC', 'Tesla', 'Model 3', 2014, 'van', 3, 89.54,
        'a5396e3b-e26f-401a-a831-f172105aa07a')
        ,
       ('e0d00ba9-fce5-437e-977e-0f8b520b87ee', '743819ICIQ8LIY3G6', 'XHS-3082', 'White', 'RENTED',
        '16809.2', 'HYBRID', 'AUTOMATIC', 'Honda', 'Civic', 2005, 'van', 4, 172.03,
        '7bb29c36-823f-43ea-9055-6d52047dff0d')
        ,
       ('42db5cda-003d-4286-9be1-797c0f6e8515', '9ZGZXJDBYG9GBP3PV', 'VHJ-2220', 'White',
        'AVAILABLE', '16234.7', 'ELECTRIC', 'MANUAL', 'Kia', 'Sportage', 2009, 'economy', 4, 133.46,
        'bd8d9e52-bd9a-4135-93ad-f778b91b106c')
        ,
       ('9e9e6813-52a1-4a77-bcfc-2a591fe44922', '0ONSYAJE4MP0PCZ81', 'YXO-9223', 'Red',
        'MAINTENANCE', '41671.1', 'ELECTRIC', 'MANUAL', 'Kia', 'Sportage', 2021, 'economy', 2,
        82.15, 'bd8d9e52-bd9a-4135-93ad-f778b91b106c')
        ,
       ('d9906957-2ad9-4749-a57f-58ed8fee8c59', 'WOZFDT5H677SA2TE3', 'WYY-4934', 'Green',
        'AVAILABLE', '140845.0', 'HYBRID', 'MANUAL', 'Honda', 'Civic', 2015, 'truck', 6, 199.33,
        '9996484d-6b25-4530-8465-f37f4e6bb49b')
        ,
       ('096e5efa-2568-4bd5-a234-738ffeb7f3eb', 'KB8JTR8J95RO7Y8V4', 'TJP-1534', 'Black', 'RENTED',
        '177217.6', 'ELECTRIC', 'AUTOMATIC', 'Tesla', 'Model 3', 2014, 'compact', 8, 136.63,
        '7bb29c36-823f-43ea-9055-6d52047dff0d');

INSERT INTO supplier (id, full_name, email, contact_number, address)
VALUES ('1', 'Auto Supply Co', 'contact@autosupply.com', '+1112223333', '300 Supplier Blvd'),
       ('2', 'Car Parts Inc', 'sales@carparts.com', '+1112223334', '301 Supplier Blvd'),
       ('3', 'Vehicle Solutions', 'info@vehiclesolutions.com', '+1112223335', '302 Supplier Blvd'),
       ('4', 'Global Motors Ltd', 'support@globalmotors.com', '+1112223336', '303 Supplier Blvd'),
       ('5', 'Speedy Auto', 'hello@speedyauto.com', '+1112223337', '304 Supplier Blvd'),
       ('6', 'EuroCar Supply', 'info@eurocar.com', '+1112223338', '305 Supplier Blvd');

INSERT INTO purchase (id, purchase_date, total_price, invoice_number, status, supplier_id)
VALUES ('1', '2024-01-15', 25000.00, 'INV001', 'COMPLETED', '1'),
       ('2', '2024-02-01', 30000.00, 'INV002', 'COMPLETED', '2'),
       ('3', '2024-02-15', 35000.00, 'INV003', 'PENDING', '3'),
       ('4', '2024-03-10', 27000.00, 'INV004', 'COMPLETED', '4'),
       ('5', '2024-03-25', 29500.00, 'INV005', 'COMPLETED', '5'),

       ('6', '2024-04-10', 31000.00, 'INV006', 'PENDING', '6');

INSERT INTO purchase_details (id, amount, price, purchase_id)
VALUES ('1', 1, 25000.00, '1'),
       ('2', 1, 30000.00, '2'),
       ('3', 1, 35000.00, '3'),
       ('4', 1, 27000.00, '4'),
       ('5', 1, 29500.00, '5'),
       ('6', 1, 31000.00, '6');

INSERT INTO delivery (id, delivery_date, purchase_id, office_id)
VALUES ('1', '2024-01-20', '1', '9996484d-6b25-4530-8465-f37f4e6bb49b'), -- Kyiv
       ('2', '2024-02-05', '2', 'a5396e3b-e26f-401a-a831-f172105aa07a'), -- Lviv
       ('3', '2024-02-20', '3', 'cf0e5477-4438-4fb2-a6da-aaf4c17ee757'), -- Odesa
       ('4', '2024-03-15', '4', 'bd8d9e52-bd9a-4135-93ad-f778b91b106c'), -- Khmelnytskyi
       ('5', '2024-04-01', '5', '7bb29c36-823f-43ea-9055-6d52047dff0d'), -- Ivano-Frankivsk
       ('6', '2024-04-18', '6', 'cf0e5477-4438-4fb2-a6da-aaf4c17ee757'); -- Another to Odesa

INSERT INTO payment (id, payment_date, fine, total, payment_type)
VALUES ('f390b6e3-b4a4-4f33-aa99-c8737e67939d', '2024-06-13', 43.37, 1764.32, 'GOOGLE_PAY'),
       ('a1d80db7-ff67-4c33-a494-61586a0d4997', '2025-03-01', 42.17, 332.72, 'CASH'),
       ('6e0e5b80-f91a-4cb4-aaaa-3901e405baa0', '2024-08-21', 35.47, 533.92, 'CASH'),
       ('ae8e4ed7-44d7-47eb-ae8e-5c79f74056dd', '2024-09-02', 34.50, 595.50, 'IBAN'),
       ('094fccdc-d9d3-49e2-8c64-1fcea083f4c5', '2024-11-05', 9.47, 501.71, 'APPLE_PAY'),
       ('fce1cde3-a5c1-4df9-9915-c8fff572ee30', '2025-01-26', 33.53, 480.53, 'CASH'),
       ('81c77977-b4d9-4777-b782-32316d855b5c', '2024-11-13', 2.60, 831.40, 'GOOGLE_PAY'),
       ('8b16098b-4f97-4b91-85f7-dbbcf0f16dcc', '2024-10-22', 35.21, 1596.49, 'IBAN'),
       ('d57bb50f-7d71-49fd-a721-f8e1f2cf1451', '2025-03-22', 23.03, 385.70, 'CASH'),
       ('c47b039c-4ad3-462b-bc16-04a69038fdf6', '2024-06-09', 10.12, 179.72, 'GOOGLE_PAY'),
       ('7e78d576-1c2c-48b8-8e4e-d011cd18262f', '2025-03-02', 37.62, 1927.82, 'APPLE_PAY'),
       ('afd96504-76db-4d9a-8c07-8f1c510c7fdb', '2025-04-13', 11.18, 1051.70, 'APPLE_PAY'),
       ('abd52612-7319-4fbb-9ca4-33679c7815ac', '2024-08-03', 48.81, 2408.09, 'GOOGLE_PAY'),
       ('28d5f55f-227f-48c1-b171-676a69a0b5a0', '2024-11-11', 41.08, 499.96, 'APPLE_PAY'),
       ('1f3b95e9-d42c-4db8-89cc-6c69bf6a2404', '2024-07-23', 31.33, 1393.11, 'GOOGLE_PAY'),
       ('78fcdbc3-c272-4bf9-94c1-cf20fa0e0068', '2025-04-06', 16.35, 1467.17, 'CASH'),
       ('e326d6de-988a-4c6f-bd52-d9d799da317f', '2025-01-11', 11.54, 1750.75, 'APPLE_PAY'),
       ('c7e91123-241a-4a0b-ab6b-12467e82d429', '2025-03-18', 3.78, 1424.22, 'IBAN'),
       ('3d7599b6-bfad-4cd8-9d73-f7b89d5b6bae', '2025-03-16', 13.06, 829.30, 'CASH'),
       ('25866a6b-ebd8-4c78-b5dc-637a0a4013d7', '2024-09-18', 29.82, 990.42, 'GOOGLE_PAY'),
       ('d413d7eb-e861-4883-9b9e-dabb5e15e967', '2024-07-17', 27.18, 589.26, 'APPLE_PAY');

delete from damage_report;
delete from return_inspection;
delete from rental;

INSERT INTO rental (id, rental_date, rental_start, rental_end, status, full_price, client_id,
                    worker_id, car_id, payment_id)
VALUES
    ('b1290330-16ab-4caa-92d0-4c56d952130b', '2024-06-02 16:15:57', '2024-06-02 16:15:57',
     '2024-06-13 16:15:57', 'RETURNED', 1720.95, '4c0e6a0a-dfd1-404c-88d1-1e9c9cc77885',
     '9a3b654a-e076-484f-9156-bfb9e71361d4', '49beeb6a-2073-43ef-b4c7-5d833814d77a',
     'f390b6e3-b4a4-4f33-aa99-c8737e67939d'),

    ('abd09b8b-f40e-4476-93a6-52ec8dabb0a0', '2025-02-26 16:15:57', '2025-02-26 16:15:57',
     '2025-03-01 16:15:57', 'PICKED_UP', 290.55, '77b70ebe-835a-4897-bfa2-ed3618032784',
     '9809ca53-1569-411f-9d82-9a6b3c1c5da5', '35f06b82-7cc8-4032-8396-9bbe57045c40',
     'a1d80db7-ff67-4c33-a494-61586a0d4997'),

    ('977b0596-f779-40fe-a078-b4055cf63f6e', '2024-08-16 16:15:57', '2024-08-16 16:15:57',
     '2024-08-21 16:15:57', 'INSPECTED', 498.45, 'a0ad38ea-88bf-4020-84f1-55d06372ab7e',
     '04061920-c86b-4b48-aec0-180e638a07b8', 'ae8636e5-af3e-4567-ae66-981a29e9147f',
     '6e0e5b80-f91a-4cb4-aaaa-3901e405baa0'),

    ('52f42d94-d329-4291-90dc-b0dd6634f459', '2024-08-30 16:15:57', '2024-08-30 16:15:57',
     '2024-09-02 16:15:57', 'INSPECTED', 561.00, 'a7ae17bb-c999-4806-9c56-991621206fc0',
     '9a3b654a-e076-484f-9156-bfb9e71361d4', '5a372963-a29f-4d23-85ae-87afb1ca1ab4',
     'ae8e4ed7-44d7-47eb-ae8e-5c79f74056dd'),

    ('6fcbe199-e05b-4019-98b2-71bc796a3f14', '2024-10-28 16:15:57', '2024-10-28 16:15:57',
     '2024-11-05 16:15:57', 'RETURNED', 492.24, '7dd15947-58b0-47c6-b158-59d003ddfbc2',
     'e1cb4706-06c3-4de6-b558-31d7a0c6f74c', 'a96a77ca-0536-4bc2-ab13-cced2a4f3b5f',
     '094fccdc-d9d3-49e2-8c64-1fcea083f4c5'),

    ('538a5680-f3c5-48f7-bbfb-35f973b857f0', '2025-01-22 16:15:57', '2025-01-22 16:15:57',
     '2025-01-26 16:15:57', 'RETURNED', 447.00, 'ac42fc40-d33c-45c3-a410-c22978b8e29d',
     'e1cb4706-06c3-4de6-b558-31d7a0c6f74c', 'ac9514e9-3af8-44c7-af5a-fe70d93982e5',
     'fce1cde3-a5c1-4df9-9915-c8fff572ee30'),

    ('9603c7bd-15af-48d3-9971-15ee6d6e76ba', '2024-11-08 16:15:57', '2024-11-08 16:15:57',
     '2024-11-13 16:15:57', 'RETURNED', 828.80, 'e46e13a4-99f3-49ba-9006-98e172c16e9e',
     'e1cb4706-06c3-4de6-b558-31d7a0c6f74c', '9dc68134-0875-4a36-b6f3-ddd09a8fc469',
     '81c77977-b4d9-4777-b782-32316d855b5c'),

    ('f75189b6-8d62-4573-8c4b-e8ec090e15f0', '2024-10-14 16:15:57', '2024-10-14 16:15:57',
     '2024-10-22 16:15:57', 'RESERVED', 1561.28, 'ac42fc40-d33c-45c3-a410-c22978b8e29d',
     '9809ca53-1569-411f-9d82-9a6b3c1c5da5', '11ed4e59-3dee-4b90-b966-019b25cd24f9',
     '8b16098b-4f97-4b91-85f7-dbbcf0f16dcc');

INSERT INTO return_inspection (id, inspection_date, status, notes, wear_level_percentage,
                               damage_penalty, cleaning_fee, rental_id, inspected_by)
VALUES ('30a18956-4b5e-47d8-b3e0-56904e85f682', '2024-09-03 10:00:00', 'OK', 'No issues found', 4.5,
        0.00, 0.00, '52f42d94-d329-4291-90dc-b0dd6634f459', '9a3b654a-e076-484f-9156-bfb9e71361d4'),
       ('d6c793fe-3b38-40e3-a75f-df56aa0e61a6', '2024-11-05 11:15:00', 'NEEDS_REPAIR',
        'Rear bumper dented', 8.0, 120.00, 0.00, '6fcbe199-e05b-4019-98b2-71bc796a3f14',
        'e1cb4706-06c3-4de6-b558-31d7a0c6f74c'),
       ('c46ccf84-6803-4ef7-a3fc-0ff975a99197', '2025-01-26 12:30:00', 'FINED',
        'Interior needed deep cleaning', 12.0, 0.00, 50.00, '538a5680-f3c5-48f7-bbfb-35f973b857f0',
        'e1cb4706-06c3-4de6-b558-31d7a0c6f74c');

INSERT INTO damage_report (id, part_affected, description, estimated_repair_cost, inspection_id)
VALUES ('fc4d074e-feba-4c9d-a8e2-bb26d2f1ca5a', 'Rear Bumper', 'Dent on lower side', 180.00,
        'd6c793fe-3b38-40e3-a75f-df56aa0e61a6'),
       ('7f9ff062-4386-4d16-a6a1-79307f904d4e', 'Roof', 'Scratch from tree branch', 220.00,
        'd6c793fe-3b38-40e3-a75f-df56aa0e61a6'),
       ('92f3fa20-ddea-4ba7-abd8-aa1f0cbab25a', 'Floor Mat', 'Severe staining', 90.00,
        'c46ccf84-6803-4ef7-a3fc-0ff975a99197');