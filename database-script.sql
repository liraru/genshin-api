CREATE DATABASE genshin;

USE genshin;

CREATE TABLE
  "elements" ("id" INTEGER, "name" TEXT, "icon" TEXT, PRIMARY KEY ("id" AUTOINCREMENT));

CREATE TABLE
  "nations" (
    "id" INTEGER,
    "name" TEXT,
    "element" INTEGER,
    "icon" TEXT,
    "archon" TEXT,
    FOREIGN KEY ("element") REFERENCES "elements" ("id") ON DELETE SET NULL,
    PRIMARY KEY ("id" AUTOINCREMENT)
  );

CREATE TABLE
  "models" ("id" INTEGER, "name" TEXT, PRIMARY KEY ("id" AUTOINCREMENT));

CREATE TABLE
  "weapon_types" ("id" INTEGER, "name" TEXT, PRIMARY KEY ("id" AUTOINCREMENT));

CREATE TABLE
  "characters" (
    "id" INTEGER,
    "name" TEXT,
    "element" INTEGER,
    "portrait" TEXT,
    "marketing_image" REAL,
    "rarity" INTEGER,
    "release_date" TEXT,
    "permanent_banner" INTEGER,
    "weapon_type" INTEGER,
    "nation" INTEGER,
    "model" INTEGER,
    "bonus_stat" TEXT,
    FOREIGN KEY ("element") REFERENCES "elements" ("id") ON DELETE SET NULL,
    FOREIGN KEY ("model") REFERENCES "models" ("id") ON DELETE SET NULL,
    FOREIGN KEY ("nation") REFERENCES "nations" ("id") ON DELETE SET NULL,
    FOREIGN KEY ("weapon_type") REFERENCES "weapon_types" ("id") ON DELETE SET NULL,
    PRIMARY KEY ("id" AUTOINCREMENT)
  );

CREATE TABLE
  "users" ("id" INTEGER, "name" TEXT, "uid" INTEGER, PRIMARY KEY ("id" AUTOINCREMENT));


-- ! DATA ! --

INSERT INTO
  "elements" (name, icon)
VALUES
  ('PYRO', 'pyro.png'),
  ('HYDRO', 'hydro.png'),
  ('ANEMO', 'anemo.png'),
  ('ELECTRO', 'electro.png'),
  ('DENDRO', 'dendro.png'),
  ('CRYO', 'cryo.png'),
  ('GEO', 'geo.png');

INSERT INTO
  "nations" (name, element, icon, archon)
VALUES
  ('MONDSTADT', 3, 'mondstadt.png', 'BARBATOS'),
  ('LIYUE', 7, 'liyue.png', 'MORAX'),
  ('INAZUMA', 4, 'inazuma.png', 'BAAL'),
  ('SUMERU', 5, 'sumeru.png', 'BUER'),
  ('FONTAINE', 2, 'fontaine.png', ''),
  ('NATLAN', 1, 'natlan.png', ''),
  ('SNEZHNAYA', 6, 'snezhnaya.png', ''),
  ('OTHER_WORLD', NULL, 'other_world.png', '');

INSERT INTO
  "weapon_types" (name)
VALUES
  ('SWORD'),
  ('CLAYMORE'),
  ('POLEARM'),
  ('CATALYST'),
  ('BOW');

INSERT INTO
  "models" (name)
VALUES
  ('MALE_TALL'),
  ('MALE_MEDIUM'),
  ('MALE_SHORT'),
  ('FEMALE_TALL'),
  ('FEMALE_MEDIUM'),
  ('FEMALE_SHORT');

INSERT INTO
  characters (name, element, portrait, marketing_image, rarity, release_date, permanent_banner, weapon_type, nation, model, bonus_stat)
