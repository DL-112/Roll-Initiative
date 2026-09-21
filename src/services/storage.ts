import {
  exists,
  mkdir,
  readTextFile,
  writeTextFile,
  readDir,
  BaseDirectory,
  remove,
} from "@tauri-apps/plugin-fs";
import { Character, CharacterSummary } from "../types/character";

const CHARACTERS_FOLDER = "storage/characters";

// Ensure $APPDATA/storage/characters folder exists
async function ensureStorageFolder(): Promise<void> {
  const isFolderPresent = await exists(CHARACTERS_FOLDER, {
    baseDir: BaseDirectory.AppData,
  });

  if (!isFolderPresent) {
    await mkdir(CHARACTERS_FOLDER, {
      baseDir: BaseDirectory.AppData,
      recursive: true,
    });
  }
}

// Load all character JSON files from AppData/storage/characters
export async function loadCharacters(): Promise<CharacterSummary[]> {
  try {
    await ensureStorageFolder();

    const entries = await readDir(CHARACTERS_FOLDER, {
      baseDir: BaseDirectory.AppData,
    });

    const characters: CharacterSummary[] = [];

    for (const entry of entries) {
      if (entry.name && entry.name.endsWith(".json")) {
        const relativeFilePath = `${CHARACTERS_FOLDER}/${entry.name}`;
        const contents = await readTextFile(relativeFilePath, {
          baseDir: BaseDirectory.AppData,
        });
        const parsed = JSON.parse(contents) as CharacterSummary;
        characters.push(parsed);
      }
    }

    return characters;
  } catch (err) {
    console.error("Error loading characters from AppData:", err);
    return [];
  }
}

// Save or update a character JSON file inside AppData/storage/characters
export async function saveCharacter(
  character: CharacterSummary,
): Promise<void> {
  try {
    await ensureStorageFolder();

    const relativeFilePath = `${CHARACTERS_FOLDER}/${character.id}.json`;
    const jsonContent = JSON.stringify(character, null, 2);

    await writeTextFile(relativeFilePath, jsonContent, {
      baseDir: BaseDirectory.AppData,
    });
  } catch (err) {
    console.error("Error saving character to AppData:", err);
    throw err;
  }
}

export async function deleteCharacter(id: string): Promise<void> {
  try {
    const relativeFilePath = `${CHARACTERS_FOLDER}/${id}.json`;
    await remove(relativeFilePath, {
      baseDir: BaseDirectory.AppData,
    });
  } catch (err) {
    console.error(`Error deleting character ${id}:`, err);
    throw err;
  }
}

// Load a specific full character JSON file by ID
export async function loadCharacterById(id: string): Promise<Character | null> {
  try {
    await ensureStorageFolder();
    const relativeFilePath = `${CHARACTERS_FOLDER}/${id}.json`;

    const isPresent = await exists(relativeFilePath, {
      baseDir: BaseDirectory.AppData,
    });

    if (!isPresent) {
      return null;
    }

    const contents = await readTextFile(relativeFilePath, {
      baseDir: BaseDirectory.AppData,
    });

    return JSON.parse(contents) as Character;
  } catch (err) {
    console.error(`Error loading character ${id}:`, err);
    return null;
  }
}
