import React from 'react';
import { 
  Globe, 
  Bell, 
  BarChart3, 
  Shield, 
  Smartphone, 
  Zap,
  Clock,
  Users,
  AlertTriangle
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Globe,
      title: "Global Monitoring",
      description: "Monitor your websites from 15+ locations worldwide to ensure optimal performance for all users."
    },
    {
      icon: Bell,
      title: "Instant Alerts",
      description: "Get notified immediately via email, SMS, Slack, or webhooks when issues are detected."
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Detailed insights into response times, uptime trends, and performance metrics."
    },
    {
      icon: Shield,
      title: "SSL Monitoring",
      description: "Monitor SSL certificates and get alerts before they expire to prevent security issues."
    },
    {
      icon: Smartphone,
      title: "Mobile App",
      description: "Stay connected with our iOS and Android apps. Monitor and manage on the go."
    },
    {
      icon: Zap,
      title: "Fast Detection",
      description: "Issues detected in under 30 seconds with our high-frequency monitoring system."
    },
    {
      icon: Clock,
      title: "Status Pages",
      description: "Beautiful, customizable status pages to keep your customers informed during incidents."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Collaborate with your team using incident management and escalation policies."
    },
    {
      icon: AlertTriangle,
      title: "Incident Management",
      description: "Track, manage, and resolve incidents with our comprehensive incident response tools."
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to monitor your websites
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive monitoring tools to keep your websites running smoothly and your customers happy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-4">
                <div className="inline-flex p-3 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg group-hover:from-blue-200 group-hover:to-green-200 transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl">
            Start Monitoring Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;