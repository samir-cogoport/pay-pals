import { AUTH_TOKEN } from '@/constants/cookies';
import { decodeJwtPayload } from '@/lib/jwt';
import { getCookie } from 'cookies-next';
import React, { useCallback, useEffect, useReducer } from 'react';

export type AuthProfile = {
	user_id: number;
	email: string;
	exp: number;
	name: string;
	mobile_number: string | null;
	mobile_country_code: string | null;
	profile_picture: string | null;
} | null;

export type AuthState = {
	isAuthenticated: boolean;
	profile: AuthProfile;
};

export type AuthAction =
	| { type: 'login'; payload: AuthProfile }
	| { type: 'logout' };

export type AuthContextValue = {
	store: AuthState;
	dispatch: React.Dispatch<AuthAction>;
};

const initialAuthState: AuthState = {
	isAuthenticated: false,
	profile        : null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
	switch (action.type) {
		case 'login':
			return {
				isAuthenticated: true,
				profile        : action.payload,
			};
		case 'logout':
			return initialAuthState;
		default:
			return state;
	}
};

export const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [store, dispatch] = useReducer(authReducer, initialAuthState);

	const updateStore = useCallback(async () => {
		const authToken = await getCookie(AUTH_TOKEN);
		if(authToken) {
			const profile = decodeJwtPayload(authToken as string);
			dispatch({type: 'login', payload: profile as AuthProfile})
		}
	}, [])

	useEffect(() => {
		updateStore()
	}, [])

	return (
		<AuthContext.Provider value={{ store, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
