import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(
  'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2'
);

const alg = 'HS256';

const jwt = {
    sign: (payload) => {
        return new SignJWT(payload)
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .setIssuer('https://FreeCodeCamp.org')
            .setAudience('https://FreeCodeCamp.org')
            .setExpirationTime('2h')
            .sign(secret)
    },
    verify: async (token) => {
        const { payload, protectedHeader } = await jwtVerify(token, secret, {
            issuer: 'https://FreeCodeCamp.org',
            audience: 'https://FreeCodeCamp.org',
        });
        return payload;
    }
};

export default jwt;

