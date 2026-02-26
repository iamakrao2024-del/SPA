const fs = require('fs');
const path = require('path');

// Load locations with postalCode + zipCode + slug
const locations = JSON.parse(fs.readFileSync("locations.json", "utf8"));

const outputFolder = path.join(__dirname, 'SPA');
if (!fs.existsSync(outputFolder)) fs.mkdirSync(outputFolder);

const images = [
  "/images/1.jpg","/images/2.jpg","/images/3.jpg",
  "/images/4.jpg","/images/5.jpg","/images/6.jpg",
  "/images/7.jpg","/images/8.jpg","/images/9.jpg",
  "/images/10.jpg","/images/11.jpg","/images/12.jpg",
  "/images/13.jpg","/images/14.jpg","/images/15.jpg",
  "/images/16.jpg","/images/17.jpg","/images/18.jpg",
  "/images/bg.jpg"
];

// Slugify function
const slugify = (text) =>
  text.toLowerCase().replace(/\s+/g, '-').replace(/,/g, '');

const generateHTMLContent = (loc, pageContent, index) => {

  const cycleIndex = index % 3;
  const start = cycleIndex * 6;

  const img1 = images[start + 0];
  const img2 = images[start + 1];
  const img3 = images[start + 2];
  const img4 = images[start + 3];
  const img5 = images[start + 4];
  const img6 = images[start + 5];

  const bg = images[18];

  // 🔥 FIXED — Dynamic location tags with correct slug
  let locationsListHTML = "";
  locations.forEach(l => {
    locationsListHTML += `<a href="spa-centre-in-${l.slug}.html">${l.location}</a>`;
  });

  return pageContent
    .replace(/{{location}}/g, loc.location)
    .replace(/{{city}}/g, loc.city)
    .replace(/{{slug}}/g, loc.slug)
    .replace(/{{postalCode}}/g, loc.postalCode)
    .replace(/{{zipCode}}/g, loc.zipCode)
    .replace(/{{img1}}/g, img1)
    .replace(/{{img2}}/g, img2)
    .replace(/{{img3}}/g, img3)
    .replace(/{{img4}}/g, img4)
    .replace(/{{img5}}/g, img5)
    .replace(/{{img6}}/g, img6)
    .replace(/{{bg}}/g, bg)
    .replace(/{{locationsList}}/g, locationsListHTML);
};

fs.readFile(path.join(__dirname, 'pages.html'), 'utf8', (err, pageContent) => {
  if (err) return console.error("Error reading template file", err);

  locations.forEach((loc, index) => {

    const fileName = `spa-centre-in-${loc.slug}.html`;

    const updatedContent = generateHTMLContent(loc, pageContent, index);

    fs.writeFile(path.join(outputFolder, fileName), updatedContent, 'utf8', (err) => {
      if (err) console.error(`Error creating ${fileName}:`, err);
      else console.log(`${fileName} created successfully!`);
    });
  });

  console.log("All HTML pages generated successfully!");
});

