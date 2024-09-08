import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Layers, Smartphone, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <main>
        <section className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl font-extrabold mb-6 animate-fade-in-up">
            The Future of Task Management is Here
          </h1>
          <p className="text-xl mb-8 text-gray-400 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Streamline your productivity with our AI-powered, intuitive to-do
            app designed for the modern world.
          </p>
          <div className="flex justify-center space-x-4 animate-fade-in-up animation-delay-400">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
              Get Started
            </Button>
            <Button
              variant="outline"
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-gray-900"
            >
              Learn More
            </Button>
          </div>
        </section>

        <section id="features" className="container mx-auto px-4 py-24">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Cutting-Edge Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: CheckCircle,
                title: "Smart Task Prioritization",
                description: "AI-driven task sorting for optimal productivity",
              },
              {
                icon: Zap,
                title: "Lightning-Fast Sync",
                description:
                  "Real-time synchronization across all your devices",
              },
              {
                icon: Layers,
                title: "Advanced Categorization",
                description:
                  "Effortlessly organize tasks with intelligent tagging",
              },
              {
                icon: Smartphone,
                title: "Seamless Mobile Experience",
                description:
                  "Fully-featured mobile app for on-the-go task management",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-purple-500/20 transition-shadow animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <feature.icon className="w-12 h-12 mb-4 text-purple-400" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-24 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Revolutionize Your Productivity?
          </h2>
          <p className="text-xl mb-8 text-gray-400 max-w-2xl mx-auto">
            Join thousands of users who have transformed their task management.
            Try our Todo App today!
          </p>
          <form className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white w-full sm:w-auto">
              Get Early Access
            </Button>
          </form>
        </section>
      </main>

      <footer className="container mx-auto px-4 py-8 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Todo App. All rights reserved.</p>
      </footer>
    </div>
  );
}
