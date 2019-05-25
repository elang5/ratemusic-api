BEGIN;

TRUNCATE
  ratemusic_reviews,
  ratemusic_users,
  albums
  RESTART IDENTITY CASCADE;

INSERT INTO ratemusic_users (user_name, full_name, password)
  VALUES
    ('elan5', 'Elan Green', 'hello'),
    ('rosi7', 'Rosi Green', 'goodbye'),
    ('sin8', 'Sinikka Green', 'password'),
    ('ellu9', 'Ellu Nasser', 'tschuss'),
    ('luki3', 'Lukas Green', 'welcome'),
    ('liza1', 'Liza Goodstein', 'secure'),
    ('emma2', 'Emma Goodstein', 'hithere'),
    ('john5', 'John Green', 'hithere2'),
    ('debra6', 'Debra Glasser', 'hithere3');

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

  INSERT INTO albums(title, artist, art, year, rating, user_id, review_id)
    VALUES
    ('Assume Form', 'James Blake', '../img/AF.jpg', 2018, 8, 1, 1),
    ('DAMN', 'Kendrick Lamar', '../img/DAMN.jpg', 2016, 7, 2, 2),
    ('Global Communication', 'Global Communication', '../img/GC.jpg', 1998, 9, 3, 3),
    ('OME', 'Open Mike Eagle', '../img/OME.jpg', 2018, 10, 4, 4),
    ('RHP', 'Red House Painters', '../img/RHP.jpg', 1996, 7, 5, 5),
    ('The Shining', 'J Dilla', '../img/SHINING.jpg', 2018, 8, 6, 6),
    ('Carrie & Lowell', 'Sufjan Stevens', '../img/SS.jpg', 2018, 8, 7, 7),
    ('Take Me Apart', 'Kelela', '../img/TMA.jpg', 2018, 8, 8, 8),
    ('To Pimp a Butterfly', 'Kendrick Lamar', '../img/TPAB.jpg', 2015, 8, 9, 9);

    COMMIT;