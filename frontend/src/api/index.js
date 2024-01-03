const GLOBAL_URL = "http://localhost:5000/api";
const fetchData = async (relativeUrl, method, data = null) => {
  const fullUrl = GLOBAL_URL + relativeUrl;

  const options = { method };
  if (data) {
    options.headers = {
      "Content-Type": "application/json",
    };

    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(fullUrl, options);

    const body = await response.json();

    return {
      data: body,
      status: response.status,
      ok: response.ok,
    };
  } catch (err) {
    console.error(err);
  }
};

export { fetchData };
