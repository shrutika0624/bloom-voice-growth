import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  Edit, 
  Leaf,
  Sparkles,
  TrendingUp,
  Plus
} from "lucide-react";
import { toast } from "sonner";
import bloomAvatars from "@/assets/bloom-avatars-sprout.png";

interface BlogPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    level: number;
    verified: boolean;
  };
  title: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  tags: string[];
  seedsEarned: number;
}

const BlogPage = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "", tags: "" });
  
  const blogPosts: BlogPost[] = [
    {
      id: "1",
      author: {
        name: "Maya Chen",
        avatar: bloomAvatars,
        level: 15,
        verified: true
      },
      title: "Finding Peace in Small Moments",
      content: "Today I realized that healing doesn't always come from big breakthroughs. Sometimes it's found in the quiet moments - sipping tea while watching the sunrise, or feeling the gentle breeze during an evening walk. These small pockets of peace have become my anchors during turbulent times. I've learned to collect these moments like pressed flowers in a book, returning to them whenever I need a reminder that beauty and calm still exist in this world. What small moments bring you peace?",
      likes: 47,
      comments: 12,
      shares: 8,
      timestamp: "2 hours ago",
      tags: ["mindfulness", "peace", "self-care"],
      seedsEarned: 235
    },
    {
      id: "2",
      author: {
        name: "Alex Rivera",
        avatar: bloomAvatars,
        level: 8,
        verified: false
      },
      title: "My Journey with Anxiety - 6 Months Later",
      content: "Six months ago, I could barely leave my room. Anxiety felt like a constant storm cloud following me everywhere. Today, I'm sharing this from a café - something that would have been impossible back then. The journey hasn't been linear. There were setbacks, days when progress felt impossible, and moments when I wanted to give up. But with the support of this amazing community and professional help, I've learned that courage isn't the absence of fear - it's taking one small step despite it. To anyone struggling: you're not alone, and every tiny step forward matters.",
      likes: 89,
      comments: 23,
      shares: 15,
      timestamp: "5 hours ago",
      tags: ["anxiety", "recovery", "mental-health"],
      seedsEarned: 445
    },
    {
      id: "3",
      author: {
        name: "Dr. Sarah Kim",
        avatar: bloomAvatars,
        level: 25,
        verified: true
      },
      title: "The Science Behind Gratitude Practice",
      content: "As a mental health professional, I'm constantly amazed by the research on gratitude. Studies show that regular gratitude practice can literally rewire our brains for positivity. The anterior cingulate cortex and medial prefrontal cortex - areas associated with emotional regulation - show increased activity in people who practice gratitude regularly. But beyond the science, I've seen it transform lives. Start small: three things you're grateful for each day. It doesn't have to be profound - maybe it's your morning coffee or a friend's text message. What matters is the practice of noticing the good that already exists.",
      likes: 156,
      comments: 31,
      shares: 42,
      timestamp: "8 hours ago",
      tags: ["gratitude", "neuroscience", "mental-health", "expert-insight"],
      seedsEarned: 780
    }
  ];

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      toast.error("Please fill in both title and content");
      return;
    }

    // Simulate post creation
    toast.success("Post created! You earned 25 Seeds! 🌱");
    setNewPost({ title: "", content: "", tags: "" });
    setIsCreating(false);
  };

  const handleLike = (postId: string) => {
    toast.success("Liked! Author earned 5 Seeds 🌱");
  };

  const handleComment = (postId: string) => {
    toast.success("Comment added! You earned 3 Seeds 🌱");
  };

  const handleShare = (postId: string) => {
    toast.success("Post shared! Author earned 2 Seeds 🌱");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Edit className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Bloom Stories</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Share your journey, inspire others, and earn Seeds through meaningful connections. 
            Every story has the power to help someone bloom.
          </p>
          
          <div className="flex justify-center gap-4">
            <Button 
              onClick={() => setIsCreating(!isCreating)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="mr-2 h-4 w-4" />
              Share Your Story
            </Button>
          </div>
        </div>

        {/* Create Post Form */}
        {isCreating && (
          <Card className="border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-accent" />
                <span>Share Your Bloom Story</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Give your story a meaningful title..."
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="text-lg font-medium"
              />
              <Textarea
                placeholder="Share your journey, insights, or words of encouragement. Your story might be exactly what someone needs to hear today..."
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                className="min-h-32"
              />
              <Input
                placeholder="Tags (e.g., anxiety, recovery, mindfulness, self-care)"
                value={newPost.tags}
                onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
              />
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground flex items-center">
                  <Leaf className="h-4 w-4 mr-1 text-success" />
                  Earn 25 Seeds for posting + Seeds from likes and comments!
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setIsCreating(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreatePost} className="bg-primary hover:bg-primary/90">
                    Publish Story
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Featured Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">324</div>
              <div className="text-sm text-muted-foreground">Stories Shared</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">2.1K</div>
              <div className="text-sm text-muted-foreground">Seeds Earned</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">89%</div>
              <div className="text-sm text-muted-foreground">Positive Impact</div>
            </CardContent>
          </Card>
        </div>

        {/* Blog Posts */}
        <div className="space-y-6">
          {blogPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback>
                        {post.author.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-foreground">{post.author.name}</span>
                        {post.author.verified && (
                          <Badge className="bg-accent/10 text-accent border-accent/20 text-xs">
                            ✓ Verified
                          </Badge>
                        )}
                        <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                          Level {post.author.level}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">{post.timestamp}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-success">
                    <Leaf className="h-4 w-4" />
                    <span className="text-sm font-medium">+{post.seedsEarned}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-3">{post.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{post.content}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <div className="flex space-x-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleLike(post.id)}
                      className="text-muted-foreground hover:text-accent"
                    >
                      <Heart className="h-4 w-4 mr-1" />
                      {post.likes}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleComment(post.id)}
                      className="text-muted-foreground hover:text-primary"
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {post.comments}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleShare(post.id)}
                      className="text-muted-foreground hover:text-success"
                    >
                      <Share2 className="h-4 w-4 mr-1" />
                      {post.shares}
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" className="px-8">
            Load More Stories
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;