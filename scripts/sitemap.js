const path = require('path');
const fs = require('fs-extra');
const SitemapGenerator = require('sitemap-generator');

const xmlFile = path.join(process.cwd(), '.deploy/sitemap.xml')
const generator = SitemapGenerator('https://shells.3caio.com', {
  maxDepth: 0,
  filepath: xmlFile,
  maxEntriesPerFile: 50000,
  stripQuerystring: true,
  decodeResponses: true,
});

// register event listeners
generator.on('done', async () => {
  const str = await fs.readFileSync(xmlFile);

  // const newStr = str.toString().replace(/http\:\/\/shells\.3caio\.com/g, 'https://shells.3caio.com');

  await fs.outputFile(xmlFile, str);
  console.log('sitemaps created!')
});

// start the crawler
generator.start();