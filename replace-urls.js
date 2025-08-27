#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Load URL mappings
const mappingFile = path.join(__dirname, 'url-mapping.json');
const mappings = JSON.parse(fs.readFileSync(mappingFile, 'utf8')).mappings;

// Directory to search
const searchDir = path.join(__dirname, 'langu-remontas/content/collections/news');

// Function to replace URLs in file content
function replaceUrlsInContent(content) {
  let updatedContent = content;
  let replacementCount = 0;
  
  mappings.forEach(mapping => {
    const regex = new RegExp(escapeRegExp(mapping.old), 'g');
    const matches = (updatedContent.match(regex) || []).length;
    if (matches > 0) {
      updatedContent = updatedContent.replace(regex, mapping.new);
      replacementCount += matches;
      console.log(`  ✓ Replaced ${matches} instances of: ${mapping.old}`);
    }
  });
  
  return { content: updatedContent, count: replacementCount };
}

// Escape special regex characters
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Process all JSON files in the news directory
function processFiles() {
  console.log('🔄 Starting URL replacement process...\n');
  
  if (!fs.existsSync(searchDir)) {
    console.error(`❌ Directory not found: ${searchDir}`);
    process.exit(1);
  }
  
  const files = fs.readdirSync(searchDir).filter(file => file.endsWith('.json'));
  let totalReplacements = 0;
  let processedFiles = 0;
  
  files.forEach(file => {
    const filePath = path.join(searchDir, file);
    console.log(`📄 Processing: ${file}`);
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const result = replaceUrlsInContent(content);
      
      if (result.count > 0) {
        fs.writeFileSync(filePath, result.content, 'utf8');
        console.log(`  ✅ Updated ${result.count} URLs in ${file}`);
        totalReplacements += result.count;
        processedFiles++;
      } else {
        console.log(`  ⏭️  No URLs to replace in ${file}`);
      }
    } catch (error) {
      console.error(`  ❌ Error processing ${file}:`, error.message);
    }
    
    console.log(''); // Empty line for readability
  });
  
  console.log('📊 Summary:');
  console.log(`   Files processed: ${processedFiles}/${files.length}`);
  console.log(`   Total replacements: ${totalReplacements}`);
  console.log('✅ URL replacement completed!');
}

// Run the script
processFiles();
