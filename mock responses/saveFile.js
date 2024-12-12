import fs from "fs/promises";

export async function saveApiResponseToFile(response, filePath) {
  console.log("saving data");
  const data = JSON.stringify(response, null, 2);
  await fs.writeFile(filePath, data, "utf-8");
}
