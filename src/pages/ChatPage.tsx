import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, 
  Globe, 
  Users, 
  Shield, 
  Heart,
  MessageSquare,
  Plus,
  Smile,
  Image,
  Mic,
  MoreHorizontal,
  UserPlus,
  Flag
} from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: string;
  avatar?: string;
  type: "user" | "system" | "finn";
  reactions?: { emoji: string; count: number }[];
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      user: "FINN",
      content: "Welcome to Echo! 🐬 I'm here to help you navigate and connect safely. How are you feeling today?",
      timestamp: "2 minutes ago",
      type: "finn"
    },
    {
      id: "2",
      user: "BloomingRose",
      content: "Hi everyone! Just joined and feeling a bit nervous but excited to be part of this community 🌹",
      timestamp: "5 minutes ago",
      type: "user",
      reactions: [{ emoji: "💚", count: 3 }, { emoji: "🫂", count: 2 }]
    },
    {
      id: "3",
      user: "GentleWave",
      content: "Welcome @BloomingRose! This is such a supportive space. We're glad you're here! 💙",
      timestamp: "3 minutes ago",
      type: "user"
    },
    {
      id: "4",
      user: "SeedOfHope", 
      content: "Today I practiced some mindfulness and it really helped with my anxiety. Small steps! 🌱",
      timestamp: "1 minute ago",
      type: "user",
      reactions: [{ emoji: "🌟", count: 5 }, { emoji: "💚", count: 4 }, { emoji: "🙏", count: 2 }]
    }
  ]);

  const [currentMessage, setCurrentMessage] = useState("");
  const [activeTab, setActiveTab] = useState("world");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!currentMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      user: "You",
      content: currentMessage,
      timestamp: "Just now",
      type: "user"
    };

    setMessages(prev => [...prev, newMessage]);
    setCurrentMessage("");
    toast.success("Message sent! 💫");

    // Simulate FINN response
    if (currentMessage.toLowerCase().includes("finn") || currentMessage.toLowerCase().includes("help")) {
      setTimeout(() => {
        const finnResponse: Message = {
          id: (Date.now() + 1).toString(),
          user: "FINN",
          content: "I'm here to help! 🐬 Would you like to move to a more private Haven chat, or shall we continue here? I can also suggest some calming activities if you'd like! 🌊",
          timestamp: "Just now",
          type: "finn"
        };
        setMessages(prev => [...prev, finnResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const addReaction = (messageId: string, emoji: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const existingReaction = msg.reactions?.find(r => r.emoji === emoji);
        if (existingReaction) {
          return {
            ...msg,
            reactions: msg.reactions?.map(r => 
              r.emoji === emoji ? { ...r, count: r.count + 1 } : r
            )
          };
        } else {
          return {
            ...msg,
            reactions: [...(msg.reactions || []), { emoji, count: 1 }]
          };
        }
      }
      return msg;
    }));
    toast.success(`Reaction added! ${emoji}`);
  };

  const renderMessage = (message: Message) => (
    <div key={message.id} className={`flex gap-3 p-4 rounded-lg transition-all duration-300 hover:bg-muted/20 group ${
      message.type === "finn" ? "bg-primary/5 border border-primary/20" : ""
    }`}>
      <Avatar className="h-10 w-10">
        <AvatarFallback className={
          message.type === "finn" 
            ? "bg-gradient-to-br from-primary to-accent text-white" 
            : message.user === "You" 
              ? "bg-gradient-to-br from-success to-primary text-white"
              : "bg-gradient-to-br from-secondary to-muted text-foreground"
        }>
          {message.type === "finn" ? "🐬" : message.user === "You" ? "🌱" : message.user[0]}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span className={`font-semibold text-sm ${
            message.type === "finn" ? "text-primary" : "text-foreground"
          }`}>
            {message.user}
          </span>
          {message.type === "finn" && (
            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
              AI Assistant
            </Badge>
          )}
          <span className="text-xs text-muted-foreground">{message.timestamp}</span>
        </div>
        
        <p className="text-sm text-foreground leading-relaxed">{message.content}</p>
        
        {/* Reactions */}
        {message.reactions && (
          <div className="flex flex-wrap gap-1 mt-2">
            {message.reactions.map((reaction, idx) => (
              <Button 
                key={idx}
                variant="outline" 
                size="sm" 
                className="h-6 px-2 text-xs hover:bg-muted"
                onClick={() => addReaction(message.id, reaction.emoji)}
              >
                {reaction.emoji} {reaction.count}
              </Button>
            ))}
          </div>
        )}

        {/* Quick reaction buttons (visible on hover) */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {["💚", "🫂", "🌟", "🙏"].map((emoji) => (
            <Button 
              key={emoji}
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0 text-xs hover:bg-muted"
              onClick={() => addReaction(message.id, emoji)}
            >
              {emoji}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Safe Connections</h1>
          <p className="text-muted-foreground">Choose your space for meaningful conversations</p>
        </div>

        {/* Chat Interface */}
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="pb-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="world" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  World Chat
                  <Badge className="ml-1 bg-primary/10 text-primary">Live</Badge>
                </TabsTrigger>
                <TabsTrigger value="streams" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Streams
                  <Badge className="ml-1 bg-accent/10 text-accent">5 Active</Badge>
                </TabsTrigger>
                <TabsTrigger value="haven" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Haven
                  <Badge className="ml-1 bg-success/10 text-success">Private</Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            <TabsContent value="world" className="flex-1 flex flex-col m-0 p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm text-muted-foreground">147 members online</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <UserPlus className="h-4 w-4 mr-1" />
                    Invite
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-2">
                  {messages.map(renderMessage)}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="border-t pt-4 mt-4">
                <div className="flex gap-2 items-end">
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Share something positive... 🌱"
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pr-12 min-h-[44px] resize-none"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Smile className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Image className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button onClick={sendMessage} className="h-11">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <span>FINN is monitoring for safety 🐬</span>
                  <span>Press Enter to send</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="streams" className="flex-1 flex flex-col m-0 p-4">
              <div className="text-center py-12 space-y-4">
                <Users className="h-12 w-12 text-muted-foreground mx-auto" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Join a Stream</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect with focused groups around specific topics
                  </p>
                </div>
                <div className="grid gap-3 max-w-md mx-auto">
                  {[
                    { name: "Anxiety Support", members: 23, topic: "Coping strategies" },
                    { name: "Mindfulness Circle", members: 15, topic: "Daily practices" },
                    { name: "Student Wellness", members: 31, topic: "Academic stress" },
                    { name: "Creative Healing", members: 12, topic: "Art therapy" }
                  ].map((stream, idx) => (
                    <Card key={idx} className="p-3 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <h4 className="font-medium text-sm text-foreground">{stream.name}</h4>
                          <p className="text-xs text-muted-foreground">{stream.topic}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {stream.members} active
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
                <Button className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Stream
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="haven" className="flex-1 flex flex-col m-0 p-4">
              <div className="text-center py-12 space-y-4">
                <Shield className="h-12 w-12 text-success mx-auto" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Private Haven</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Encrypted, one-on-one conversations for deeper support
                  </p>
                </div>
                <div className="grid gap-3 max-w-md mx-auto">
                  <Card className="p-4 border-success/20">
                    <div className="text-center space-y-2">
                      <Avatar className="h-8 w-8 mx-auto">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                          🐬
                        </AvatarFallback>
                      </Avatar>
                      <h4 className="font-medium text-sm text-foreground">FINN AI Assistant</h4>
                      <p className="text-xs text-muted-foreground">Available 24/7 for support</p>
                      <Button size="sm" variant="outline">Start Private Chat</Button>
                    </div>
                  </Card>
                </div>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  Haven chats are end-to-end encrypted and completely private. 
                  Only you and your conversation partner can see the messages.
                </p>
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatPage;