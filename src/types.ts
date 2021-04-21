export type UnionKey<T, K> = T extends K ? T : never;
/**
 * Like *`Pick<T, K extends keyof T>`*, but *`K extends keyof `* **`any`**
 * *From T, pick a set of properties whose keys are in the union K*
 */
export type PickAny<T, K> = Pick<T, K extends keyof T ? K : never>;
