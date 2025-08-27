#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Load comprehensive mappings
const mappingFile = path.join(__dirname, 'comprehensive-url-mapping.json');
const { mappings } = JSON.parse(fs.readFileSync(mappingFile, 'utf8'));

// Directories to search
const searchDirs = [
  path.join(__dirname, 'langu-remontas/content/collections'),
  path.join(__dirname, 'langu-remontas/content/pages'),
  path.join(__dirname, 'langu-remontas/content/shared')
];

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

// Process all JSON files recursively
function processDirectory(dir) {
  if (!fs.existsSync(dir)) return { files: 0, replacements: 0 };
  
  let totalFiles = 0;
  let totalReplacements = 0;
  
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      const result = processDirectory(fullPath);
      totalFiles += result.files;
      totalReplacements += result.replacements;
    } else if (item.endsWith('.json')) {
      console.log(`📄 Processing: ${path.relative(__dirname, fullPath)}`);
      
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        const result = replaceUrlsInContent(content);
        
        if (result.count > 0) {
          fs.writeFileSync(fullPath, result.content, 'utf8');
          console.log(`  ✅ Updated ${result.count} URLs`);
          totalReplacements += result.count;
          totalFiles++;
        } else {
          console.log(`  ⏭️  No URLs to replace`);
        }
      } catch (error) {
        console.error(`  ❌ Error processing file:`, error.message);
      }
      
      console.log(''); // Empty line for readability
    }
  });
  
  return { files: totalFiles, replacements: totalReplacements };
}

// Main execution
function processAllFiles() {
  console.log('🔄 Starting comprehensive image URL replacement...\n');
  console.log(`📊 Loaded ${mappings.length} URL mappings\n`);
  
  let grandTotalFiles = 0;
  let grandTotalReplacements = 0;
  
  searchDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      console.log(`📁 Processing directory: ${path.relative(__dirname, dir)}`);
      const result = processDirectory(dir);
      grandTotalFiles += result.files;
      grandTotalReplacements += result.replacements;
      console.log(`   Directory summary: ${result.files} files updated, ${result.replacements} replacements\n`);
    } else {
      console.log(`⚠️  Directory not found: ${dir}\n`);
    }
  });
  
  console.log('📊 Final Summary:');
  console.log(`   Files updated: ${grandTotalFiles}`);
  console.log(`   Total replacements: ${grandTotalReplacements}`);
  console.log('✅ Comprehensive image URL replacement completed!');
}

// Run the script
processAllFiles();
