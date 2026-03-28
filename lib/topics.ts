export interface Topic {
  slug: string
  title: string
  date: string
  dateFormatted: string
  tag: 'Media' | 'News' | 'Works'
  category: string
  image: string
  excerpt: string
  body: string
}

export const topics: Topic[] = [
  {
    slug: '20260326',
    title: "ABEMATest via Test",
    date: '2026-03-26',
    dateFormatted: '2026.03.26',
    tag: 'Media',
    category: 'Test',
    image: '/images/topics-01.jpg',
    excerpt: 'ABEMATest via Test',
    body: `ABEMATest via Test

Test

Test

Test`,
  },
  {
    slug: '20260227',
    title: 'TestAsiaWPA 2025Test',
    date: '2026-02-27',
    dateFormatted: '2026.02.27',
    tag: 'News',
    category: 'Test',
    image: '/images/topics-02.jpg',
    excerpt: 'TestAsiaWPATest2025Test',
    body: `TestAsiaWPATest2025Test

Test

Test
TestBest Wedding Documentary
TestBest Couple Portrait
TestBest Emotional Moment

Test`,
  },
  {
    slug: '20260101',
    title: 'HAPPY NEW YEAR 2026',
    date: '2026-01-01',
    dateFormatted: '2026.01.01',
    tag: 'News',
    category: '',
    image: '/images/topics-03.jpg',
    excerpt: 'TestYK PRODUCETest',
    body: `Test

Test
Test

2026Test

Test

YK PRODUCE Inc. Test`,
  },
  {
    slug: '20251201',
    title: 'Test — Test BTest',
    date: '2025-12-01',
    dateFormatted: '2025.12.01',
    tag: 'News',
    category: 'Test',
    image: '/images/topics-01.jpg',
    excerpt: '2025Test12TestBTest',
    body: `2025Test12TestBTest

Test

Test
Test150㎡
Test4.5m
Test
Test
Test × 3Test

TestContactTest`,
  },
  {
    slug: '20251001',
    title: 'Test 2025 Test',
    date: '2025-10-01',
    dateFormatted: '2025.10.01',
    tag: 'Works',
    category: 'Test',
    image: '/images/topics-02.jpg',
    excerpt: '2025Test',
    body: `2025Test

Test

Test
Test Test
Test Test
Test Test
Test Test

TestVimeoTest`,
  },
  {
    slug: '20250801',
    title: 'AsiaWPA Test Test',
    date: '2025-08-01',
    dateFormatted: '2025.08.01',
    tag: 'News',
    category: 'Test',
    image: '/images/topics-03.jpg',
    excerpt: 'AsiaWPATestAsia Wedding Photographers AssociationTest8Test',
    body: `AsiaWPATestAsia Wedding Photographers AssociationTest8Test

Test

Test

Test`,
  },
]

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find(t => t.slug === slug)
}

export function getRelatedTopics(slug: string, count = 3): Topic[] {
  return topics.filter(t => t.slug !== slug).slice(0, count)
}
