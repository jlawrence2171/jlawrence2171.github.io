// netlify/functions/getGDCData.js
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

exports.handler = async function (event) {
  try {
    const { symbol } = JSON.parse(event.body || "{}");
    const apiKey = process.env.GDCapiKey;

    if (!symbol || !apiKey) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing symbol or API key" }),
      };
    }

    const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&apikey=${apiKey}&outputsize=300`;
    const res = await fetch(url);
    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error" }),
    };
  }
};
