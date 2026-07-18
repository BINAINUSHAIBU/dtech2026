const fs = require("fs");
const path = require("path");

const files = [
  "channels_part1.json",
  "channels_part2.json",
  "channels_part3.json",
  "channels_part4.json",
  "channels_part5.json",
  "channels_part6.json",
  "channels_part7.json",
];

let channels = [];

for (const file of files) {
  const filePath = path.join(__dirname, "data", file);

  if (!fs.existsSync(filePath)) {
    console.log(`${file} not found`);
    continue;
  }

  const json = JSON.parse(fs.readFileSync(filePath, "utf8"));

  channels.push(...json);
}

channels.sort((a, b) => a.id - b.id);

fs.writeFileSync(
  path.join(__dirname, "data", "channels.json"),

  JSON.stringify(channels, null, 2),

  "utf8",
);

console.log(
  `${channels.length.toLocaleString()} channels merged successfully.`,
);
