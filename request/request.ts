import { AUTH_TOKEN } from '@/constants/cookies';
import Axios from 'axios';
import type { CustomParamsSerializer, InternalAxiosRequestConfig } from 'axios';
import { getCookie } from 'cookies-next';
import qs from 'qs';

const customSerializer: CustomParamsSerializer = (params, _options) => (
	qs.stringify(params, {
		arrayFormat: 'brackets',
	})
);

const request = Axios.create({
	baseURL : process.env.NEXT_PUBLIC_REST_BASE_API_URL,
});

request.interceptors.request.use((oldConfig: InternalAxiosRequestConfig) => {
	const newConfig: InternalAxiosRequestConfig = {
		...oldConfig,
	};

	const cookieValue = getCookie(AUTH_TOKEN);
	const authToken = typeof cookieValue === 'string' ? cookieValue : '';

	newConfig.paramsSerializer = customSerializer;

	if (authToken) {
		if (newConfig.headers) {
			if (typeof newConfig.headers.set === 'function') {
				newConfig.headers.set('authorization', `Bearer ${authToken}`);
			} else {
				newConfig.headers['authorization'] = `Bearer ${authToken}`;
			}
		} else {
			newConfig.headers = { authorization: `Bearer ${authToken}` } as any;
		}
	}

	return newConfig;
});

export default request;
