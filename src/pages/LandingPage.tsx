import { Hero } from '../components/landing/Hero';
import { HowItWorks } from '../components/landing/HowItWorks';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui';
import { ArrowRight } from 'lucide-react';

export function LandingPage() {
    return (
        <div className="min-h-screen">
            <Hero />
            <HowItWorks />

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-primary-500 to-secondary-500">
                <div className="container-app text-center">
                    <div className="max-w-2xl mx-auto">
                        <div className="mb-6 flex justify-center">
                            <img src="/logo.png" alt="VeritasLearn Logo" className="w-16 h-16 object-contain brightness-0 invert" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to Transform Your Learning?
                        </h2>
                        <p className="text-lg text-white/80 mb-8">
                            Join thousands of students who are building real understanding instead of just copying AI answers.
                        </p>
                        <Link to="/learn">
                            <Button
                                size="lg"
                                className="bg-white text-primary-600 hover:bg-gray-100 group"
                            >
                                Start Learning Now
                                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 bg-gray-900 text-gray-400">
                <div className="container-app text-center">
                    <p className="text-sm">
                        © 2024 VeritasLearn. Built for the future of education.
                    </p>
                </div>
            </footer>
        </div>
    );
}
