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
    `name` VARCHAR(512) UNIQUE NOT NULL,
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