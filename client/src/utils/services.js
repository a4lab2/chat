export const baseurl = "http://localhost:5000/api";

export const postRequest = async (url, body) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await res.json();

  if (!res.ok) {
    let message;
    if (data?.message) {
      message = data.message;
    } else {
      message = data;
      console.log(message);
    }
    return { error: true, message };
  }
  return data;
};
