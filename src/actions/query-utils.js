export function query(type, accesToken) {
  const request = `https://avatar.lyrebird.ai/api/v0/${type}`;
  const defaultConfig = {
    headers: {
      Authorization: `Bearer ${accesToken}`,
      "Content-Type": "application/json"
    }
  };
  return fetch(request, defaultConfig).then(response => {
    return response.json().then(body => {
      return new Promise((resolve, reject) => {
        if (response.status === 200) {
          resolve(body);
        } else {
          reject(body);
        }
      });
    });
  });
}

export const parseURL = () => {
  return window.location.hash
    .slice(1)
    .split("&")
    .map(d => d.split("="))
    .reduce((pre, [key, value]) => ({ ...pre, [key]: value }), {});
};
