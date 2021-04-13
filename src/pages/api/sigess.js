import axios from 'axios';
import axiosCookieJarSupport from 'axios-cookiejar-support';
import tough from 'tough-cookie';

const cookieJar = new tough.CookieJar();

const cosa = axios.create({
    baseURL: 'http://127.0.0.1:5000/',
    withCredentials: true,
    jar: cookieJar
});

axiosCookieJarSupport(cosa);

export default cosa;