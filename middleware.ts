export {default} from 'next-auth/middleware';

// Роуты защищеныые если пользователь не авторизован
export const config = {
    matcher: ['/profile']
}