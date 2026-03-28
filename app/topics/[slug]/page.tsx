import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileMenu from '@/components/layout/MobileMenu'
import TopicDetail from '@/components/sections/topics/TopicDetail'
import { getTopicBySlug, getRelatedTopics, topics } from '@/lib/topics'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return topics.map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const topic = getTopicBySlug(params.slug)
  if (!topic) return { title: 'Not Found' }
  return {
    title: `${topic.title} | Topics | YK PRODUCE Inc.`,
    description: topic.excerpt,
  }
}

export default function TopicPage({ params }: Props) {
  const topic = getTopicBySlug(params.slug)
  if (!topic) notFound()

  const related = getRelatedTopics(params.slug, 3)

  return (
    <>
      <Header />
      <MobileMenu />
      <main>
        <TopicDetail topic={topic} related={related} />
      </main>
      <Footer />
    </>
  )
}
