export enum SearchOrigin {
    STORE_BANNER = 1,
    GLOBAL_SEARCH = 2,
    URL = 3
}
export interface SearchInfo {
    query?: string;
    origin?: SearchOrigin;
}
