function getCommonOptions() {
  const authToken = localStorage.get("auth_token");

  if (!authToken) {
    return {};
  }

  return {
    headers: {
      Authorization: `Token ${authToken}`,
    },
  };
}

export default getCommonOptions;
