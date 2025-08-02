import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      step: "1",
      title: "Add Your Website",
      description: "Simply enter your website URL and we'll start monitoring it immediately.",
      image: "🌐"
    },
    {
      step: "2", 
      title: "Configure Alerts",
      description: "Set up notifications via email, SMS, Slack, or webhooks to stay informed.",
      image: "🔔"
    },
    {
      step: "3",
      title: "Monitor & Analyze",
      description: "View real-time data, performance metrics, and uptime statistics on your dashboard.",
      image: "📊"
    },
    {
      step: "4",
      title: "Respond Quickly",
      description: "Get instant alerts when issues occur and resolve them before they impact users.",
      image: "⚡"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How UptimeGuard Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started in minutes with our simple setup process. No technical expertise required.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto mb-4 group-hover:shadow-xl transition-shadow duration-300">
                  <span className="text-2xl">{step.image}</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-600 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {step.step}
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-6 -right-12 w-6 h-6 text-gray-400" />
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to get started?
              </h3>
              <p className="text-gray-600 mb-6">
                Join thousands of businesses that trust UptimeGuard to monitor their websites 
                and keep their customers happy.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">14-day free trial</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">No credit card required</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Cancel anytime</span>
                </div>
              </div>
            </div>
            <div className="text-center md:text-right">
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;