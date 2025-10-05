import { AuthContext, AuthProfile } from '@/components/AuthProvider'
import { decodeJwtPayload } from '@/lib/jwt'
import  { useContext } from 'react'
import { AUTH_TOKEN } from "@/constants/cookies";
import { deleteCookie, setCookie } from "cookies-next";

export const useClientAuth = () => {
	const auth = useContext(AuthContext);
	if(!auth) {
		throw new Error('Context not found')
	}
	const {dispatch} = auth;
	const handleClientAuth = async(token: string) => {
		const profile = decodeJwtPayload(token) as AuthProfile;
		if(profile) {
			dispatch({type: 'login', payload: profile});

			await setCookie(AUTH_TOKEN, token);
			window.location.href = '/dashboard';
		}else {
			dispatch({type: 'logout'});
			await deleteCookie(AUTH_TOKEN)
			window.location.href = '/';
		}
	}
  return handleClientAuth;
}

