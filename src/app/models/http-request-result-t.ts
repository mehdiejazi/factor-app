export class HttpRequestResultT<T>{

    public constructor() { }

    public data: T;

    public isSuccessful: boolean;

    public errorMessages: string[] = [];
    public warningMessages: string[] = [];
    public informationMessages: string[] = [];
}
