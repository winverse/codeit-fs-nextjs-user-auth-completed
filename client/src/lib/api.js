import axios from "@/lib/axios";

export async function getMe() {
  try {
    const res = await axios.get("/users/me");
    return res.data;
  } catch {
    // 로그인하지 않은 상태면 null을 돌려줍니다.
    return null;
  }
}

export async function updateMe(formData) {
  const res = await axios.patch("/users/me", formData);
  return res.data;
}

export async function getMyLinks() {
  const res = await axios.get("/users/me/links");
  return res.data;
}

export async function getMyLink(linkId) {
  const res = await axios.get(`/users/me/links/${linkId}`);
  return res.data;
}

export async function createMyLink({ title, url }) {
  const res = await axios.post("/users/me/links", { title, url });
  return res.data;
}

export async function updateMyLink(linkId, { title, url }) {
  const res = await axios.patch(`/users/me/links/${linkId}`, { title, url });
  return res.data;
}

export async function deleteMyLink(linkId) {
  const res = await axios.delete(`/users/me/links/${linkId}`);
  return res.data;
}

export async function getUser(userId) {
  const res = await axios.get(`/users/${userId}`);
  return res.data;
}

export async function getUserLinks(userId) {
  const res = await axios.get(`/users/${userId}/links`);
  return res.data;
}

export async function register({ name, email, password }) {
  const res = await axios.post("/users", { name, email, password });
  return res.data;
}

export async function login({ email, password }) {
  const res = await axios.post("/auth/login", { email, password });
  return res.data;
}

export async function logout() {
  const res = await axios.delete("/auth/logout");
  return res.data;
}
