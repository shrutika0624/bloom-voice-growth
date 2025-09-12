import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Heart, 
  Users, 
  Stethoscope, 
  Mail, 
  Lock, 
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  Sparkles,
  MessageCircle
} from "lucide-react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<"user" | "expert">("user");
  const navigate = useNavigate();

  const handleAuth = () => {
    if (isLogin) {
      toast.success("Welcome back to Echo! 🌊");
      navigate("/dashboard");
    } else {
      toast.success("Welcome to Echo! Let's begin your growth journey! 🌱");
      navigate("/dashboard");
    }
  };

  const handleGuestAccess = () => {
    toast.success("Exploring Echo as a guest! You can upgrade anytime! 👋");
    navigate("/chats");
  };

  const handleExpertSignup = () => {
    toast.success("Expert application received! We'll verify your credentials and be in touch! 🩺");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-center lg:justify-start space-x-2">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-success animate-gentle-pulse"></div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Echo</h1>
                <p className="text-sm text-muted-foreground">Voices that Grow</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
                Join Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Safe Space</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Where minds bloom through connection, support, and understanding
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="grid gap-4 max-w-md mx-auto lg:mx-0">
            <div className="flex items-center gap-3 text-left">
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Safe Conversations</h3>
                <p className="text-sm text-muted-foreground">World Chat, Streams, and private Haven</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-left">
              <div className="h-10 w-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">FINN AI Assistant</h3>
                <p className="text-sm text-muted-foreground">Your friendly dolphin companion</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-left">
              <div className="h-10 w-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-success" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Expert Network</h3>
                <p className="text-sm text-muted-foreground">Verified mental health professionals</p>
              </div>
            </div>
          </div>

          {/* Guest Access */}
          <div className="bg-muted/50 p-6 rounded-xl border">
            <h3 className="font-semibold text-foreground mb-2">Want to explore first?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Join as a guest to experience Echo's supportive community without creating an account
            </p>
            <Button 
              variant="outline" 
              onClick={handleGuestAccess}
              className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Users className="h-4 w-4 mr-2" />
              Continue as Guest
            </Button>
          </div>
        </div>

        {/* Right Side - Auth Forms */}
        <div className="w-full max-w-md mx-auto">
          <Tabs value={userType} onValueChange={(value) => setUserType(value as "user" | "expert")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="user" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Join as User
              </TabsTrigger>
              <TabsTrigger value="expert" className="flex items-center gap-2">
                <Stethoscope className="h-4 w-4" />
                Join as Expert
              </TabsTrigger>
            </TabsList>

            {/* User Registration/Login */}
            <TabsContent value="user">
              <Card>
                <CardHeader className="text-center space-y-2">
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Heart className="h-5 w-5 text-primary" />
                    {isLogin ? "Welcome Back" : "Start Your Journey"}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {isLogin ? "Continue your growth in Echo" : "Join our supportive community"}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {!isLogin && (
                    <div className="space-y-2">
                      <Label htmlFor="name">Display Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="name"
                          placeholder="Choose a supportive name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Secure password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {!isLogin && (
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="text-sm text-muted-foreground">
                        I agree to Echo's community guidelines and privacy policy
                      </Label>
                    </div>
                  )}

                  <Button onClick={handleAuth} className="w-full">
                    {isLogin ? "Sign In" : "Join Echo"}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>

                  <div className="text-center">
                    <Button 
                      variant="link" 
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {isLogin ? "New to Echo? Create an account" : "Already have an account? Sign in"}
                    </Button>
                  </div>

                  {isLogin && (
                    <div className="text-center">
                      <Button variant="link" className="text-sm text-muted-foreground hover:text-foreground">
                        Forgot your password?
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Expert Registration */}
            <TabsContent value="expert">
              <Card>
                <CardHeader className="text-center space-y-2">
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Stethoscope className="h-5 w-5 text-accent" />
                    Join as Mental Health Expert
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Help others on their mental wellness journey
                  </p>
                  <Badge className="bg-accent/10 text-accent border-accent/20">
                    Verification Required
                  </Badge>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="expert-name">Full Name</Label>
                    <Input id="expert-name" placeholder="Dr. Your Name" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="expert-email">Professional Email</Label>
                    <Input id="expert-email" type="email" placeholder="name@clinic.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="license">License Number</Label>
                    <Input id="license" placeholder="Professional license number" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization</Label>
                    <Input id="specialization" placeholder="e.g., Clinical Psychology, Psychiatry" />
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <h4 className="font-medium text-sm text-foreground">Verification Process:</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• License verification (1-2 business days)</li>
                      <li>• Background check and credential review</li>
                      <li>• Platform training and onboarding</li>
                    </ul>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="expert-terms" />
                    <Label htmlFor="expert-terms" className="text-sm text-muted-foreground">
                      I agree to Echo's professional standards and ethics code
                    </Label>
                  </div>

                  <Button onClick={handleExpertSignup} className="w-full bg-accent hover:bg-accent/90">
                    Submit Expert Application
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    We'll contact you within 48 hours regarding your application status
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;