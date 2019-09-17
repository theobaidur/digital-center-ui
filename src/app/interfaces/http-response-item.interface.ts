export interface HttpResponseItem<T> {
    id?: string;
    type?: string;
    attributes?: T;
    relationships?: any;
}
