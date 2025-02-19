import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://carmen-platform.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://carmen-platform.com/admin/dashboard',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://carmen-platform.com/admin/clusters',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    // Cluster-scoped routes
    {
      url: 'https://carmen-platform.com/admin/clusters/[clusterId]',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: 'https://carmen-platform.com/admin/clusters/[clusterId]/business-units',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: 'https://carmen-platform.com/admin/clusters/[clusterId]/business-units/add',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: 'https://carmen-platform.com/admin/users',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: 'https://carmen-platform.com/admin/reports',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: 'https://carmen-platform.com/admin/support',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: 'https://carmen-platform.com/admin/settings',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]
} 