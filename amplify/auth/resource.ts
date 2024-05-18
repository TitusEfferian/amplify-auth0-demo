import { defineAuth, secret } from "@aws-amplify/backend";

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      oidc: [
        {
          name: "auth0",
          /**
           * Since in Amplify, the TypeScript definition of clientId and clientSecret is BackendSecret, 
           * we need to store the values in Amplify's secret manager.
           */
          clientId: secret("authClient"),
          clientSecret: secret("authSecret"),
          issuerUrl: "https://testing-amplify.jp.auth0.com",
          scopes: ["openid", "profile", "email", "name"], // Include the email scope
        },
      ],
      logoutUrls: [
        "http://localhost:5173",
        // your staging / production domain later
      ],
      callbackUrls: [
        "http://localhost:5173",
        // your staging / production domain later
      ],
    },
  },
});
