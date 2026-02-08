
import { MessageSquare, Brain, Trophy } from 'lucide-react';

const steps = [
    {
        icon: MessageSquare,
        title: 'Ask a Question',
        description: 'Chat with our AI assistant about any topic you want to learn',
        color: 'from-blue-500 to-blue-600',
        bgColor: 'bg-blue-50',
    },
    {
        icon: Brain,
        title: 'Prove Understanding',
        description: 'Take a quick quiz to show you truly comprehend the answer',
        color: 'from-purple-500 to-purple-600',
        bgColor: 'bg-purple-50',
    },
    {
        icon: Trophy,
        title: 'Earn Rewards',
        description: 'Unlock the answer, earn points, and climb the leaderboard',
        color: 'from-yellow-500 to-yellow-600',
        bgColor: 'bg-yellow-50',
    },
];

export function HowItWorks() {
    return (
        <section className="py-20 bg-white">
            <div className="container-app">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                        How It Works
                    </h2>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                        Transform your learning in three simple steps
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={step.title}
                            className="relative group"
                        >
                            {/* Connector line */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gray-200" />
                            )}

                            <div className="relative bg-white rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                                {/* Step number */}
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold flex items-center justify-center text-sm shadow-lg">
                                    {index + 1}
                                </div>

                                {/* Icon */}
                                <div className={`w-20 h-20 mx-auto rounded-2xl ${step.bgColor} flex items-center justify-center mb-6 mt-4`}>
                                    <step.icon size={36} className={`bg-gradient-to-r ${step.color} bg-clip-text text-transparent`} style={{ color: step.color.includes('blue') ? '#3b82f6' : step.color.includes('purple') ? '#8b5cf6' : '#eab308' }} />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-text-primary mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-text-secondary">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
