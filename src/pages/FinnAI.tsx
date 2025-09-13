import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { 
  Bot, 
  Heart, 
  Gamepad2, 
  Palette, 
  Send,
  Sparkles,
  Wand2,
  Trophy,
  Play,
  Pause,
  RotateCcw,
  Star,
  Smile,
  MessageCircle,
  Users
} from "lucide-react";
import { toast } from "sonner";
import finnMascot from "@/assets/finn-dolphin-mascot.jpg";

interface ChatMessage {
  id: string;
  sender: "user" | "finn";
  content: string;
  timestamp: string;
  emotion?: string;
}

const FinnAI = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [currentMessage, setCurrentMessage] = useState("");
  const [finnOutfit, setFinnOutfit] = useState("casual");
  const [gameScore, setGameScore] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [bubbles, setBubbles] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const [seeds, setSeeds] = useState(256);
  
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "finn",
      content: "Hello! I'm FINN, your friendly AI dolphin companion! 🐬 I'm here to support you, play games, and help make your Echo journey amazing. How are you feeling today?",
      timestamp: "Just now",
      emotion: "happy"
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const outfits = [
    { id: "casual", name: "Cozy Sweater", cost: 0, emoji: "🧥", description: "Default comfy look" },
    { id: "formal", name: "Bow Tie", cost: 50, emoji: "🎀", description: "Dapper and distinguished" },
    { id: "beach", name: "Sunglasses", cost: 30, emoji: "🕶️", description: "Cool ocean vibes" },
    { id: "party", name: "Party Hat", cost: 40, emoji: "🎉", description: "Ready to celebrate" },
    { id: "wizard", name: "Wizard Hat", cost: 80, emoji: "🧙‍♂️", description: "Magical powers activated" },
  ];

  const finnResponses = [
    "That's wonderful to hear! 🌟 Your positive energy brightens my day!",
    "I understand how you're feeling. Remember, every small step counts! 🌱",
    "You're doing great! Want to try a fun breathing exercise together? 🌊",
    "I'm always here for you! How about we play a quick game to lift your spirits? 🎮",
    "Your growth journey is inspiring! I've seen so much progress in you! 💙",
    "That sounds challenging. Would you like to move to a private Haven chat for more support? 🏠",
    "Let's celebrate the small wins! Every positive moment matters! ✨",
    "I'm curious - what's been the best part of your day so far? 🌈"
  ];

  const sendMessage = () => {
    if (!currentMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      content: currentMessage,
      timestamp: "Just now"
    };

    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage("");

    // Simulate FINN response
    setTimeout(() => {
      const randomResponse = finnResponses[Math.floor(Math.random() * finnResponses.length)];
      const finnMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "finn",
        content: randomResponse,
        timestamp: "Just now",
        emotion: "supportive"
      };
      setChatMessages(prev => [...prev, finnMessage]);
    }, 1000);
  };

  const buyOutfit = (outfit: typeof outfits[0]) => {
    if (outfit.cost === 0) {
      setFinnOutfit(outfit.id);
      toast.success(`FINN is now wearing ${outfit.name}! ${outfit.emoji}`);
      return;
    }

    if (seeds >= outfit.cost) {
      setSeeds(prev => prev - outfit.cost);
      setFinnOutfit(outfit.id);
      toast.success(`FINN loves the new ${outfit.name}! ${outfit.emoji} (-${outfit.cost} Seeds)`);
    } else {
      toast.error(`Not enough Seeds! You need ${outfit.cost - seeds} more Seeds.`);
    }
  };

  const startBubbleGame = () => {
    setIsGameActive(true);
    setGameScore(0);
    setBubbles([]);
    
    // Create bubbles
    const newBubbles = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 300,
      y: Math.random() * 200 + 100,
      size: Math.random() * 30 + 20
    }));
    setBubbles(newBubbles);

    toast.success("Bubble Drifter started! Pop the bubbles! 🫧");
  };

  const popBubble = (bubbleId: number) => {
    setBubbles(prev => prev.filter(b => b.id !== bubbleId));
    setGameScore(prev => prev + 10);
    
    if (bubbles.length === 1) {
      // Game finished
      setIsGameActive(false);
      const earnedSeeds = Math.floor(gameScore / 10);
      setSeeds(prev => prev + earnedSeeds);
      toast.success(`Game complete! Earned ${earnedSeeds} Seeds! 🌱`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-primary/20">
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-4xl">
                  🐬
                </AvatarFallback>
              </Avatar>
              <div className="absolute -top-2 -right-2">
                <span className="text-2xl">
                  {outfits.find(o => o.id === finnOutfit)?.emoji || "🧥"}
                </span>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Meet FINN</h1>
            <p className="text-muted-foreground">Your friendly AI dolphin companion</p>
            <Badge className="bg-success/10 text-success border-success/20 mt-2">
              🌱 {seeds} Seeds Available
            </Badge>
          </div>
        </div>

        {/* Main Interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Chat with FINN
            </TabsTrigger>
            <TabsTrigger value="wardrobe" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Wardrobe
            </TabsTrigger>
            <TabsTrigger value="games" className="flex items-center gap-2">
              <Gamepad2 className="h-4 w-4" />
              Mini-Games
            </TabsTrigger>
            <TabsTrigger value="activities" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Activities
            </TabsTrigger>
          </TabsList>

          {/* Chat Tab */}
          <TabsContent value="chat" className="space-y-6">
            {/* FINN Suggestion Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="hover:shadow-lg transition-all cursor-pointer group border-primary/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">💡</div>
                  <h4 className="font-semibold text-sm mb-1">Start a Stream</h4>
                  <p className="text-xs text-muted-foreground">Create a group chat about positivity</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all cursor-pointer group border-success/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">🔒</div>
                  <h4 className="font-semibold text-sm mb-1">Move to Haven</h4>
                  <p className="text-xs text-muted-foreground">Continue this conversation privately</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all cursor-pointer group border-accent/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">🎮</div>
                  <h4 className="font-semibold text-sm mb-1">Play Mini-Game</h4>
                  <p className="text-xs text-muted-foreground">Try Bubble Drifter to earn Seeds</p>
                </CardContent>
              </Card>
            </div>

            <Card className="h-[500px] flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  Chat with FINN
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    🐬 AI Powered
                  </Badge>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-4">
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-4">
                    {chatMessages.map((message) => (
                      <div key={message.id} className={`flex gap-3 ${
                        message.sender === "user" ? "justify-end" : "justify-start"
                      }`}>
                        {message.sender === "finn" && (
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                              🐬
                            </AvatarFallback>
                          </Avatar>
                        )}
                        
                        <div className={`max-w-[70%] p-3 rounded-lg ${
                          message.sender === "user" 
                            ? "bg-primary text-primary-foreground ml-auto" 
                            : "bg-muted text-foreground"
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          <span className="text-xs opacity-70 mt-1 block">{message.timestamp}</span>
                        </div>
                        
                        {message.sender === "user" && (
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-gradient-to-br from-success to-primary text-white">
                              🌱
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Share your feelings with FINN... 💙"
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1"
                    />
                    <Button onClick={sendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    FINN is trained to provide emotional support and positive guidance 🌊
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wardrobe Tab */}
          <TabsContent value="wardrobe" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-accent" />
                  FINN's Wardrobe Collection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {outfits.map((outfit) => (
                    <Card 
                      key={outfit.id}
                      className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        finnOutfit === outfit.id ? "ring-2 ring-primary bg-primary/5" : ""
                      }`}
                    >
                      <CardContent className="p-4 text-center space-y-3">
                        <div className="text-4xl">{outfit.emoji}</div>
                        <div>
                          <h3 className="font-semibold text-foreground">{outfit.name}</h3>
                          <p className="text-xs text-muted-foreground">{outfit.description}</p>
                        </div>
                        
                        {finnOutfit === outfit.id ? (
                          <Badge className="bg-success/10 text-success border-success/20">
                            Currently Wearing
                          </Badge>
                        ) : (
                        <Button 
                            onClick={() => buyOutfit(outfit)}
                            className={outfit.cost === 0 ? "bg-muted hover:bg-muted/80" : outfit.cost > seeds ? "opacity-50" : ""}
                            disabled={outfit.cost > 0 && seeds < outfit.cost}
                          >
                            {outfit.cost === 0 ? "Free ✨" : outfit.cost > seeds ? `Need ${outfit.cost - seeds} more 🌱` : `${outfit.cost} Seeds 🌱`}
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Games Tab */}
          <TabsContent value="games" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gamepad2 className="h-5 w-5 text-primary" />
                    Bubble Drifter
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative h-64 bg-gradient-to-b from-primary/10 to-accent/10 rounded-lg border overflow-hidden">
                    {bubbles.map((bubble) => (
                      <div
                        key={bubble.id}
                        className="absolute bg-primary/30 rounded-full cursor-pointer animate-float border-2 border-primary/20 hover:scale-110 transition-transform"
                        style={{
                          left: `${bubble.x}px`,
                          top: `${bubble.y}px`,
                          width: `${bubble.size}px`,
                          height: `${bubble.size}px`,
                        }}
                        onClick={() => popBubble(bubble.id)}
                      />
                    ))}
                    
                    {!isGameActive && bubbles.length === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center space-y-2">
                          <div className="text-4xl">🫧</div>
                          <p className="text-sm text-muted-foreground">Click to pop bubbles!</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Score: {gameScore}</span>
                    <Button 
                      onClick={startBubbleGame}
                      disabled={isGameActive}
                      className="flex items-center gap-2"
                    >
                      <Play className="h-4 w-4" />
                      {isGameActive ? "Playing..." : "Start Game"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-warning" />
                    Shared Starlight
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="h-64 bg-gradient-to-b from-indigo-900/20 to-purple-900/20 rounded-lg border flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="text-6xl animate-gentle-pulse">⭐</div>
                      <p className="text-sm text-muted-foreground">Multiplayer breathing exercise</p>
                      <Badge className="bg-warning/10 text-warning border-warning/20">Coming Soon</Badge>
                      <p className="text-xs text-muted-foreground">Connect with friends for guided meditation</p>
                    </div>
                  </div>
                  <Button disabled className="w-full">
                    <Users className="h-4 w-4 mr-2" />
                    Find Meditation Partners
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-accent" />
                    Breathing Exercise
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center space-y-4">
                    <div className="h-32 w-32 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center animate-gentle-pulse">
                      <span className="text-4xl">🫁</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">4-7-8 Breathing</h3>
                      <p className="text-sm text-muted-foreground">Follow FINN's guidance for calm breathing</p>
                    </div>
                    <Button className="w-full">
                      <Play className="h-4 w-4 mr-2" />
                      Start Breathing Exercise
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-success" />
                    Positive Affirmations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center space-y-4">
                    <div className="p-6 bg-muted/50 rounded-lg">
                      <p className="text-lg font-medium text-foreground italic">
                        "I am growing stronger every day, just like the seeds that bloom into beautiful trees."
                      </p>
                    </div>
                    <Button className="w-full" variant="outline">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      New Affirmation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FinnAI;