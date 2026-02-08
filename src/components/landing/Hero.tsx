
import { Link } from 'react-router-dom';
import { Button } from '../ui';
import { ArrowRight, Brain, Shield, Award, Sparkles } from 'lucide-react';

export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50" />

            {/* Floating shapes */}
            <div className="absolute top-20 right-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

            <div className="container-app relative z-10 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left content */}
                    <div className="space-y-8">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm border border-gray-100">
                            <Sparkles size={16} className="text-yellow-500" />
                            <span className="text-sm font-medium text-text-secondary">
                                AI-Powered Learning Revolution
                            </span>
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-primary leading-tight">
                            Don't Just{' '}
                            <span className="gradient-text">Copy</span>
                            <br />
                            Learn to{' '}
                            <span className="gradient-text">Understand</span>
                        </h1>

                        {/* Subheading */}
                        <p className="text-lg text-text-secondary max-w-lg">
                            VeritasLearn ensures you truly comprehend AI-generated content before using it.
                            Prove your understanding, earn rewards, and become an independent learner.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <Link to="/learn">
                                <Button size="lg" className="group">
                                    Start Learning
                                    <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link to="/dashboard">
                                <Button variant="outline" size="lg">
                                    View Dashboard
                                </Button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-8 pt-4">
                            <div>
                                <p className="text-3xl font-bold gradient-text">85%</p>
                                <p className="text-sm text-text-secondary">Better Retention</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold gradient-text">50+</p>
                                <p className="text-sm text-text-secondary">Points Per Quiz</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold gradient-text">6</p>
                                <p className="text-sm text-text-secondary">Achievement Tiers</p>
                            </div>
                        </div>
                    </div>

                    {/* Right content - Feature cards */}
                    <div className="relative hidden lg:block">
                        <div className="grid gap-4">
                            {/* Feature cards */}
                            <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg border border-gray-100 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                                        <Brain size={24} className="text-primary-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-text-primary">Smart Comprehension</h3>
                                        <p className="text-sm text-text-secondary mt-1">
                                            AI generates quizzes tailored to the content you're learning
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg border border-gray-100 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-success-100 flex items-center justify-center">
                                        <Shield size={24} className="text-success-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-text-primary">Academic Integrity</h3>
                                        <p className="text-sm text-text-secondary mt-1">
                                            Build real knowledge instead of just copying AI answers
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg border border-gray-100 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                                        <Award size={24} className="text-yellow-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-text-primary">Gamified Progress</h3>
                                        <p className="text-sm text-text-secondary mt-1">
                                            Earn points, unlock tiers, and compete on leaderboards
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
