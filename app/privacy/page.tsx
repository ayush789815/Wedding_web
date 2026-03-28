import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileMenu from '@/components/layout/MobileMenu'
import PageHero from '@/components/sections/PageHero'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | YK PRODUCE Inc.',
}

const sections = [
  {
    title: '個人情報の収集について',
    body: '当社は、お客様のお名前、メールアドレス、電話番号等の個人情報を、お問い合わせへの対応、サービスの提供、およびご連絡のために収集します。',
  },
  {
    title: '個人情報の利用目的',
    body: '収集した個人情報は、お問い合わせへの回答、サービス提供、および法令に基づく場合を除き、第三者に提供することはありません。',
  },
  {
    title: '個人情報の管理',
    body: '当社は、個人情報の紛失、破壊、改ざん、漏洩等を防ぐため、適切な安全管理措置を講じます。',
  },
  {
    title: 'Cookieについて',
    body: '当サイトでは、Google Analyticsを使用しており、Cookieを通じてアクセス情報を収集しています。この情報は匿名で収集されており、個人を特定するものではありません。',
  },
  {
    title: '個人情報の開示・訂正・削除',
    body: 'お客様は、当社が保有するご自身の個人情報について、開示・訂正・削除を請求する権利を有します。ご希望の場合はお問い合わせフォームよりご連絡ください。',
  },
  {
    title: 'プライバシーポリシーの変更',
    body: '当社は、法令の改正や事業内容の変更に伴い、このプライバシーポリシーを予告なく変更することがあります。変更後のプライバシーポリシーは、当サイトに掲載した時点から効力を生じるものとします。',
  },
]

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <MobileMenu />
      <main>
        <PageHero
          eyebrow="Legal"
          titleEn="Privacy"
          titleJa="プライバシーポリシー"
          breadcrumb={[{ label: 'Privacy Policy', href: '/privacy' }]}
        />
        <section className="bg-[#080808] py-24 px-8 md:px-16">
          <div className="max-w-2xl mx-auto space-y-14">
            <div className="text-white/40 text-sm leading-relaxed border-b border-white/5 pb-12">
              <p>株式会社ワイケープロデュース（以下「当社」）は、お客様の個人情報の保護を重要な責務と考え、以下のプライバシーポリシーを定めます。</p>
              <p className="mt-4 font-poppins text-xs text-white/20">最終更新日：2026年1月1日</p>
            </div>
            {sections.map((s, i) => (
              <div key={i}>
                <h2 className="font-poppins font-light text-white text-lg mb-4 flex items-center gap-4">
                  <span className="font-poppins text-xs text-white/20">{String(i + 1).padStart(2, '0')}</span>
                  {s.title}
                </h2>
                <p className="text-white/40 text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
            <div className="pt-8 border-t border-white/5">
              <p className="font-poppins text-xs text-white/20 tracking-widest">
                株式会社ワイケープロデュース<br />
                東京都港区南青山<br />
                TEL: 03-5413-6538
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
