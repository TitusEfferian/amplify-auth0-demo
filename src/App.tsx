import { generateClient } from "aws-amplify/api";
import {
  fetchAuthSession,
  signInWithRedirect,
  signOut,
} from "aws-amplify/auth";
import type { Schema } from "../amplify/data/resource";
const client = generateClient<Schema>();

function App() {
  return (
    <main>
      <button
        onClick={() => {
          signInWithRedirect({
            provider: {
              custom: "auth0",
            },
          });
        }}
      >
        signin
      </button>
      <button
        onClick={async () => {
          signOut({ global: true });
        }}
      >
        signout
      </button>
      <button
        onClick={() => {
          fetchAuthSession().then((x) => {
            console.log(x);
          });
        }}
      >
        get current user
      </button>

      <button
        onClick={async () => {
          const session = await fetchAuthSession();
          console.log(session);
          client.models.TestingTable.create(
            {
              content: "hello world",

            },
            {
              authMode: "userPool",
            },
          ).then((x) => {
            console.log(x);
          });
        }}
      >
        create todo
      </button>
      <button
        onClick={() => {
          client.models.TestingTable.list({ authMode: "userPool" }).then(
            (x) => {
              console.log(x);
            },
          );
        }}
      >
        get data
      </button>
    </main>
  );
}

export default App;
