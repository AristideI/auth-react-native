import axios from "axios";

const api = "https://identitytoolkit.googleapis.com/v1/accounts";
const apiKey = "AIzaSyApDF_FzVdQCv8TkT9TNlIIhvUKo6n5w3o";

export async function createUser(email, password) {
  const response = await axios.post(`${api}:signUp?key=${apiKey}`, {
    email,
    password,
    returnSecureToken: true,
  });
}
export async function login(email, password) {
  const response = await axios.post(`${api}:signInWithPassword?key=${apiKey}`, {
    email,
    password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;
  return token;
}
