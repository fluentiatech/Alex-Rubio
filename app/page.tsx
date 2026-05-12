import Navbar     from '@/components/Navbar'
import Hero       from '@/components/Hero'
import Perfil     from '@/components/Perfil'
import Timeline   from '@/components/Timeline'
import Stats      from '@/components/Stats'
import Highlights from '@/components/Highlights'
import Footer     from '@/components/Footer'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Perfil />
        <Timeline />
        <Stats />
        <Highlights />
      </main>
      <Footer />
    </>
  )
}
