import { AxiosError } from "axios";
import { tesloApi } from "../api/teslo.api";

export interface _LoginResponse {
    id: string;
    email: string;
    fullName: string;
    isActive: boolean;
    roles: string[];
    token: string;
}

export class AuthService {
    static login = async (email: string, password: string): Promise<_LoginResponse> => {
        try {
            const { data } = await tesloApi.post<_LoginResponse>('/auth/login', { email, password });
            console.log('RESPONSE API = ', data);
            return data;

        } catch (error) {
            if (error instanceof AxiosError) {
                console.log('ERROR INSTANCE = ', error.response?.data);
                throw new Error(error.response?.data)
            }
            console.log('ERROR INSTANCE = ');
            throw new Error('Fuera de servicio...');
        }
    }

}