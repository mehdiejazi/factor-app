import { User } from "../../interfaces/user/user";

export class LoginResponse {

    public token: string;
    public refreshToken: string;
    public user: User;

}