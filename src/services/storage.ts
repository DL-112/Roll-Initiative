import {
  exists,
  mkdir,
  readTextFile,
  writeTextFile,
  readDir,
  remove,
  BaseDirectory,
} from "@tauri-apps/plugin-fs";
import { appDataDir, join } from "@tauri-apps/api/path";
import { Character, CharacterSummary } from "../types/character";

const CHARACTERS_FOLDER = "storage/characters";
const BASE_DIR = { baseDir: BaseDirectory.AppData };

// Optional helper to print the actual folder location in your dev tools
export async function logStorageLocation(): Promise<void> {
  const base = await appDataDir();
  const fullPath = await join(base, CHARACTERS_FOLDER);
  console.log("📁 Characters folder location on disk:", fullPath);
}

// Ensure storage/characters folder exists in AppData
async function ensureStorageFolder(): Promise<void> {
  try {
    const isFolderPresent = await exists(CHARACTERS_FOLDER, BASE_DIR);
    if (!isFolderPresent) {
      await mkdir(CHARACTERS_FOLDER, { recursive: true, ...BASE_DIR });
    }
  } catch (err) {
    console.error("Failed to ensure storage directory:", err);
  }
}

// Load all character JSON files from AppData/storage/characters
export async function loadCharacters(): Promise<CharacterSummary[]> {
  try {
    await ensureStorageFolder();

    const entries = await readDir(CHARACTERS_FOLDER, BASE_DIR);
    const characters: CharacterSummary[] = [];

    for (const entry of entries) {
      const fileName = entry.name;

      if (fileName && fileName.endsWith(".json")) {
        const relativeFilePath = `${CHARACTERS_FOLDER}/${fileName}`;

        try {
          const contents = await readTextFile(relativeFilePath, BASE_DIR);
          const parsed = JSON.parse(contents) as CharacterSummary;
          if (parsed && parsed.id) {
            characters.push(parsed);
          }
        } catch (fileErr) {
          console.error(`Error reading character file ${fileName}:`, fileErr);
        }
      }
    }

    return characters;
  } catch (err) {
    console.error("Error loading characters from storage folder:", err);
    return [];
  }
}

// Save or update a character JSON file inside AppData/storage/characters
export async function saveCharacter(character: Character): Promise<void> {
  try {
    await ensureStorageFolder();

    const relativeFilePath = `${CHARACTERS_FOLDER}/${character.id}.json`;
    const jsonContent = JSON.stringify(character, null, 2);

    await writeTextFile(relativeFilePath, jsonContent, BASE_DIR);
  } catch (err) {
    console.error("Error saving character to storage folder:", err);
    throw err;
  }
}

export async function deleteCharacter(id: string): Promise<void> {
  try {
    const relativeFilePath = `${CHARACTERS_FOLDER}/${id}.json`;
    await remove(relativeFilePath, BASE_DIR);
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

    const isPresent = await exists(relativeFilePath, BASE_DIR);

    if (!isPresent) {
      console.warn(`Character file not found at path: ${relativeFilePath}`);
      return null;
    }

    const contents = await readTextFile(relativeFilePath, BASE_DIR);
    return JSON.parse(contents) as Character;
  } catch (err) {
    console.error(`Error loading character ${id}:`, err);
    return null;
  }
}
