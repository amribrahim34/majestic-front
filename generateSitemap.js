import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'
import axios from 'axios'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const API_BASE_URL = 'http://localhost:8000/api' // Replace with your actual API base URL

async function generateSitemap() {
  try {
    const baseURL = 'https://majesticminds.net' // Replace with your actual production URL
    const distPath = path.join(__dirname, 'dist')
    const links = []

    // Add static pages
    const staticPages = ['/', '/about', '/contact', '/services', '/products']
    staticPages.forEach((page) => {
      links.push({
        url: page,
        changefreq: page === '/' ? 'daily' : 'weekly',
        priority: page === '/' ? 1.0 : 0.7
      })
    })

    // Fetch books
    try {
      const booksResponse = await axios.get(`${API_BASE_URL}/books`)
      const books = booksResponse.data.data
      books.forEach((book) => {
        links.push({ url: `/books/${book.id}`, changefreq: 'weekly', priority: 0.6 })
      })
    } catch (error) {
      console.error('Error fetching books:', error.message)
    }

    // Fetch blog posts
    try {
      const blogResponse = await axios.get(`${API_BASE_URL}/blog`)
      const blogPosts = blogResponse.data.data
      blogPosts.forEach((post) => {
        links.push({ url: `/blog/${post.slug}`, changefreq: 'weekly', priority: 0.6 })
      })
    } catch (error) {
      console.error('Error fetching blog posts:', error.message)
    }

    // Create a stream to write to
    const stream = new SitemapStream({ hostname: baseURL })

    // Add links to sitemap
    links.forEach((link) => {
      stream.write(link)
    })

    // End the stream
    stream.end()

    // Generate sitemap in XML format
    const sitemap = await streamToPromise(Readable.from(stream)).then((data) => data.toString())

    // Write sitemap to file
    const outputPath = path.join(distPath, 'sitemap.xml')
    fs.writeFileSync(outputPath, sitemap)

    console.log('Sitemap generated successfully!')
    console.log('Pages included in sitemap:')
    links.forEach((link) => console.log(link.url))
  } catch (error) {
    console.error('Error generating sitemap:', error)
  }
}

// Generate sitemap
generateSitemap()
