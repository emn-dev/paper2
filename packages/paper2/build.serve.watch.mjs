import { watch, readFileSync, writeFileSync } from 'node:fs';

const coreBaseName = 'paper2-core-pre';
const fullBaseName = 'paper2-full-pre';

function modifyFileContents(type = 'all') {
  if (type === 'core' || type === 'all') {
    const rawFile = readFileSync(`./dist/${coreBaseName}.esm.js`, {
      encoding: 'utf-8',
    });
    const fixedFile = rawFile.replaceAll('4444', '');
    writeFileSync(`./dist/${coreBaseName.replace('-pre', '')}.esm.js`, fixedFile);
  }
  if (type === 'full' || type === 'all') {
    const rawFile = readFileSync(`./dist/${fullBaseName}.esm.js`, {
      encoding: 'utf-8',
    });
    const fixedFile = rawFile.replaceAll('4444', '');
    writeFileSync(`./dist/${fullBaseName.replace('-pre', '')}.esm.js`, fixedFile);
  }
}

modifyFileContents('all');

watch(`./dist/${coreBaseName}.esm.js`, eventType => {
  if (eventType === 'change') {
    console.log('REBUILD-modifyFileContents');
    modifyFileContents('core');
  }
});

watch(`./dist/${fullBaseName}.esm.js`, eventType => {
  if (eventType === 'change') {
    console.log('REBUILD-modifyFileContents');
    modifyFileContents('full');
  }
});
