CREATE TABLE
  "users" ("id" INTEGER, "uid" INTEGER, "name" TEXT, PRIMARY KEY ("id" AUTOINCREMENT));

CREATE TABLE
  "user_weapons" (
    "id" INTEGER,
    "user_id" INTEGER,
    "weapon" TEXT,
    "range" INTEGER,
    "level" INTEGER,
    PRIMARY KEY ("id" AUTOINCREMENT),
    FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE SET NULL
  );

CREATE TABLE
  "user_characters" (
    "id" INTEGER,
    "user_id" INTEGER,
    "character" TEXT UNIQUE,
    "level" INTEGER DEFAULT 1,
    "normal_attack_level" INTEGER DEFAULT 1,
    "elemental_level" INTEGER DEFAULT 1,
    "burst_level" INTEGER DEFAULT 1,
    "constellation" INTEGER DEFAULT 0,
    "assigned_weapon" INTEGER,
    "set1" TEXT,
    "set2" TEXT,
    PRIMARY KEY ("id" AUTOINCREMENT),
    FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE SET NULL,
    FOREIGN KEY ("assigned_weapon") REFERENCES "user_weapons" ("id") ON DELETE SET NULL
  );

CREATE TABLE
  "user_resin_planner" (
    "id" INTEGER,
    "user_id" INTEGER,
    "character_user" INTEGER,
    "set_status" INTEGER,
    "sands_stat" TEXT,
    "sands_status" INTEGER,
    "goblet_stat" TEXT,
    "goblet_status" INTEGER,
    "circlet_stat" TEXT,
    "circlet_status" INTEGER,
    "notes" TEXT,
    FOREIGN KEY ("character_user") REFERENCES "user_characters" ("id") ON DELETE SET NULL,
    FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE SET NULL,
    PRIMARY KEY ("id" AUTOINCREMENT)
  );