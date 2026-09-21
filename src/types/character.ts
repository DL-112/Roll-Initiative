export interface CharacterSummary {
  id: string;
  name: string;
  race: string;
  class: string;
  level: number;
}

export interface Character extends CharacterSummary {
  background: string;
  alignment: string;
  stats: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
}
