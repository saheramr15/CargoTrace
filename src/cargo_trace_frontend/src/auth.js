import { AuthClient } from "@dfinity/auth-client";

let authClient = null;

export async function initAuth() {
  if (!authClient) {
    authClient = await AuthClient.create();
  }
  return authClient;
}

export async function login(onSuccessCallback) {
  const client = await initAuth();

  await client.login({
    identityProvider: "https://identity.ic0.app",
    onSuccess: () => {
      console.log("✅ Logged in!");
      if (typeof onSuccessCallback === 'function') {
        onSuccessCallback(); 
      }
    },
  });
}


export async function logout() {
  const client = await initAuth();
  await client.logout();
  console.log("🚪 Logged out.");
  window.location.reload();
}

export async function checkAuth() {
  const client = await initAuth();
  return client.isAuthenticated();
}

export async function getPrincipal() {
  const client = await initAuth();
  return client.getIdentity().getPrincipal().toText();
}
