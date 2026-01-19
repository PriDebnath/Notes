import { useState } from "react";
export const STORAGE_KEYS = {
  THEME: "app_theme",
  APPEARANCE: "app_appearance",
} as const;

// union type of all values
export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];


export function useLocalStorage<T>(
  key: StorageKey,
  initialValue: T
): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : initialValue;
  });

  const setStoredValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue];
}
