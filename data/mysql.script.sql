CREATE TABLE
  `users` (`id` INT NOT NULL AUTO_INCREMENT, `uid` VARCHAR(10) NOT NULL, `name` VARCHAR(50), PRIMARY KEY (`id`));

CREATE TABLE
  `user_weapons` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT,
    `weapon` VARCHAR(512),
    `range` TINYINT,
    `level` TINYINT,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
  );
:
CREATE TABLE
  `user_characters` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT,
    `character` VARCHAR(512) UNIQUE,
    `level` TINYINT DEFAULT 1,
    `normal_attack_level` TINYINT DEFAULT 1,
    `elemental_level` TINYINT DEFAULT 1,
    `burst_level` TINYINT DEFAULT 1,
    `constellation` TINYINT DEFAULT 0,
    `assigned_weapon` INT,
    `set1` VARCHAR(512),
    `set2` VARCHAR(512),
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
    FOREIGN KEY (`assigned_weapon`) REFERENCES `user_weapons` (`id`) ON DELETE SET NULL
  );

CREATE TABLE
  `characters` (
    `name` VARCHAR(80) UNIQUE NOT NULL,
    `title` VARCHAR(512),
    `description` VARCHAR(500),
    `element` VARCHAR(10),
    `birthday` VARCHAR(5),
    `ratity` CHAR(1),
    `gender` VARCHAR(10),
    `region` VARCHAR(20),
    `affiliation` VARCHAR(50),
    `constellation` VARCHAR(30),
    `weapontype` VARCHAR(20),
    `substat` VARCHAR(30),
    `icon` VARCHAR(512),
    `icon_item` VARCHAR(512),
    `icon_party` VARCHAR(512),
    `gacha_splash` VARCHAR(512),
    `gacha_multi` VARCHAR(512),
    PRIMARY KEY (`name`)
  );

CREATE TABLE
  `user_abyss_teams` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT,
    `name` VARCHAR (512),
    `character_1` VARCHAR(512),
    `character_2` VARCHAR(512),
    `character_3` VARCHAR(512),
    `character_4` VARCHAR(512),
    `WIP` TINYINT(1) DEFAULT 0,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
    FOREIGN KEY (`character_1`) REFERENCES `characters` (`name`) ON DELETE NO ACTION,
    FOREIGN KEY (`character_2`) REFERENCES `characters` (`name`) ON DELETE NO ACTION,
    FOREIGN KEY (`character_3`) REFERENCES `characters` (`name`) ON DELETE NO ACTION,
    FOREIGN KEY (`character_4`) REFERENCES `characters` (`name`) ON DELETE NO ACTION
  );

CREATE TABLE
  `user_resin_planner` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT,
    `character_user` INT,
    `order` INT,
    `set_status` TINYINT,
    `sands_stat` VARCHAR(512),
    `sands_status` TINYINT,
    `goblet_stat` VARCHAR(512),
    `goblet_status` TINYINT,
    `circlet_stat` VARCHAR(512),
    `circlet_status` TINYINT,
    `notes` VARCHAR(512),
    FOREIGN KEY (`character_user`) REFERENCES `user_characters` (`id`) ON DELETE SET NULL,
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
    PRIMARY KEY (`id`)
  );

CREATE TABLE
  `user_wish_history` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT,
    `Banner` VARCHAR(100),
    `Type` VARCHAR(50),
    `Name` VARCHAR(80),
    `Time` VARCHAR(20),
    `Rarity` TINYINT,
    `Pity` MEDIUMINT,
    `Roll` MEDIUMINT,
    `Group` MEDIUMINT,
    `Title` VARCHAR(100),
    `Part` VARCHAR(20),
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
  );

CREATE TABLE `user_savings` (
  `user_id` INT,
  `interwined` INT DEFAULT 0,
  `acquaint` INT DEFAULT 0,
  PRIMARY KEY (`user_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
);

CREATE TABLE `user_abyss`(
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT,
  `date` VARCHAR(20),
  `version` VARCHAR(5),
  `stars` INT,
  `deepest_descend` VARCHAR(5),
  `battles_fought`INT,
  `most_defeats` INT,
  `most_defeats_character` VARCHAR(80),
  `strongest_stike` INT,
  `strongest_strike_character` VARCHAR(80),
  `most_damage_taken` INT,
  `most_damage_taken_character` VARCHAR(80),
  `more_elemental_burst` INT,
  `more_elemental_burst_character` VARCHAR(80),
  `more_elemental_skill` INT,
  `more_elemental_skill_character` VARCHAR(80),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  FOREIGN KEY (`most_defeats_character`) REFERENCES `characters` (`name`) ON DELETE SET NULL,
  FOREIGN KEY (`strongest_strike_character`) REFERENCES `characters` (`name`) ON DELETE SET NULL,
  FOREIGN KEY (`most_damage_taken_character`) REFERENCES `characters` (`name`) ON DELETE SET NULL,
  FOREIGN KEY (`more_elemental_burst_character`) REFERENCES `characters` (`name`) ON DELETE SET NULL,
  FOREIGN KEY (`more_elemental_skill_character`) REFERENCES `characters` (`name`) ON DELETE SET NULL
);

CREATE TABLE `user_abyss_floor` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT,
  `abyss_id` INT,
  `floor` INT,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  FOREIGN KEY (`abyss_id`) REFERENCES `user_abyss` (`id`) ON DELETE SET NULL
);

CREATE TABLE `user_abyss_floor_chamber` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT,
  `floor_id` INT,
  `date` VARCHAR(30),
  `stars` INT,
  `first_chamber_character_1` VARCHAR(80),
  `first_chamber_character_2` VARCHAR(80),
  `first_chamber_character_3` VARCHAR(80),
  `first_chamber_character_4` VARCHAR(80),
  `second_chamber_character_1` VARCHAR(80),
  `second_chamber_character_2` VARCHAR(80),
  `second_chamber_character_3` VARCHAR(80),
  `second_chamber_character_4` VARCHAR(80),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  FOREIGN KEY (`floor_id`) REFERENCES `user_abyss_floor` (`id`) ON DELETE SET NULL,
  FOREIGN KEY (`first_chamber_character_1`) REFERENCES `characters` (`name`) ON DELETE SET NULL,
  FOREIGN KEY (`first_chamber_character_2`) REFERENCES `characters` (`name`) ON DELETE SET NULL,
  FOREIGN KEY (`first_chamber_character_3`) REFERENCES `characters` (`name`) ON DELETE SET NULL,
  FOREIGN KEY (`first_chamber_character_4`) REFERENCES `characters` (`name`) ON DELETE SET NULL,
  FOREIGN KEY (`second_chamber_character_1`) REFERENCES `characters` (`name`) ON DELETE SET NULL,
  FOREIGN KEY (`second_chamber_character_2`) REFERENCES `characters` (`name`) ON DELETE SET NULL,
  FOREIGN KEY (`second_chamber_character_3`) REFERENCES `characters` (`name`) ON DELETE SET NULL,
  FOREIGN KEY (`second_chamber_character_4`) REFERENCES `characters` (`name`) ON DELETE SET NULL
);