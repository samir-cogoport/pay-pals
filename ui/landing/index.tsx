
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {  ArrowRight, CheckCircle2 } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";
import { benefits, features } from "./config";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 md:h-8 md:w-8 rounded-lg bg-gradient-hero" />
            <span className="text-lg md:text-xl font-bold text-foreground">PayPals</span>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-sm md:text-base">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-gradient-hero text-sm md:text-base">Sign up</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5 pointer-events-none" />
        <div className="container mx-auto px-4 py-12 md:py-20 lg:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-6 md:space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Split expenses with
              <span className="text-primary"> friends & family</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              The easiest way to share bills, track group expenses, and settle up. 
              Keep your friendships drama-free.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center px-4">
              <Link href="/signup" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-hero text-base sm:text-lg px-6 sm:px-8 shadow-card-hover group">
                  Get started free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/login" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8">
                  Log in
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 justify-center pt-4 md:pt-8 text-sm md:text-base">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-base">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 md:mb-4">
              Everything you need to split bills
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4">
              Powerful features that make sharing expenses simple
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-5 md:p-6 bg-card shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border-border"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-gradient-card flex items-center justify-center mb-3 md:mb-4">
                  <feature.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-hero text-primary-foreground p-6 sm:p-8 md:p-12 lg:p-16 text-center shadow-card-hover">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
              Ready to simplify your shared expenses?
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 md:mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of groups who trust PayPals to keep their finances fair and transparent.
            </p>
            <Link href="/signup">
              <Button size="lg" variant="accent" className="text-base md:text-lg px-6 md:px-8">
                Create your account
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 py-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 PayPals. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
