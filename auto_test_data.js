const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

function getRandomName() {
  const names = ["Sensor-A", "Sensor-B", "Traffic", "Users", "Sales", "Finance"];
  return names[Math.floor(Math.random() * names.length)];
}

function getRandomValue() {
  return Math.floor(Math.random() * 100); // 0–100
}

async function sendTestData() {
  const data = {
    name: getRandomName(),
    value: getRandomValue()
  };

  try {
    const res = await fetch("http://localhost:4000/ingest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const json = await res.json();
    console.log("✔ Sent:", data, "| Response:", json);
  } catch (error) {
    console.log(" Error:", error.message);
  }
}

console.log("🚀 Auto Test Data Generator Started...");
setInterval(sendTestData, 5000);
