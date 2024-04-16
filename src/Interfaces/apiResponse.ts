export default interface apiResponse {
    data?: {
        statuscode?: number;
        isSuccess?: boolean;
        errorMessages?: Array<string>;
        result:{
            [key:string] : string
        }
    };
    error?: any;
    
}