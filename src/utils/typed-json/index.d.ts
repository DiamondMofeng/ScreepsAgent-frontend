export declare type Json<ContainedType> = string & {
  __JSON__: ContainedType;
};
export declare type ExampleType = {
  example: string;
};
export declare function decodeJson<ContainedType>(json: Json<ContainedType>): ContainedType;
export declare function encodeJson<ContainedType>(value: ContainedType): Json<ContainedType>;
