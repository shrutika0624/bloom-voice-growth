import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Palette, 
  Sparkles, 
  Trophy, 
  Calendar,
  TrendingUp,
  Heart,
  MessageCircle,
  Users,
  Target,
  Zap,
  Leaf
} from "lucide-react";
import { toast } from "sonner";
import bloomAvatars from "@/assets/bloom-avatars-sprout.png";
import bloomTreeFlower from "@/assets/bloom-avatars-tree-flower.png";

const Dashboard = () => {
  const [selectedAvatar, setSelectedAvatar] = useState("sprout");
  const [selectedColor, setSelectedColor] = useState("seafoam");
  const [seedsBalance, setSeedsBalance] = useState(1247);

  const avatarTypes = [
    { id: "sprout", name: "Young Sprout", emoji: "🌱", description: "Just beginning to grow", cost: 0 },
    { id: "sapling", name: "Healthy Sapling", emoji: "🌿", description: "Growing stronger", cost: 150 },
    { id: "bloom", name: "Blooming Tree", emoji: "🌳", description: "In full bloom", cost: 300 },
    { id: "flower", name: "Flower Garden", emoji: "🌸", description: "Spreading beauty", cost: 500 },
  ];

  const colorPalettes = [
    { id: "seafoam", name: "Ocean Breeze", colors: ["hsl(170, 35%, 45%)", "hsl(150, 40%, 55%)", "hsl(12, 85%, 70%)"], cost: 0 },
    { id: "sunset", name: "Sunset Glow", colors: ["hsl(35, 80%, 65%)", "hsl(12, 85%, 70%)", "hsl(0, 70%, 60%)"], cost: 100 },
    { id: "forest", name: "Forest Deep", colors: ["hsl(150, 40%, 55%)", "hsl(170, 35%, 45%)", "hsl(200, 25%, 20%)"], cost: 100 },
    { id: "lavender", name: "Calm Lavender", colors: ["hsl(260, 60%, 75%)", "hsl(170, 35%, 45%)", "hsl(12, 85%, 70%)"], cost: 150 },
  ];

  const achievements = [
    { name: "First Sprout", description: "Joined Echo: Where Minds Bloom", completed: true, icon: "🌱", seeds: 50 },
    { name: "Conversation Starter", description: "Sent your first message", completed: true, icon: "💬", seeds: 25 },
    { name: "FINN's Friend", description: "Played with FINN the dolphin", completed: true, icon: "🐬", seeds: 75 },
    { name: "Helper", description: "Supported a community member", completed: false, icon: "🤝", seeds: 100 },
    { name: "Growth Mindset", description: "7 days of active engagement", completed: false, icon: "📈", seeds: 200 },
    { name: "Bloom Master", description: "Unlocked all avatar styles", completed: false, icon: "🏆", seeds: 500 },
  ];

  const handleAvatarChange = (avatarId: string) => {
    setSelectedAvatar(avatarId);
    toast.success("Avatar updated! Your bloom is looking great! 🌟");
  };

  const handleColorChange = (colorId: string) => {
    setSelectedColor(colorId);
    toast.success("Color palette updated! Beautiful choice! 🎨");
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img 
              src={bloomAvatars} 
              alt="Your Bloom Avatar" 
              className="w-20 h-20 rounded-full border-4 border-primary/20 shadow-lg object-cover"
            />
            <Badge className="absolute -top-2 -right-2 bg-accent text-accent-foreground">
              Level 12
            </Badge>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome to Your Oasis</h1>
            <p className="text-muted-foreground">Your personal space where minds bloom and grow</p>
            <div className="flex gap-2 mt-2">
              <Badge className="bg-success/10 text-success border-success/20">
                🔥 7 Day Streak
              </Badge>
              <Badge className="bg-primary/10 text-primary border-primary/20">
                Growing Strong
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3 bg-gradient-to-r from-success/10 to-primary/10 p-4 rounded-lg border border-success/20">
          <Leaf className="h-6 w-6 text-success animate-gentle-pulse" />
          <div>
            <div className="text-2xl font-bold text-success">{seedsBalance.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Seeds Balance</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-all duration-300 group">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Messages Sent</CardTitle>
              <MessageCircle className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">147</div>
            <div className="flex items-center text-xs text-success mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +23 this week
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 group">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Friends Made</CardTitle>
              <Users className="h-4 w-4 text-accent group-hover:scale-110 transition-transform" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">23</div>
            <div className="flex items-center text-xs text-success mt-1">
              <Heart className="h-3 w-3 mr-1" />
              Growing network
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 group">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">FINN Interactions</CardTitle>
              <Zap className="h-4 w-4 text-warning group-hover:scale-110 transition-transform" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">89</div>
            <div className="flex items-center text-xs text-success mt-1">
              <Sparkles className="h-3 w-3 mr-1" />
              AI friendship
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 group">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Growth Score</CardTitle>
              <Target className="h-4 w-4 text-success group-hover:scale-110 transition-transform" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">8.7</div>
            <div className="flex items-center text-xs text-success mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              Excellent progress
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="customize" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="customize" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Customize Bloom
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="journey" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            My Journey
          </TabsTrigger>
        </TabsList>

        <TabsContent value="customize" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                Bloom Avatar Customization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Selection */}
              <div>
                <h3 className="font-semibold mb-4 text-foreground">Choose Your Growth Stage</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {avatarTypes.map((avatar) => (
                    <Card 
                      key={avatar.id}
                      className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        selectedAvatar === avatar.id ? "ring-2 ring-primary bg-primary/5" : ""
                      }`}
                      onClick={() => handleAvatarChange(avatar.id)}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl mb-2">{avatar.emoji}</div>
                        <h4 className="font-medium text-sm text-foreground">{avatar.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{avatar.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Color Palette Selection */}
              <div>
                <h3 className="font-semibold mb-4 text-foreground">Color Palette</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {colorPalettes.map((palette) => (
                    <Card 
                      key={palette.id}
                      className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        selectedColor === palette.id ? "ring-2 ring-primary bg-primary/5" : ""
                      }`}
                      onClick={() => handleColorChange(palette.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex gap-2 mb-2">
                          {palette.colors.map((color, idx) => (
                            <div key={idx} className={`w-6 h-6 rounded-full ${color}`} />
                          ))}
                        </div>
                        <h4 className="font-medium text-sm text-foreground">{palette.name}</h4>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-warning" />
                Your Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 ${
                    achievement.completed 
                      ? "bg-success/5 border-success/20" 
                      : "bg-muted/20 border-border"
                  }`}
                >
                  <div className={`text-2xl ${achievement.completed ? "animate-gentle-pulse" : "opacity-50"}`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${achievement.completed ? "text-foreground" : "text-muted-foreground"}`}>
                      {achievement.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                  {achievement.completed && (
                    <Badge className="bg-success/10 text-success border-success/20">
                      Completed
                    </Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="journey" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Your Growth Journey
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-foreground">Overall Progress</span>
                  <span className="text-sm text-muted-foreground">87%</span>
                </div>
                <Progress value={87} className="h-3" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">This Week</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Messages sent</span>
                      <span className="text-foreground font-medium">23</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">FINN interactions</span>
                      <span className="text-foreground font-medium">15</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">New connections</span>
                      <span className="text-foreground font-medium">4</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Goals</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-success rounded-full"></div>
                      <span className="text-sm text-muted-foreground">Daily check-ins</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                      <span className="text-sm text-muted-foreground">Weekly reflection</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-accent rounded-full"></div>
                      <span className="text-sm text-muted-foreground">Community support</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;