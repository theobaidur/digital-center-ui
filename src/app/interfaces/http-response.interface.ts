export interface HttpResponse<T> {
    data: T;
    meta?: string;
    included?: any[];
}
