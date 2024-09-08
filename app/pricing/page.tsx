import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

export default async function PricingPage() {
  const { userId } = auth();

  const plans = [
    {
      name: "Monthly",
      price: "$10",
      period: "per month",
      features: [
        "Unlimited Tasks",
        "Smart Prioritization",
        "Real-time Sync",
        "Mobile App Access",
        "Basic Reporting",
      ],
      cta: "Start Monthly Plan",
      buttonLink: process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_MONTHLY || "#",
    },
    {
      name: "Yearly",
      price: "$100",
      period: "per year",
      features: [
        "Unlimited Tasks",
        "Smart Prioritization",
        "Real-time Sync",
        "Mobile App Access",
        "Advanced Reporting",
        "Team Collaboration",
        "Priority Support",
      ],
      cta: "Start Yearly Plan",
      buttonLink: process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_YEARLY || "#",
      highlight: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <main className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-extrabold mb-8 text-center animate-fade-in-up">
          Choose Your Productivity Plan
        </h1>
        <p className="text-xl mb-12 text-gray-400 max-w-2xl mx-auto text-center animate-fade-in-up animation-delay-200">
          Unlock the full potential of FutureTasks with our flexible pricing
          options.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.name}
              {...plan}
              userId={userId}
              index={index}
            />
          ))}
        </div>

        <ComparisonTable />
      </main>
    </div>
  );
}

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  buttonLink: string;
  highlight?: boolean;
  userId: string | null;
  index: number;
}

function PricingCard({
  name,
  price,
  period,
  features,
  cta,
  buttonLink,
  highlight,
  userId,
  index,
}: PricingCardProps) {
  const finalButtonLink = userId
    ? `${buttonLink}?client_reference_id=${userId}`
    : "/signup";

  return (
    <div
      className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-purple-500/20 hover:scale-105 animate-fade-in-up ${
        highlight ? "border-2 border-purple-500" : ""
      }`}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      {highlight && (
        <div className="bg-purple-500 text-white text-center py-2 font-semibold">
          Best Value
        </div>
      )}
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">{name}</h2>
        <div className="mb-6">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-gray-400"> {period}</span>
        </div>
        <ul className="space-y-3 mb-8">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
              {feature}
            </li>
          ))}
        </ul>
        <Button
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          asChild
        >
          <Link href={finalButtonLink}>{userId ? cta : "Join Now"}</Link>
        </Button>
      </div>
    </div>
  );
}

function ComparisonTable() {
  return (
    <div className="mt-24">
      <h2 className="text-3xl font-bold mb-8 text-center">Compare Plans</h2>
      <div className="overflow-x-auto">
        <table className="w-full max-w-4xl mx-auto">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-4 px-6 text-left">Feature</th>
              <th className="py-4 px-6 text-center">Monthly</th>
              <th className="py-4 px-6 text-center">Yearly</th>
            </tr>
          </thead>
          <tbody>
            {[
              "Unlimited Tasks",
              "Smart Prioritization",
              "Real-time Sync",
              "Mobile App Access",
              "Advanced Reporting",
              "Team Collaboration",
              "Priority Support",
            ].map((feature, index) => (
              <tr key={index} className="border-b border-gray-700">
                <td className="py-4 px-6">{feature}</td>
                <td className="py-4 px-6 text-center">
                  {index < 4 ? (
                    <CheckCircle className="w-5 h-5 mx-auto text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 mx-auto text-red-500" />
                  )}
                </td>
                <td className="py-4 px-6 text-center">
                  <CheckCircle className="w-5 h-5 mx-auto text-green-500" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