VALUES
  ('ALBEDO', 7, 'albedo_portrait.png', 'albedo_marketing.png', 5, '2020-12-23', 0, 1, 1, 2, 'Geo DMG Bonus'),
  ('ALHAITHAM', 5, 'alhaitham_portrait.png', 'alhaitham_marketing.png', 5, '2023-01-18', 0, 1, 4, 1, 'Dendro DMG Bonus'),
  ('ALOY', 6, 'aloy_portrait.png', 'aloy_marketing.png', 5, '2021-10-13', 0, 5, 8, 5, 'Cryo DMG Bonus'),
  ('AMBER', 1, 'amber_portrait.png', 'amber_marketing.png', 4, '2020-09-28', 1, 5, 1, 5, 'ATK%'),
  ('ANEMO_TRAVELLER', 3, 'anemo_traveller_portrait.png', 'traveller_marketing.png', 5, '2020-09-28', 0, 1, 8, 2, 'ATK%'),
  ('AYAKA', 6, 'ayaka_portrait.png', 'ayaka_marketing.png', 5, '2021-07-21', 0, 1, 3, 5, 'CRIT DMG'),
  ('AYATO', 2, 'ayato_portrait.png', 'ayato_marketing.png', 5, '2022-03-30', 0, 1, 3, 1, 'CRIT DMG'),
  ('BARBARA', 2, 'barbara_portrait.png', 'barbara_marketing.png', 4, '2020-09-28', 0, 4, 1, 5, 'HP'),
  ('BEIDOU', 4, 'beidou_portrait.png', 'beidou_marketing.png', 4, '2020-11-11', 0, 2, 2, 4, 'Electro DMG Bonus'),
  ('BENNETT', 1, 'bennett_portrait.png', 'bennett_marketing.png', 4, '2020-12-23', 0, 1, 1, 2, 'Energy Recharge'),
  ('CANDACE', 2, 'candace_portrait.png', 'candace_marketing.png', 4, '2022-09-28', 0, 3, 4, 4, 'HP%'),
  ('TARTAGLIA', 2, 'tartaglia_portrait.png', 'tartaglia_marketing.png', 5, '2020-11-11', 0, 5, 7, 1, 'Hydro DMG Bonus'),
  ('CHONGYUN', 6, 'chongyun_portrait.png', 'chongyun_marketing.png', 4, '2020-12-01', 0, 2, 2, 2, 'ATK%'),
  ('COLLEI', 5, 'collei_portrait.png', 'collei_marketing.png', 4, '2022-08-24', 0, 5, 4, 5, 'ATK%'),
  ('CYNO', 4, 'cyno_portrait.png', 'cyno_marketing.png', 5, '2022-09-28', 0, 3, 4, 2, 'CRIT DMG'),
  ('DENDRO_TRAVELLER', 5, 'dendro_traveller_portrait.png', 'traveller_marketing.png', 5, '2022-08-24', 0, 1, 8, 2, 'ATK%'),
  ('DILUC', 1, 'diluc_portrait.png', 'diluc_marketing.png', 5, '2020-09-28', 1, 2, 1, 1, 'CRIT Rate'),
  ('DIONA', 6, 'diona_portrait.png', 'diona_marketing.png', 4, '2020-11-11', 0, 5, 1, 6, 'Cryo DMG Bonus'),
  ('DORI', 4, 'dori_portrait.png', 'dori_marketing.png', 4, '2022-09-09', 0, 2, 4, 6, 'HP%'),
  ('ELECTRO_TRAVELLER', 4, 'electro_traveller_portrait.png', 'traveller_marketing.png', 5, '2021-07-21', 0, 1, 8, 2, 'ATK%'),
  ('EULA', 6, 'eula_portrait.png', 'eula_marketing.png', 5, '2021-05-18', 0, 2, 1, 4, 'CRIT DMG'),
  ('FARUZAN', 3, 'faruzan_portrait.png', 'faruzan_marketing.png', 4, '2022-12-07', 0, 5, 4, 5, 'ATK%'),
  ('FISCHL', 4, 'fischl_portrait.png', 'fischl_marketing.png', 4, '2020-09-28', 0, 5, 1, 5, 'ATK%'),
  ('GANYU', 6, 'ganyu_portrait.png', 'ganyu_marketing.png', 5, '2021-01-12', 0, 5, 2, 5, 'CRIT DMG'),
  ('GEO_TRAVELLER', 7, 'geo_traveller_portrait.png', 'traveller_marketing.png', 5, '2020-09-28', 0, 1, 8, 2, 'ATK%'),
  ('GOROU', 7, 'gorou_portrait.png', 'gorou_marketing.png', 4, '2021-12-14', 0, 5, 3, 2, 'Geo DMG Bonus'),
  ('HU_TAO', 1, 'hu_tao_portrait.png', 'hu_tao_marketing.png', 5, '2021-03-02', 0, 3, 2, 5, 'CRIT DMG	'),
  ('ITTO', 7, 'itto_portrait.png', 'itto_marketing.png', 5, '2021-12-14', 0, 2, 3, 1, 'CRIT Rate'),
  ('JEAN', 3, 'jean_portrait.png', 'jean_marketing.png', 5, '2020-09-28', 1, 1, 1, 4, 'Healing Bonus'),
  ('KAEYA', 6, 'kaeya_portrait.png', 'kaeya_marketing.png', 4, '2020-09-28', 1, 1, 1, 1, 'Energy Recharge'),
  ('KAZUHA', 3, 'kazuha_portrait.png', 'kazuha_marketing.png', 5, '2021-06-29', 0, 1, 3, 2, 'Elemental Mastery'),
  ('KEQING', 4, 'keqing_portrait.png', 'keqing_marketing.png', 5, '2020-09-28', 1, 1, 2, 5, 'CRIT DMG'),
  ('KLEE', 1, 'klee_portrait.png', 'klee_marketing.png', 5, '2020-10-20', 0, 4, 1, 6, 'Pyro DMG Bonus'),
  ('KOKOMI', 2, 'kokomi_portrait.png', 'kokomi_marketing.png', 5, '2021-09-21', 0, 4, 3, 5, 'Hydro DMG Bonus'),
  ('SARA', 4, 'sara_portrait.png', 'sara_marketing.png', 4, '2021-09-01', 0, 5, 3, 4, 'ATK%'),
  ('KUKI_SHINOBU', 4, 'kuki_portrait.png', 'kuki_marketing.png', 4, '2022-06-21', 0, 1, 3, 5, 'HP%'),
  ('LAYLA', 6, 'layla_portrait.png', 'layla_marketing.png', 4, '2022-11-18', 0, 1, 4, 5, 'HP%'),
  ('LISA', 4, 'lisa_portrait.png', 'lisa_marketing.png', 4, '2020-09-28', 1, 4, 1, 4, 'Elemental Mastery'),
  ('MONA', 2, 'mona_portrait.png', 'mona_marketing.png', 5, '2020-09-28', 1, 4, 1, 5, 'Energy Recharge'),
  ('NAHIDA', 5, 'nahida_portrait.png', 'nahida_marketing.png', 5, '2022-11-02', 0, 4, 4, 6, 'Elemental Mastery'),
  ('NILOU', 2, 'nilou_portrait.png', 'nilou_marketing.png', 5, '2022-10-14', 0, 1, 4, 5, 'HP%'),
  ('NINGGUANG', 7, 'ningguang_portrait.png', 'ningguang_marketing.png', 4, '2020-11-11', 0, 4, 2, 4, 'Geo DMG Bonus'),
  ('NOELLE', 7, 'noelle_portrait.png', 'noelle_marketing.png', 4, '2020-10-20', 0, 2, 1, 5, 'DEF'),
  ('QIQI', 6, 'qiqi_portrait.png', 'qiqi_marketing.png', 5, '2020-09-28', 1, 1, 2, 6, 'Healing Bonus'),
  ('RAIDEN_SHOGUN', 4, 'raiden_shogun_portrait.png', 'raiden_shogun_marketing.png', 5, '2021-09-01', 0, 3, 3, 4, 'Energy Recharge'),
  ('RAZOR', 4, 'razor_portrait.png', 'razor_marketing.png', 4, '2020-12-01', 0, 2, 1, 2, 'Physical DMG Bonus'),
  ('ROSARIA', 6, 'rosaria_portrait.png', 'rosaria_marketing.png', 4, '2021-04-06', 0, 3, 1, 4, 'ATK%'),
  ('SAYU', 3, 'sayu_portrait.png', 'sayu_marketing.png', 4, '2021-08-10', 0, 2, 3, 6, 'Elemental Mastery'),
  ('WANDERER', 3, 'wanderer_portrait.png', 'wanderer_marketing.png', 5, '2022-12-07', 0, 4, 4, 2, 'CRIT Rate'),
  ('SHENHE', 6, 'shenhe_portrait.png', 'shenhe_marketing.png', 5, '2022-01-05', 0, 3, 2, 4, 'ATK%'),
  ('HEIZOU', 3, 'heizou_portrait.png', 'heizou_marketing.png', 4, '2022-07-13', 0, 4, 3, 2, 'Anemo DMG Bonus'),
  ('SUCROSE', 3, 'sucrose_portrait.png', 'sucrose_marketing.png', 4, '2020-10-20', 0, 4, 1, 5, 'Anemo DMG Bonus'),
  ('THOMA', 1, 'thoma_portrait.png', 'thoma_marketing.png', 4, '2021-11-02', 0, 3, 3, 1, 'ATK%'),
  ('TIGHNARI', 5, 'tighnari_portrait.png', 'tighnari_marketing.png', 5, '2022-08-24', 1, 5, 4, 2, 'Dendro DMG Bonus'),
  ('VENTI', 3, 'venti_portrait.png', 'venti_marketing.png', 5, '2020-09-28', 0, 5, 1, 2, 'Energy Recharge'),
  ('XIANGLING', 1, 'xiangling_portrait.png', 'xiangling_marketing.png', 4, '2020-09-28', 0, 3, 2, 5, 'Elemental Mastery'),
  ('XIAO', 3, 'xiao_portrait.png', 'xiao_marketing.png', 5, '2021-02-03', 0, 3, 2, 2, 'CRIT Rate'),
  ('XINGQIU', 2, 'xingqiu_portrait.png', 'xingqiu_marketing.png', 4, '2020-10-20', 0, 1, 2, 2, 'ATK%'),
  ('XINYAN', 1, 'xinyan_portrait.png', 'xinyan_marketing.png', 4, '2020-12-01', 0, 2, 2, 5, 'ATK%'),
  ('YAE_MIKO', 4, 'yae_miko_portrait.png', 'yae_miko_marketing.png', 5, '2022-02-16', 0, 4, 3, 4, 'Crit Rate'),
  ('YANFEI', 1, 'yanfei_portrait.png', 'yanfei_marketing.png', 4, '2021-04-28', 0, 4, 2, 5, 'Pyro DMG Bonus'),
  ('YAOYAO', 5, 'yaoyao_portrait.png', 'yaoyao_marketing.png', 4, '2023-01-18', 0, 3, 2, 6, 'HP%'),
  ('YELAN', 2, 'yelan_portrait.png', 'yelan_marketing.png', 5, '2022-05-31', 0, 4, 2, 4, 'CRIT Rate'),
  ('YOIMIYA', 1, 'yoimiya_portrait.png', 'yoimiya_marketing.png', 5, '2021-08-10', 0, 5, 3, 5, 'CRIT Rate'),
  ('YUN_JIN', 7, 'yunjin_portrait.png', 'yunjin_marketing.png', 4, '2022-01-05', 0, 3, 2, 5, 'Energy Recharge'),
  ('ZHONGLI', 7, 'zhongli_portrait.png', 'zhongli_marketing.png', 5, '2020-12-01', 0, 3, 2, 1, 'Geo DMG Bonus');