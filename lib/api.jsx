const BASE_URL = "http://localhost:7000/api";

// export const api = async (endpoint, method = "GET", body) => {
//   const res = await fetch(`${BASE_URL}${endpoint}`, {
//     method,
//     credentials: "include", // 🔥 cookies (auth) ke liye
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: body ? JSON.stringify(body) : undefined,
//   });

//   return res.json();
// };


export const api = async (endpoint, method = "GET", body, headers = {}) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...headers, // 🔥 custom headers add
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  return res.json();
};