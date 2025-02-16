import { Usuario } from "./usuario";

export interface LoginResponse {
  token_jwt: string;
  dados: Usuario;
}
