const path = require('path')
const withOptimizedImages = require('next-optimized-images');

module.exports = withOptimizedImages({
  handleImages: ['jpeg', 'png', 'svg'],
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['firebasestorage.googleapis.com']
  }
})
