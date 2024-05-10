export interface IStorage {
  getItem(key_: string): string | null
  setItem(key_: string, value: string): void
  removeItem(key_: string): void
}
