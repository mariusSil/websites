#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Extract all Google Storage URLs from design reference
function extractGoogleStorageUrls() {
  const designFile = path.join(__dirname, 'design-references/index.html');
  const content = fs.readFileSync(designFile, 'utf8');
  
  const regex = /https:\/\/storage\.googleapis\.com\/[^"'\s]+/g;
  const urls = content.match(regex) || [];
  
  return [...new Set(urls)]; // Remove duplicates
}

// Extract all image paths from content files
function extractAllImagePaths() {
  const searchDirs = [
    path.join(__dirname, 'langu-remontas/content/collections'),
    path.join(__dirname, 'langu-remontas/content/pages'),
    path.join(__dirname, 'langu-remontas/content/shared')
  ];
  
  const allImagePaths = new Set();
  
  function scanDirectory(dir) {
    if (!fs.existsSync(dir)) return;
    
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (item.endsWith('.json')) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          
          // Find all image paths (various patterns)
          const patterns = [
            /\/images\/[^"'\s]+/g,
            /"image":\s*"([^"]+)"/g,
            /"featuredImage":\s*"([^"]+)"/g,
            /"ogImage":\s*"([^"]+)"/g,
            /"logo":\s*"([^"]+)"/g,
            /"icon":\s*"([^"]+)"/g
          ];
          
          patterns.forEach(pattern => {
            const matches = content.match(pattern) || [];
            matches.forEach(match => {
              // Extract just the path part
              const pathMatch = match.match(/\/[^"'\s]+/);
              if (pathMatch && pathMatch[0].includes('/images/')) {
                allImagePaths.add(pathMatch[0]);
              }
            });
          });
          
        } catch (error) {
          console.error(`Error reading ${fullPath}:`, error.message);
        }
      }
    });
  }
  
  searchDirs.forEach(scanDirectory);
  return Array.from(allImagePaths).sort();
}

// Main execution
console.log('🔍 Extracting Google Storage URLs from design reference...\n');
const googleUrls = extractGoogleStorageUrls();
console.log(`Found ${googleUrls.length} unique Google Storage URLs:`);
googleUrls.forEach((url, index) => {
  console.log(`${index + 1}. ${url}`);
});

console.log('\n🔍 Extracting all image paths from content files...\n');
const imagePaths = extractAllImagePaths();
console.log(`Found ${imagePaths.length} unique image paths:`);
imagePaths.forEach((path, index) => {
  console.log(`${index + 1}. ${path}`);
});

// Create comprehensive mapping
console.log('\n🔗 Creating comprehensive image mapping...\n');
const mappings = [];

imagePaths.forEach((imagePath, index) => {
  // Use modulo to cycle through available Google URLs
  const googleUrl = googleUrls[index % googleUrls.length];
  mappings.push({
    old: imagePath,
    new: googleUrl
  });
  console.log(`${imagePath} → ${googleUrl}`);
});

// Save comprehensive mapping
const comprehensiveMapping = {
  mappings: mappings,
  googleStorageUrls: googleUrls,
  totalMappings: mappings.length,
  description: "Comprehensive mapping of all image paths to Google Storage URLs",
  created: new Date().toISOString()
};

const outputFile = path.join(__dirname, 'comprehensive-url-mapping.json');
fs.writeFileSync(outputFile, JSON.stringify(comprehensiveMapping, null, 2), 'utf8');

console.log(`\n💾 Comprehensive mapping saved to: ${outputFile}`);
console.log(`📊 Total mappings created: ${mappings.length}`);
