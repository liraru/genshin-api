export interface IBowjaCharacter {
  name: string
  fullname: string
  title: string
  description: string
  rarity: string
  element: string
  weapontype: string
  substat: string
  gender: string
  body: string
  association: string
  region: string
  affiliation: string
  birthdaymmdd: string
  birthday: string
  constellation: string
  cv: Cv
  costs: Costs
  images: Images
  url: Url
  version: string
}

export interface Cv {
  english: string
  chinese: string
  japanese: string
  korean: string
}

export interface Costs {
  ascend1: Ascend1[]
  ascend2: Ascend2[]
  ascend3: Ascend3[]
  ascend4: Ascend4[]
  ascend5: Ascend5[]
  ascend6: Ascend6[]
}

export interface Ascend1 {
  name: string
  count: number
}

export interface Ascend2 {
  name: string
  count: number
}

export interface Ascend3 {
  name: string
  count: number
}

export interface Ascend4 {
  name: string
  count: number
}

export interface Ascend5 {
  name: string
  count: number
}

export interface Ascend6 {
  name: string
  count: number
}

export interface Images {
  icon: string
  sideicon: string
  cover1: string
  cover2: string
  "hoyolab-avatar": string
  nameicon: string
  nameiconcard: string
  namegachasplash: string
  namegachaslice: string
  namesideicon: string
}

export interface Url {
  fandom: string
}
