#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Directory to search
const searchDir = path.join(__dirname, 'langu-remontas/content/collections/news');

// Function to extract all /images/news/ URLs from content
function extractUrlsFromContent(content) {
  const regex = /\/images\/news\/[^"'\s]+/g;
  return content.match(regex) || [];
}

// Process all JSON files and collect unique URLs
function extractAllUrls() {
  console.log('🔍 Extracting all /images/news/* URLs...\n');
  
  if (!fs.existsSync(searchDir)) {
    console.error(`❌ Directory not found: ${searchDir}`);
    process.exit(1);
  }
  
  const files = fs.readdirSync(searchDir).filter(file => file.endsWith('.json'));
  const allUrls = new Set();
  
  files.forEach(file => {
    const filePath = path.join(searchDir, file);
    console.log(`📄 Scanning: ${file}`);
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const urls = extractUrlsFromContent(content);
      
      urls.forEach(url => {
        allUrls.add(url);
        console.log(`  Found: ${url}`);
      });
      
      if (urls.length === 0) {
        console.log(`  ⏭️  No /images/news/ URLs found`);
      }
    } catch (error) {
      console.error(`  ❌ Error processing ${file}:`, error.message);
    }
    
    console.log('');
  });
  
  console.log('📊 Summary:');
  console.log(`   Files scanned: ${files.length}`);
  console.log(`   Unique URLs found: ${allUrls.size}`);
  console.log('\n🔗 All unique URLs:');
  
  const sortedUrls = Array.from(allUrls).sort();
  sortedUrls.forEach((url, index) => {
    console.log(`${index + 1}. ${url}`);
  });
  
  return sortedUrls;
}

// Run the extraction
const urls = extractAllUrls();

// Save to file for reference
const outputFile = path.join(__dirname, 'found-urls.txt');
fs.writeFileSync(outputFile, urls.join('\n'), 'utf8');
console.log(`\n💾 URLs saved to: ${outputFile}`);
