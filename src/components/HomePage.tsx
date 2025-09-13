import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Heart, 
  MessageCircle, 
  Shield, 
  Sparkles, 
  Users, 
  Stethoscope,
  DollarSign,
  BookOpen,
  Gamepad2,
  Palette
} from "lucide-react";
import heroImage from "@/assets/hero-ocean-scene.jpg";
import finnMascot from "@/assets/finn-dolphin-mascot.png";
import echoLogo from "@/assets/echo-logo.png";
import bloomAvatars from "@/assets/bloom-avatars-sprout.png";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src={echoLogo} alt="Echo Logo" className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Echo</h1>
              <p className="text-xs text-muted-foreground">Where Minds Bloom</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#about" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              About
            </a>
            <a href="#contact" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="container relative z-10 mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            Where Minds Bloom 🌱
          </Badge>
          
          {/* Live Community Stats */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-success rounded-full animate-pulse"></div>
              <span>🌱 1,245 seeds grown</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span>💬 5,320 messages shared</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>👥 312 active users</span>
            </div>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground animate-fade-in">
            Echo: Where <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-gentle-pulse">Minds Bloom</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto font-medium">
            Healing, Growth, and Connection
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            A nurturing platform where mental wellness grows through authentic connection, professional support, and meaningful community. 
            Start your journey of healing and growth today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/login">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                <Heart className="mr-2 h-5 w-5" />
                Join Your Safe Space
              </Button>
            </Link>
            <Link to="/chats">
              <Button size="lg" variant="secondary" className="px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                <Users className="mr-2 h-5 w-5" />
                Continue as Guest
              </Button>
            </Link>
          </div>

          <div className="mt-6">
            <Link to="/login">
              <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-6 py-3 font-semibold">
                <Stethoscope className="mr-2 h-4 w-4" />
                Join as Expert
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4 text-foreground">Nurture Your Growth</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover a comprehensive platform designed to support your mental wellness journey with personalized features and caring community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Bloom Avatar Customization */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-primary/20">
              <CardHeader>
                <div className="h-12 w-12 bg-gradient-to-br from-primary to-success rounded-xl flex items-center justify-center mb-4">
                  <Palette className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-foreground">Bloom Avatar</CardTitle>
                <CardDescription>Customize your unique digital identity that grows with your journey</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Create a personalized avatar that evolves as you progress. Fun, gamified profiles that reflect your growth and achievements.
                </p>
              </CardContent>
            </Card>

            {/* Chat Features */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-primary/20">
              <CardHeader>
                <div className="h-12 w-12 bg-gradient-to-br from-accent to-warning rounded-xl flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-foreground">Safe Connections</CardTitle>
                <CardDescription>World Chat, Streams, and Haven for every type of conversation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <div className="h-2 w-2 bg-primary rounded-full mr-2"></div>
                    <span>World Chat - Open community support</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="h-2 w-2 bg-accent rounded-full mr-2"></div>
                    <span>Streams - Focused group conversations</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="h-2 w-2 bg-success rounded-full mr-2"></div>
                    <span>Haven - Private, encrypted chats</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FINN AI Assistant */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-primary/20">
              <CardHeader>
                <div className="h-16 w-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <img 
                    src={finnMascot} 
                    alt="FINN Dolphin Mascot" 
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </div>
                <CardTitle className="text-foreground text-center">Meet FINN</CardTitle>
                <CardDescription className="text-center">Your friendly AI dolphin companion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Gamepad2 className="h-4 w-4 mr-2 text-accent" />
                    <span>Interactive mini-games</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Sparkles className="h-4 w-4 mr-2 text-success" />
                    <span>Personalized guidance</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Shield className="h-4 w-4 mr-2 text-primary" />
                    <span>Safe conversation moderation</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Medical Connections */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-primary/20">
              <CardHeader>
                <div className="h-12 w-12 bg-gradient-to-br from-success to-primary rounded-xl flex items-center justify-center mb-4">
                  <Stethoscope className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-foreground">Expert Network</CardTitle>
                <CardDescription>Connect with verified mental health professionals</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Access licensed therapists, counselors, and mental health experts through secure, encrypted connections.
                </p>
              </CardContent>
            </Card>

            {/* Crowdfunding */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-primary/20">
              <CardHeader>
                <div className="h-12 w-12 bg-gradient-to-br from-warning to-accent rounded-xl flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-foreground">Health Crowdfunding</CardTitle>
                <CardDescription>Community support for mental health needs</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Verified campaigns with eKYC for mental health treatments, therapy sessions, and wellness programs.
                </p>
              </CardContent>
            </Card>

            {/* Blogging Platform */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-primary/20">
              <CardHeader>
                <div className="h-12 w-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-foreground">Share Your Story</CardTitle>
                <CardDescription>Express yourself through thoughtful blogging</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Write and share your wellness journey. Earn Seeds through community engagement and meaningful connections.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Growth Journey */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-bold mb-6 text-foreground">Your Growth Journey</h3>
              <p className="text-lg text-muted-foreground mb-8">
                Just like seeds that bloom into beautiful trees, your mental wellness journey is a process of growth, 
                nurturing, and patience. Every step forward, no matter how small, is progress worth celebrating.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center mt-1">
                    <div className="h-2 w-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Plant Your Seeds</h4>
                    <p className="text-sm text-muted-foreground">Start with small, meaningful connections and conversations</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 bg-success rounded-full flex items-center justify-center mt-1">
                    <div className="h-2 w-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Nurture Growth</h4>
                    <p className="text-sm text-muted-foreground">Engage with community, learn from experts, and practice self-care</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 bg-accent rounded-full flex items-center justify-center mt-1">
                    <div className="h-2 w-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Bloom Together</h4>
                    <p className="text-sm text-muted-foreground">Share your journey and help others grow in their wellness path</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src={bloomAvatars} 
                alt="Bloom avatar growth stages" 
                className="rounded-2xl shadow-lg w-full h-auto animate-float"
              />
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-accent to-primary p-4 rounded-full shadow-xl">
                <Sparkles className="h-6 w-6 text-white animate-gentle-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 bg-card border-t">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <img src={echoLogo} alt="Echo Logo" className="h-8 w-8" />
                <div>
                  <h1 className="text-xl font-bold text-foreground">Echo</h1>
                  <p className="text-xs text-muted-foreground">Where Minds Bloom</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md">
                Healing, Growth, and Connection — Together with Echo. A safe space where every voice matters and every mind can bloom.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Crisis Resources</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Community Guidelines</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 text-center">
            <p className="text-muted-foreground text-sm">
              © 2024 Echo: Where Minds Bloom. Built with 💚 for mental wellness.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;