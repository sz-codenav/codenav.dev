const fs = require("fs");
const path = require("path");

// Get the current time and format it as YYYY.MM.DD.HHMM
const now = new Date();
const formattedVersion = `${now.getFullYear()}.${String(
  now.getMonth() + 1
).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")}.${String(
  now.getHours()
).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}`;

// Define the path to package.json
const packagePath = path.resolve(__dirname, "../package.json");

try {
  // Read the package.json file
  const packageData = fs.readFileSync(packagePath, "utf-8");
  const packageJson = JSON.parse(packageData);

  // Update the version field
  packageJson.version = formattedVersion;

  // Write the updated package.json back to the file
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2), "utf-8");

  console.log(
    `The version field in package.json has been updated to: ${formattedVersion}`
  );
} catch (error) {
  console.error(
    "An error occurred while updating package.json:",
    error.message
  );
}
