export interface Base {
    created_at?: string;
    updated_at?: string;
    store_query_hash?: string;
    id?: string;
    slug?: string;
    _type?: string;
    _relationships?: {[entityType: string]: any | any[]};
    [key: string]: any;
}
