export class HttpRequestResult{

    public constructor() { }

    public isSuccessful: boolean;

    public errorMessages: string[] = [];
    public warningMessages: string[] = [];
    public informationMessages: string[] = [];
}
