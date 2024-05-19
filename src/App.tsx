import { generateClient } from "aws-amplify/api";
import {
  fetchAuthSession,
  signInWithRedirect,
  signOut,
} from "aws-amplify/auth";
import type { Schema } from "../amplify/data/resource";
const client = generateClient<Schema>();

function App() {

  const handleSignInWithRedirect = () => {
    signInWithRedirect({
      provider: {
        // use the exact name we defined from the backend configuration
        custom: "auth0",
      },
    });
  }

  const handleSignOut = () => {
    signOut({ global: true });
  }
  const handleGetCurrentUser = async () => {
    const session = await fetchAuthSession();
    console.log(session);
  }
  const handleCreateData = async () => {
    const data = await client.models.TestingTable.create(
      {
        content: "hello world",
      },
      {
        // need to specify userPool because we are using owner authorization for this model
        authMode: "userPool",
      },
    );
    console.log(data);
  }
  const handleGetAllData = async () => {
    // need to specify userPool because we are using owner authorization for this model
    const data = await client.models.TestingTable.list({ authMode: "userPool" });
    console.log(data);
  }
  return (
    <main>
      <button
        onClick={handleSignInWithRedirect}
      >
        signin
      </button>
      <button
        onClick={handleSignOut}
      >
        signout
      </button>
      <button
        onClick={handleGetCurrentUser}
      >
        get current user
      </button>

      <button
        onClick={handleCreateData}
      >
        create todo
      </button>
      <button
        onClick={handleGetAllData}
      >
        get data
      </button>
    </main>
  );
}

export default App;
