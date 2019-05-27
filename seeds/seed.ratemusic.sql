BEGIN;

TRUNCATE
  ratemusic_reviews,
  ratemusic_users,
  albums
  RESTART IDENTITY CASCADE;

INSERT INTO ratemusic_users (user_name, full_name, password)
  VALUES
    ('elan5', 'Elan Green', '$2a$12$LhTjPYI/SdSvVkEKeNwwsOO1eL1opjwff75kJJP/FBlAuUulxfmma'),
    ('rosi7', 'Rosi Green', '$2a$12$IAmO0yCstsb.itj1oamtuuqAiB465V4SD0W37HuxvQ8ix1ed4odbi'),
    ('sin8', 'Sinikka Green', '$2a$12$3q5iryVqr11dXQyeF6z.defARZudpKyg7fjxE1AXyNQr2Fw63mTwK'),
    ('ellu9', 'Ellu Nasser', '$2a$12$vkX3u6lGRBxFQI2Ryj3D.udeS8HJ9lEN74cn1owSSUjujGQL/cMNy'),
    ('luki3', 'Lukas Green', '$2a$12$i6R1Kah107c9FSR4PNId/OLBXlyJIP2.8eb9CRe8s38Oc2CmHTH26'),
    ('liza1', 'Liza Goodstein', '$2a$12$dRX0MxpOQw33v5.9.uvpT.dTsmlkSP.xLCvscFP.KjHEThL.VaSvm'),
    ('emma2', 'Emma Goodstein', '$2a$12$OIGDuhHVw1UGQ5rSGgQO4OiHaItm37s7/JIEpllt7j6o2.m2kP5HS'),
    ('john5', 'John Green', '$2a$12$nQhxeazWCPCoRGtDNkwtVe/2KiYSUzu4HED7bZBDMwRDaqgMTItJK'),
    ('debra6', 'Debra Glasser', '$2a$12$lHheAQqAjWhVK3t3lwgof.BjyV7M4PkRJRjiRUwlzSFJ9LrgZ8wmK');

INSERT INTO albums(title, artist, art, year, rating)
  VALUES
  ('Assume Form', 'James Blake', '../img/AF.jpg', 2018, 8),
  ('DAMN', 'Kendrick Lamar', '../img/DAMN.jpg', 2016, 7),
  ('Global Communication', 'Global Communication', '../img/GC.jpg', 1998, 9),
  ('OME', 'Open Mike Eagle', '../img/OME.jpg', 2018, 10),
  ('RHP', 'Red House Painters', '../img/RHP.jpg', 1996, 7),
  ('The Shining', 'J Dilla', '../img/SHINING.jpg', 2018, 8),
  ('Carrie & Lowell', 'Sufjan Stevens', '../img/SS.jpg', 2018, 8),
  ('Take Me Apart', 'Kelela', '../img/TMA.jpg', 2018, 8),
  ('To Pimp a Butterfly', 'Kendrick Lamar', '../img/TPAB.jpg', 2015, 8);

