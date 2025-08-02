import React from 'react';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "DevOps Engineer",
      company: "TechStart Inc.",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      content: "UptimeGuard has been a game-changer for our team. We've reduced our incident response time by 75% and haven't had any unnoticed downtime since we started using it.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "CTO",
      company: "Digital Solutions Co.",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      content: "The global monitoring and instant alerts have saved us countless hours. Our customers love the transparency provided by the status pages.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Site Reliability Engineer",
      company: "CloudTech Corp",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      content: "Simple to set up, powerful features, and excellent support. UptimeGuard gives us the peace of mind we need to focus on building great products.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by developers worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of businesses that rely on UptimeGuard to keep their websites running smoothly.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-6">
                <Quote className="w-8 h-8 text-blue-500 mb-4" />
                <p className="text-gray-700 leading-relaxed">{testimonial.content}</p>
              </div>

              <div className="flex items-center space-x-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <Image 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-gray-600">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 text-gray-600">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="font-semibold">4.9/5</span>
            <span>based on 1,200+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;