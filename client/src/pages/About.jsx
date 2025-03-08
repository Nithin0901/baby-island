import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const About = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000, // Adjust speed for smooth transition
    autoplay: true,
    autoplaySpeed: 3000, // Change slide every 3 seconds
    slidesToShow: 3, // Show 3 slides at a time
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Why Baby Island Section */}
      <section className="text-center mb-12">
        <h2 className="text-xl font-bold relative mb-4 after:content-[''] after:block after:rounded-lg after:w-24 after:h-1 after:bg-gray-500 after:mt-1 after:mx-auto">Why Baby Island</h2>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb5uo8iw1fI0a-F8jeiM74f-Y4SalUCxYzCg&s"
            alt="Baby"
            className="w-full md:w-64 h-64 rounded-lg object-cover"
          />
          <p className="text-gray-600 text-lg text-left">
            We offer a wide selection of high-quality, safe products at
            affordable prices. Our user-friendly website provides personalized
            recommendations, fast shipping, and expert parenting resources. We
            prioritize sustainability and customer satisfaction, offering
            hassle-free returns and exclusive discounts. With us, shopping for
            your baby is easy, reliable, and stress-free.
          </p>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="text-center mb-12">
      <h2 className="text-xl font-bold relative mb-4 after:content-[''] after:block after:rounded-lg after:w-16 after:h-1 after:bg-gray-500 after:mt-1 after:mx-auto">Testimonial</h2>
      <Slider {...settings} className="px-4">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="px-2">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md text-left h-[250px] flex flex-col justify-between">
              <div>
                <h3 className="font-semibold mb-2">{testimonial.title}</h3>
                <p className="text-gray-600 mb-4">{testimonial.review}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-yellow-500">★★★★★</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>

      {/* About Us Section */}
      <section className="text-center">
        <h2 className="text-xl font-bold relative mb-4 after:content-[''] after:block after:rounded-lg after:w-16 after:h-1 after:bg-gray-500 after:mt-1 after:mx-auto">About Us</h2>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb5uo8iw1fI0a-F8jeiM74f-Y4SalUCxYzCg&s"
            alt="About Us"
            className="w-full md:w-64 h-64 rounded-lg object-cover"
          />
          <p className="text-gray-600 text-lg text-left">
            At [Baby Island], we are dedicated to providing the best products
            for your little one. Our carefully curated selection of baby
            essentials includes everything from clothing and toys to nursery
            items, all sourced from trusted, high-quality brands. We prioritize
            safety, comfort, and sustainability, ensuring peace of mind for
            every parent. With a user-friendly shopping experience, fast
            shipping, and excellent customer service, we're here to support you
            on your parenting journey.
          </p>
        </div>
      </section>
    </div>
  );
};

const testimonials = [
  {
    title: "Good Quality",
    review:
      "Great quality products! Everything I’ve purchased has been safe, durable, and perfect for my baby and safe for my baby.",
    name: "Reshma",
  },
  {
    title: "Safest product",
    review:
      "Absolutely love the safety of these products! I feel confident knowing everything is high-quality and safe for my baby.",
    name: "Hema",
  },
  {
    title: "Good Product",
    review:
      "Fantastic quality and fast delivery! This site has it all for any baby’s needs. ",
    name: "Karthick",
  },
];

export default About;