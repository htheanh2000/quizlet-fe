import React from 'react';

const Blog = () => {
  return (
    <>
        <section className="pt-20 pb-10 lg:pt-[120px] lg:pb-20">
          <div className="container mx-auto">
            <div className="-mx-4 flex flex-wrap justify-center">
              <div className="w-full px-4">
                <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
                  <span className="mb-2 block text-lg font-semibold text-primary">
                    Our Blogs
                  </span>
                  <h2 className="mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[40px]">
                    Our Recent News
                  </h2>
                  <p className="text-base text-body-color">
                    There are many variations of passages of Lorem Ipsum available
                    but the majority have suffered alteration in some form.
                  </p>
                </div>
              </div>
            </div>

            <div className="-mx-4 flex flex-wrap">
              <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                <div className="mx-auto mb-10 max-w-[370px]">
                  <div className="mb-8 overflow-hidden rounded">
                    <img
                      src="/images/blogs/blog-01/image-01.jpg"
                      alt="image"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <span className="mb-5 inline-block rounded bg-primary py-1 px-4 text-center text-xs font-semibold leading-loose text-white">
                      Dec 22, 2023
                    </span>
                    <h3>
                      <a
                        href="/"
                        className="mb-4 inline-block text-xl font-semibold text-dark hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl"
                      >
                        Meet AutoManage, the best AI management tools
                      </a>
                    </h3>
                    <p className="text-base text-body-color">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                  </div>
                </div>
              </div>
              {/* Repeat the above HTML structure for the other blog entries */}
              <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                <div className="mx-auto mb-10 max-w-[370px]">
                  <div className="mb-8 overflow-hidden rounded">
                    <img
                      src="/images/blogs/blog-01/image-02.jpg"
                      alt="image"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <span className="mb-5 inline-block rounded bg-primary py-1 px-4 text-center text-xs font-semibold leading-loose text-white">
                      Dec 22, 2023
                    </span>
                    <h3>
                      <a
                        href="/"
                        className="mb-4 inline-block text-xl font-semibold text-dark hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl"
                      >
                        Meet AutoManage, the best AI management tools
                      </a>
                    </h3>
                    <p className="text-base text-body-color">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                <div className="mx-auto mb-10 max-w-[370px]">
                  <div className="mb-8 overflow-hidden rounded">
                    <img
                      src="/images/blogs/blog-01/image-03.jpg"
                      alt="image"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <span className="mb-5 inline-block rounded bg-primary py-1 px-4 text-center text-xs font-semibold leading-loose text-white">
                      Dec 22, 2023
                    </span>
                    <h3>
                      <a
                        href="/"
                        className="mb-4 inline-block text-xl font-semibold text-dark hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl"
                      >
                        Meet AutoManage, the best AI management tools
                      </a>
                    </h3>
                    <p className="text-base text-body-color">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  );
};

export default Blog;