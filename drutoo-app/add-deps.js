const { exec } = require('child_process');

const deps = [
  '@reduxjs/toolkit',
  'react-redux',
  '@react-navigation/native',
  '@react-navigation/stack',
  'react-hook-form',
  'axios',
  '@react-native-async-storage/async-storage',
  'jwt-decode'
];

console.log('Installing dependencies...');

deps.forEach(dep => {
  exec(`yarn add ${dep}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error installing ${dep}:`, error);
      return;
    }
    console.log(`Successfully installed ${dep}`);
  });
});