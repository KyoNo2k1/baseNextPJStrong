

/* Jmix */
export interface  IBaseCreated{
    "_entityName": string,
    "_instanceName": string,
    "id": React.Key
}
export interface  IBaseWithCount<T>{
  count:number,
  data : T
}


export interface IResponseError {
  error: string;
  message : string,
  code : string ,
  traceId : string ,
  errorDescription : string
}
