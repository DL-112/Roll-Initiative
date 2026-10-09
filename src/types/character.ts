export interface Multiclass {
  class: string;
  subclass?: string;
  level: number;
  xp?: number; // Class-specific XP for multiclassing
}

export interface HitDice {
  dieType: string; // e.g., "d8", "d10"
  current: number;
  total: number;
}

export interface ArmorClass {
  flatBonus?: number;
  hasShield?: boolean;
  shieldAcBonus?: number;
  equippedArmor?: {
    name: string;
    baseAc: number;
    dexCap?: number;
  };
}

export interface Weapon {
  name: string;
  damage?: string;
  damageType?: string;
  properties?: string[];
  isEquipped?: boolean;
}

export interface Feat {
  name: string;
  description: string;
  source?: string;
  chosenOptions?: string[]; // e.g. Selected Metamagic options, Fighting Styles
}

export interface Feature {
  name: string;
  source: string; // e.g. "Sorcerer Level 1", "Mystra's Chosen"
  description: string;
  chosenOptions?: string[]; // e.g. Eldritch Invocations, Pact Boon selections
}

export interface Spell {
  id?: string;
  name: string;
  level: number; // 0 for cantrips, 1-9 for spell levels
  school?: string;
  castingTime?: string;
  range?: string;
  components?: string;
  duration?: string;
  description: string;
  class?: string; // (e.g., "Sorcerer", "Warlock", etc.)
  prepared?: boolean;
}

export interface Spellcasting {
  ability: string;
  saveDc?: number;
  attackBonus?: number;
}

export interface EquipmentItem {
  id?: string;
  name: string;
  quantity?: number;
  weight?: number;
  isEquipped?: boolean;
  isAttuned?: boolean;
  isWeapon?: boolean;
  description?: string;
}

export interface PetOrCompanion {
  id?: string;
  name: string;
  type: string; // e.g. "Llama", "Familiar", "Imp"
  hp?: number;
  maxHp?: number;
  ac?: number;
  notes?: string;
}

export interface Character {
  id: string;
  name: string;
  race: string;
  size?: "Tiny" | "Small" | "Medium" | "Large" | "Huge" | "Gargantuan";
  class: string;
  subclass?: string;
  level: number;
  xp?: number; // Class-specific XP for primary class
  multiclass?: Multiclass[];
  background?: string;
  alignment?: string;
  heroicInspiration?: boolean;

  // Vitals & Stats
  currentHp: number;
  maxHp: number;
  tempHp?: number;
  initiativeBonus?: number;
  passivePerception?: number;
  speed?: {
    walk: number;
    fly?: number;
    swim?: number;
    climb?: number;
  };
  hitDice?: HitDice[];
  deathSaves?: {
    successes: number;
    failures: number;
  };

  // Stats & Proficiencies
  stats: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  savingThrowProficiencies?: Array<keyof Character["stats"]>;
  skillProficiencies?: string[];
  skillExpertise?: string[];

  // Inventory, Weapons & Customization
  weapons?: Weapon[];
  inventory?: EquipmentItem[];
  attunedItems?: EquipmentItem[];
  equippedGear?: {
    rightHand?: string;
    leftHand?: string;
    wearables?: string[];
  };
  companions?: PetOrCompanion[];

  currency?: {
    cp: number;
    sp: number;
    ep: number;
    gp: number;
    pp: number;
  };
  languages?: string[];
  armorClass?: ArmorClass;
  feats?: Feat[];
  features?: Feature[];
  spells?: Spell[];
  spellcasting?: Spellcasting;
}

export type CharacterSummary = Pick<
  Character,
  "id" | "name" | "race" | "class" | "subclass" | "level" | "background"
>;
