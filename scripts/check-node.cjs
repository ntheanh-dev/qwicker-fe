const [major, minor] = process.versions.node.split('.').map(Number);
const supported = (major === 22 && minor >= 13)
  || (major === 24 && minor >= 3)
  || major === 26 || major >= 27;
if (!supported) {
  console.error(`Node ${process.versions.node} is unsupported by Expo SDK 58. Run "nvm use" in this directory to select Node 24 LTS.`);
  process.exit(1);
}
