import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const products = [
    { id: 1, name: "Pure Nature Essentials", price: 49.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80", category: "Natural wellness products" },
    { id: 2, name: "Verdant Life Goods", price: 39.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80", category: "Eco-friendly lifestyle" },
    { id: 3, name: "Active Flex Path", price: 89.99, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80", category: "Sports & fitness gear" },
    { id: 4, name: "Modern Pathway", price: 129.99, image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&q=80", category: "Contemporary fashion" },
    { id: 5, name: "Active Nature Gear", price: 159.99, image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&q=80", category: "Outdoor adventure" },
    { id: 6, name: "Elite Walker", price: 199.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80", category: "Premium footwear" },
    { id: 7, name: "Pure Motion", price: 79.99, image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80", category: "Athletic performance" },
    { id: 8, name: "Street Spirit", price: 69.99, image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80", category: "Urban style collection" },
  ];

  const categories = [
    { id: 1, name: "VerdantWay", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80" },
    { id: 2, name: "GreenHarvest", image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80" },
    { id: 3, name: "Verde Plant", image: "https://images.unsplash.com/photo-1463320898484-cdee8141c787?w=600&q=80" },
    { id: 4, name: "Herbal Craft", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
  ];

  const testimonials = [
    { id: 1, name: "Phoebe Buffay", location: "Korea", text: "Fast shipping and excellent customer service. The product was even better than expected. I will definitely be a returning customer.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" },
    { id: 2, name: "Monica Geller", location: "USA", text: "Great user experience on your website. I found exactly what I was looking for at a great price. I will definitely be telling my friends.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" },
    { id: 3, name: "Robert Green", location: "UK", text: "Thank you for the excellent shopping experience. It arrived quickly and was exactly as described. I will definitely be shopping with you again in the future.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" },
  ];

  const news = [
    { id: 1, title: "New Sneaker Store Opens Downtown", date: "Mar 16, 2025", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80", excerpt: "We're excited to announce the opening of our new downtown location featuring the latest sneaker collections." },
    { id: 2, title: "The Future of E-commerce and Retail Technology", date: "Mar 17, 2025", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80", excerpt: "Discover how AI and automation are revolutionizing the online shopping experience." },
    { id: 3, title: "Improve Your Customer Experience", date: "Mar 20, 2025", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80", excerpt: "Learn proven strategies to enhance customer satisfaction and build lasting relationships." },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-dark text-white py-2 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href="mailto:blue2025@gmail.com" className="flex items-center gap-1 hover:text-primary transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              blue2025@gmail.com
            </a>
            <a href="tel:+86-13588889588" className="flex items-center gap-1 hover:text-primary transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              +86-13588889588
            </a>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 bg-white/95 backdrop-blur-md shadow-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16 lg:h-20">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-heading font-bold text-xl">B</span>
              </div>
              <span className="font-heading font-bold text-xl text-dark">BlueTech</span>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              <Link href="/" className="font-medium text-primary hover:text-primary-dark transition-colors">Home</Link>
              <Link href="#products" className="font-medium text-slate-600 hover:text-primary transition-colors">Product</Link>
              <Link href="#categories" className="font-medium text-slate-600 hover:text-primary transition-colors">Categories</Link>
              <Link href="#about" className="font-medium text-slate-600 hover:text-primary transition-colors">About Us</Link>
              <Link href="#news" className="font-medium text-slate-600 hover:text-primary transition-colors">News</Link>
              <Link href="#contact" className="font-medium text-slate-600 hover:text-primary transition-colors">Contact Us</Link>
            </div>

            <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[500px] lg:h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-dark/80 to-transparent z-10"></div>
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-2xl">
              <h1 className="font-heading text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Discover Premium Products
              </h1>
              <p className="text-lg lg:text-xl text-gray-200 mb-8">
                Explore our international e-commerce platform for high-quality products at competitive prices. Shop wholesale & retail.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#products" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl cursor-pointer">
                  Shop Now
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                <Link href="#about" className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold transition-all border border-white/30 cursor-pointer">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-16 lg:py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-dark mb-4">Featured Products</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">We have a wide range of products and complete coverage of industry applications.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group cursor-pointer">
                <div className="aspect-square overflow-hidden relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                  <p className="text-sm text-slate-500 mb-3">{product.category}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-bold text-lg">${product.price}</span>
                    <button className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white transition-all flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section id="categories" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-dark mb-4">Product Categories</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Explore various categories with curated content designed just for you.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div key={category.id} className="group cursor-pointer">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-4 relative">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-heading text-xl font-semibold text-center group-hover:text-primary transition-colors">{category.name}</h3>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="#products" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl cursor-pointer">
              View All Products
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-16 lg:py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-dark mb-4">About Us</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Learn about our mission, values, and dedicated team.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80"
                alt="Blueheart Technology"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h3 className="font-heading text-2xl font-bold text-dark mb-6">Blueheart Technology</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Founded in 2018, Blueheart Technology is a leading e-commerce platform dedicated to delivering a seamless and enjoyable shopping experience to customers worldwide. Our mission is to connect people with the products they love, offering a curated selection of top-quality items across a variety of categories.
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                With a focus on innovation, reliability, and customer satisfaction, we have rapidly grown our user base and built strong relationships with trusted suppliers and brands. Our user-friendly website and mobile app are designed to make shopping fast, easy, and secure for everyone.
              </p>
              <Link href="#contact" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors cursor-pointer">
                View More
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            <div className="text-center">
              <div className="font-heading text-4xl lg:text-5xl font-bold text-primary mb-2">10,000+</div>
              <p className="text-slate-600 font-medium">Global Customers</p>
            </div>
            <div className="text-center">
              <div className="font-heading text-4xl lg:text-5xl font-bold text-primary mb-2">80+</div>
              <p className="text-slate-600 font-medium">Countries Served</p>
            </div>
            <div className="text-center">
              <div className="font-heading text-4xl lg:text-5xl font-bold text-primary mb-2">18+</div>
              <p className="text-slate-600 font-medium">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="font-heading text-4xl lg:text-5xl font-bold text-primary mb-2">75+</div>
              <p className="text-slate-600 font-medium">Products</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-dark mb-4">Our Customers Say</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Hear what our valued customers have to say about their experience with our products.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-light rounded-2xl p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-slate-600 mb-6 italic">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative">
                    <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-dark">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">From {testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company News */}
      <section id="news" className="py-16 lg:py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-dark mb-4">Company News</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Learn how to grow your business with our expert advice.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {news.map((item) => (
              <article key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group cursor-pointer">
                <div className="aspect-video overflow-hidden relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-primary font-medium mb-2">{item.date}</p>
                  <h3 className="font-heading text-xl font-semibold mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">Inventory is abundant</h3>
              <p className="text-slate-600">Wide selection of products in stock</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">Delivery is prompt</h3>
              <p className="text-slate-600">Fast and reliable shipping worldwide</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">Professional consultation</h3>
              <p className="text-slate-600">By 10-year industry experts</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">Credit is guaranteed</h3>
              <p className="text-slate-600">Diverse payment methods available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <h4 className="font-heading font-semibold text-lg mb-6">Navigation</h4>
              <ul className="space-y-3">
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link href="#products" className="text-gray-400 hover:text-white transition-colors">Product</Link></li>
                <li><Link href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="#news" className="text-gray-400 hover:text-white transition-colors">News</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-semibold text-lg mb-6">Product Categories</h4>
              <ul className="space-y-3">
                <li><Link href="#categories" className="text-gray-400 hover:text-white transition-colors">VerdantWay</Link></li>
                <li><Link href="#categories" className="text-gray-400 hover:text-white transition-colors">GreenHarvest</Link></li>
                <li><Link href="#categories" className="text-gray-400 hover:text-white transition-colors">Verde Plant</Link></li>
                <li><Link href="#categories" className="text-gray-400 hover:text-white transition-colors">Herbal Craft</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-semibold text-lg mb-6">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  blue2025@gmail.com
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  +86-13588889588
                </li>
                <li className="flex items-start gap-2 text-gray-400">
                  <svg className="w-5 h-5 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  No. 22 Beichen West Road, Shaoxing City, Zhejiang Province
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-semibold text-lg mb-6">Send Us a Message</h4>
              <form className="space-y-4">
                <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors" />
                <input type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors" />
                <textarea placeholder="Your Message" rows={3} className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors resize-none"></textarea>
                <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer">
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Blueheart Technology. All rights reserved.</p>
            <p className="mt-2 text-sm">Powered by FK</p>
          </div>
        </div>
      </footer>
    </>
  );
}
