export type Json<ContainedType> =  string & {__JSON__: ContainedType};

export function decodeJson<ContainedType>(
  json: Json<ContainedType>
): ContainedType {
  return JSON.parse(json) as ContainedType;
}

export function encodeJson<ContainedType>(
  value: ContainedType
): Json<ContainedType> {
  return JSON.stringify(value) as Json<ContainedType>;
}
