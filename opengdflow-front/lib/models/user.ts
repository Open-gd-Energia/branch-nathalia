import type { API } from "../types/api";

type UserApiType = API["schemas"]["UsuarioResponse"];
type UserRequestType = API["schemas"]["UsuarioRequest"];

export interface User extends UserApiType {}

export interface UserRequest extends UserRequestType {}
