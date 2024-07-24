import { useBlogStore } from '@/stores/blogStore'
import { useBookStore } from '@/stores/bookStore'

export function generateMetaTags(route: any) {
  const blogStore = useBlogStore()
  const bookStore = useBookStore()

  const metaTags: any[] = []

  switch (route.name) {
    case 'Home':
      metaTags.push(
        {
          name: 'description',
          content:
            'Welcome to majestic-minds bookstore - Your one-stop shop for all your reading needs.'
        },
        { property: 'og:title', content: 'majestic-minds bookstore' },
        {
          property: 'og:description',
          content:
            'Welcome to majestic-minds bookstore - Your one-stop shop for all your reading needs.'
        }
      )
      break
    case 'BookDetails':
      if (bookStore.currentBook) {
        const book = bookStore.currentBook
        metaTags.push(
          { name: 'description', content: book.description },
          { property: 'og:title', content: book.title },
          { property: 'og:description', content: book.description },
          { property: 'og:image', content: book.image }
        )
      }
      break
    case 'BlogPost':
      if (blogStore.getCurrentPost) {
        const post = blogStore.getCurrentPost
        metaTags.push(
          { name: 'description', content: post.title },
          { property: 'og:title', content: post.meta_title },
          { property: 'og:description', content: post.meta_description },
          { property: 'og:image', content: post.img }
        )
      }
      break
    // Add more cases for other routes as needed
  }

  // Add common meta tags
  metaTags.push(
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'majestic-minds bookstore' }
  )

  return metaTags
}
