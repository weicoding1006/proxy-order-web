import { post,get} from '../lib/http'

interface RegisterRequest
{
    email:string;
    password:string;
    firstName:string;
    lastName:string;
}

interface LoginRequest
{
    email:string;
    password:string;
}

interface UserProfileResponse
{
    id:string;
    email:string;
    firstName:string;
    lastName:string;
    roles:string[];
}

export const register = (data:RegisterRequest) => post('/api/auth/register',data);
export const login = (data:LoginRequest) => post('/api/auth/login',data);
export const me = () => get<UserProfileResponse>('/api/auth/me'); 
