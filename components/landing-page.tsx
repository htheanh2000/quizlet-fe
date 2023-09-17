"use client"
import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <div className="relative bg-white pt-[120px] lg:pt-[150px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-5/12">
            <div className="hero-content">
              <h1 className="text-dark mb-3 text-4xl font-bold leading-snug sm:text-[42px] lg:text-[40px] xl:text-[42px]">
                Kickstart <br />
                Startup Website <br />
                with TailGrids
              </h1>
              <p className="text-body-color mb-8 max-w-[480px] text-base">
                With TailGrids, business and students thrive together. Business
                can perfectly match their staffing to changing demand throughout
                the dayed.
              </p>
              <ul className="flex flex-wrap items-center">
                <Link href="/login">
                  <p className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-4 text-center text-base font-normal text-white hover:bg-opacity-90 sm:px-10 lg:px-8 xl:px-10">
                    Get Started
                  </p>
                </Link>
              </ul>
              <div className="clients pt-16">
                <h6 className="text-body-color mb-2 flex items-center text-xs font-normal">
                  Some Of Our Clients
                  <span className="bg-body-color ml-2 inline-block h-[1px] w-8"></span>
                </h6>
                <div className="flex items-center">
                  <div className="mr-4 w-full py-3">
                    <Image
                      width={0}
                      height={0}
                      className="w-full"
                      src="images/brands/ayroui.svg"
                      alt="ayroui"
                    />
                  </div>
                  <div className="mr-4 w-full py-3">
                    <Image
                      width={0}
                      height={0}
                      className="w-full"
                      src="images/brands/graygrids.svg"
                      alt="graygrids"
                    />
                  </div>
                  <div className="mr-4 w-full py-3">
                    <Image
                      width={0}
                      height={0}
                      className="w-full"
                      src="images/brands/uideck.svg"
                      alt="uideck"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden px-4 lg:block lg:w-1/12"></div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="lg:ml-auto lg:text-right">
              <div className="relative z-10 inline-block pt-11 lg:pt-0">
                <Image
                  width={0}
                  height={0}
                  sizes='100%'
                  src="/images/hero/hero-image-01.png"
                  className="w-full max-w-full lg:ml-auto"
                  alt="hero"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
