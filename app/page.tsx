"user client"

import { HeroSection } from "@/components/landing-page"
import Blog from "@/components/blog"
import AboutPage from "@/components/about"
import Footer from "@/components/footer"

export default async function IndexPage() {
  return (
    <div>
      <HeroSection/>
      <Blog/>
      <AboutPage/>
      <Footer/>
    </div>
  )
}
