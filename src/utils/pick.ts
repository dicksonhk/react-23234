import {PickAny as Pick} from "types";

// keys: readonly K[] <-- TODO: update typescript version
export const pick = <T, K extends keyof any | keyof T>(obj: T, keys: readonly K[]) => keys.reduce((result, key) => (key in obj ? Object.assign(result, {[key]: obj[key as any]}) : result), {} as Pick<T, K>);
