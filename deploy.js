const ghpages = require('gh-pages');
const path = require('path');

ghpages.publish('.', {
  dotfiles: false,
  filter: (file) => {
    // Exclude node_modules and .claude directories
    return !file.includes('node_modules') &&
           !file.includes('.claude') &&
           !file.includes('.git');
  }
}, (err) => {
  if (err) {
    console.error('Deployment failed:', err);
    process.exit(1);
  } else {
    console.log('Deployment successful!');
  }
});