INSERT INTO ratemusic_reviews (image, title, content, rating, user_id, album_id)
  VALUES
  ('../img/AF.jpg', 'The best James Blake album of all time', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, ut eos odio vitae cumque minima dolores saepe asperiores deleniti commodi, quos architecto voluptate consequuntur hic numquam accusamus eius nisi officiis! Natus dolorem, fugit excepturi ex odio nulla libero quisquam aspernatur blanditiis neque ipsam, unde optio dolorum? Fuga, non aut aspernatur assumenda rem doloribus, dolorum, distinctio eius deserunt temporibus voluptate dolorem? Reiciendis magnam tempore vitae tempora voluptatem perspiciatis omnis qui quibusdam illum in nobis quaerat culpa minima natus, rem mollitia sapiente possimus, doloribus repellendus at ea inventore illo! Recusandae, itaque soluta!', 8, 1, 1),
  ('../img/DAMN.jpg', 'The fourth best Kendrick album of all time', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, ut eos odio vitae cumque minima dolores saepe asperiores deleniti commodi, quos architecto voluptate consequuntur hic numquam accusamus eius nisi officiis! Natus dolorem, fugit excepturi ex odio nulla libero quisquam aspernatur blanditiis neque ipsam, unde optio dolorum? Fuga, non aut aspernatur assumenda rem doloribus, dolorum, distinctio eius deserunt temporibus voluptate dolorem? Reiciendis magnam tempore vitae tempora voluptatem perspiciatis omnis qui quibusdam illum in nobis quaerat culpa minima natus, rem mollitia sapiente possimus, doloribus repellendus at ea inventore illo! Recusandae, itaque soluta!', 7, 2, 2),
  ('../img/GC.jpg', 'The best ambient album of all time', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, ut eos odio vitae cumque minima dolores saepe asperiores deleniti commodi, quos architecto voluptate consequuntur hic numquam accusamus eius nisi officiis! Natus dolorem, fugit excepturi ex odio nulla libero quisquam aspernatur blanditiis neque ipsam, unde optio dolorum? Fuga, non aut aspernatur assumenda rem doloribus, dolorum, distinctio eius deserunt temporibus voluptate dolorem? Reiciendis magnam tempore vitae tempora voluptatem perspiciatis omnis qui quibusdam illum in nobis quaerat culpa minima natus, rem mollitia sapiente possimus, doloribus repellendus at ea inventore illo! Recusandae, itaque soluta!', 9, 3, 3),
  ('../img/OME.jpg', 'The best album of all time', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, ut eos odio vitae cumque minima dolores saepe asperiores deleniti commodi, quos architecto voluptate consequuntur hic numquam accusamus eius nisi officiis! Natus dolorem, fugit excepturi ex odio nulla libero quisquam aspernatur blanditiis neque ipsam, unde optio dolorum? Fuga, non aut aspernatur assumenda rem doloribus, dolorum, distinctio eius deserunt temporibus voluptate dolorem? Reiciendis magnam tempore vitae tempora voluptatem perspiciatis omnis qui quibusdam illum in nobis quaerat culpa minima natus, rem mollitia sapiente possimus, doloribus repellendus at ea inventore illo! Recusandae, itaque soluta!', 10, 4, 4),
  ('../img/RHP.jpg', 'The best RHP album of all time', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, ut eos odio vitae cumque minima dolores saepe asperiores deleniti commodi, quos architecto voluptate consequuntur hic numquam accusamus eius nisi officiis! Natus dolorem, fugit excepturi ex odio nulla libero quisquam aspernatur blanditiis neque ipsam, unde optio dolorum? Fuga, non aut aspernatur assumenda rem doloribus, dolorum, distinctio eius deserunt temporibus voluptate dolorem? Reiciendis magnam tempore vitae tempora voluptatem perspiciatis omnis qui quibusdam illum in nobis quaerat culpa minima natus, rem mollitia sapiente possimus, doloribus repellendus at ea inventore illo! Recusandae, itaque soluta!', 7, 5, 5),
  ('../img/SHINING.jpg', 'The best J Dilla album of all time', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, ut eos odio vitae cumque minima dolores saepe asperiores deleniti commodi, quos architecto voluptate consequuntur hic numquam accusamus eius nisi officiis! Natus dolorem, fugit excepturi ex odio nulla libero quisquam aspernatur blanditiis neque ipsam, unde optio dolorum? Fuga, non aut aspernatur assumenda rem doloribus, dolorum, distinctio eius deserunt temporibus voluptate dolorem? Reiciendis magnam tempore vitae tempora voluptatem perspiciatis omnis qui quibusdam illum in nobis quaerat culpa minima natus, rem mollitia sapiente possimus, doloribus repellendus at ea inventore illo! Recusandae, itaque soluta!', 8, 6, 6),
  ('../img/SS.jpg', 'The best SS album of all time', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, ut eos odio vitae cumque minima dolores saepe asperiores deleniti commodi, quos architecto voluptate consequuntur hic numquam accusamus eius nisi officiis! Natus dolorem, fugit excepturi ex odio nulla libero quisquam aspernatur blanditiis neque ipsam, unde optio dolorum? Fuga, non aut aspernatur assumenda rem doloribus, dolorum, distinctio eius deserunt temporibus voluptate dolorem? Reiciendis magnam tempore vitae tempora voluptatem perspiciatis omnis qui quibusdam illum in nobis quaerat culpa minima natus, rem mollitia sapiente possimus, doloribus repellendus at ea inventore illo! Recusandae, itaque soluta!', 8, 7, 7),
  ('../img/TMA.jpg', 'The best Kelela album of all time', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, ut eos odio vitae cumque minima dolores saepe asperiores deleniti commodi, quos architecto voluptate consequuntur hic numquam accusamus eius nisi officiis! Natus dolorem, fugit excepturi ex odio nulla libero quisquam aspernatur blanditiis neque ipsam, unde optio dolorum? Fuga, non aut aspernatur assumenda rem doloribus, dolorum, distinctio eius deserunt temporibus voluptate dolorem? Reiciendis magnam tempore vitae tempora voluptatem perspiciatis omnis qui quibusdam illum in nobis quaerat culpa minima natus, rem mollitia sapiente possimus, doloribus repellendus at ea inventore illo! Recusandae, itaque soluta!', 8, 8, 8),
  ('../img/TPAB.jpg', 'The best Kendrick album of all time', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, ut eos odio vitae cumque minima dolores saepe asperiores deleniti commodi, quos architecto voluptate consequuntur hic numquam accusamus eius nisi officiis! Natus dolorem, fugit excepturi ex odio nulla libero quisquam aspernatur blanditiis neque ipsam, unde optio dolorum? Fuga, non aut aspernatur assumenda rem doloribus, dolorum, distinctio eius deserunt temporibus voluptate dolorem? Reiciendis magnam tempore vitae tempora voluptatem perspiciatis omnis qui quibusdam illum in nobis quaerat culpa minima natus, rem mollitia sapiente possimus, doloribus repellendus at ea inventore illo! Recusandae, itaque soluta!', 8, 9, 9);

    COMMIT;