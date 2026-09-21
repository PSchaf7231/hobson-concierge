const siteUrl = 'https://www.askhobson.homes'

export function articleSchema({ headline, description, path, datePublished }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    author: {
      '@type': 'Person',
      name: 'Paul Schafranick',
      telephone: '+1-561-255-7285',
      jobTitle: 'Real Estate Advisor',
      worksFor: { '@type': 'Organization', name: 'VantaSure Realty' }
    },
    publisher: { '@type': 'Organization', name: 'Ask Hobson' },
    mainEntityOfPage: `${siteUrl}${path}`,
    datePublished
  }
}

export default articleSchema
