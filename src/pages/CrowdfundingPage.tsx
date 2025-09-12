import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  DollarSign, 
  Users, 
  Clock, 
  Share2, 
  Shield,
  CheckCircle,
  Plus,
  Search,
  Filter,
  TrendingUp,
  Calendar,
  Target
} from "lucide-react";
import { toast } from "sonner";

interface Campaign {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  goalAmount: number;
  raisedAmount: number;
  supportersCount: number;
  daysLeft: number;
  category: string;
  verified: boolean;
  urgent: boolean;
  imageUrl?: string;
  story: string;
}

const CrowdfundingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCreateForm, setShowCreateForm] = useState(false);

  const campaigns: Campaign[] = [
    {
      id: "1",
      title: "Therapy Sessions for Single Mother",
      description: "Help Sarah access weekly therapy sessions to cope with postpartum depression and anxiety.",
      createdBy: "SarahBloom",
      goalAmount: 2400,
      raisedAmount: 1680,
      supportersCount: 34,
      daysLeft: 12,
      category: "Therapy",
      verified: true,
      urgent: true,
      story: "As a new single mother struggling with postpartum depression, I'm finding it hard to afford the therapy sessions I desperately need. Your support would help me become the mother my daughter deserves."
    },
    {
      id: "2", 
      title: "Anxiety Medication for Student",
      description: "College student needs help covering anxiety medication and counseling services.",
      createdBy: "HopeSeeker",
      goalAmount: 800,
      raisedAmount: 520,
      supportersCount: 28,
      daysLeft: 8,
      category: "Medication",
      verified: true,
      urgent: false,
      story: "Starting college has been overwhelming, and my anxiety has gotten worse. I need help covering medication and campus counseling services to continue my education successfully."
    },
    {
      id: "3",
      title: "PTSD Treatment for Veteran",
      description: "Supporting a veteran's journey to recovery through specialized PTSD treatment program.",
      createdBy: "VeteranSupport",
      goalAmount: 5000,
      raisedAmount: 3250,
      supportersCount: 89,
      daysLeft: 20,
      category: "Specialized Treatment",
      verified: true,
      urgent: false,
      story: "After serving our country, this veteran needs specialized PTSD treatment that's not fully covered by insurance. Every contribution helps restore hope and healing."
    },
    {
      id: "4",
      title: "Teen Depression Support Program", 
      description: "Funding counseling sessions for teenagers dealing with depression and social anxiety.",
      createdBy: "TeenHelper",
      goalAmount: 1500,
      raisedAmount: 890,
      supportersCount: 45,
      daysLeft: 15,
      category: "Youth Mental Health",
      verified: true,
      urgent: true,
      story: "Our local teen support group needs funding to provide free counseling sessions for teenagers who can't afford mental health care. Together, we can save young lives."
    },
    {
      id: "5",
      title: "Family Therapy After Loss",
      description: "Help a family process grief through professional family therapy sessions.",
      createdBy: "GrievingFamily",
      goalAmount: 1800,
      raisedAmount: 450,
      supportersCount: 12,
      daysLeft: 25,
      category: "Family Therapy",
      verified: true,
      urgent: false,
      story: "After losing our father unexpectedly, our family is struggling to cope. We need professional help to process our grief and heal together as a family unit."
    }
  ];

  const categories = ["all", "Therapy", "Medication", "Specialized Treatment", "Youth Mental Health", "Family Therapy"];

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || campaign.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getProgressPercentage = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100);
  };

  const handleSupport = (campaignId: string, amount: number) => {
    toast.success(`Thank you for supporting with $${amount}! Your kindness makes a difference. 💚`);
  };

  const handleShare = (campaignId: string) => {
    toast.success("Campaign link copied to clipboard! Share the hope! 🌟");
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Community Support</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Help community members access mental health care through verified crowdfunding campaigns
          </p>
          <div className="flex justify-center">
            <Button onClick={() => setShowCreateForm(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Campaign
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <Card className="p-4">
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background text-foreground"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="text-center p-4">
            <div className="space-y-2">
              <DollarSign className="h-8 w-8 text-success mx-auto" />
              <div className="text-2xl font-bold text-foreground">$87,420</div>
              <div className="text-sm text-muted-foreground">Total Raised</div>
            </div>
          </Card>
          <Card className="text-center p-4">
            <div className="space-y-2">
              <Users className="h-8 w-8 text-primary mx-auto" />
              <div className="text-2xl font-bold text-foreground">1,247</div>
              <div className="text-sm text-muted-foreground">Supporters</div>
            </div>
          </Card>
          <Card className="text-center p-4">
            <div className="space-y-2">
              <Target className="h-8 w-8 text-accent mx-auto" />
              <div className="text-2xl font-bold text-foreground">156</div>
              <div className="text-sm text-muted-foreground">Lives Helped</div>
            </div>
          </Card>
          <Card className="text-center p-4">
            <div className="space-y-2">
              <Heart className="h-8 w-8 text-warning mx-auto" />
              <div className="text-2xl font-bold text-foreground">45</div>
              <div className="text-sm text-muted-foreground">Active Campaigns</div>
            </div>
          </Card>
        </div>

        {/* Campaigns Grid */}
        <div className="space-y-6">
          {filteredCampaigns.map((campaign) => (
            <Card key={campaign.id} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-success text-white">
                          {campaign.createdBy[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg text-foreground">{campaign.title}</h3>
                          {campaign.verified && (
                            <CheckCircle className="h-5 w-5 text-success" />
                          )}
                          {campaign.urgent && (
                            <Badge className="bg-destructive/10 text-destructive border-destructive/20">
                              Urgent
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">by {campaign.createdBy}</p>
                        <Badge variant="outline" className="text-xs">
                          {campaign.category}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleShare(campaign.id)}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Description */}
                  <p className="text-foreground">{campaign.description}</p>
                  
                  {/* Story */}
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground italic">"{campaign.story}"</p>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className="text-sm font-medium text-foreground">
                        ${campaign.raisedAmount.toLocaleString()} of ${campaign.goalAmount.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={getProgressPercentage(campaign.raisedAmount, campaign.goalAmount)} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{Math.round(getProgressPercentage(campaign.raisedAmount, campaign.goalAmount))}% funded</span>
                      <span>{campaign.daysLeft} days left</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {campaign.supportersCount} supporters
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {campaign.daysLeft} days remaining
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <Button 
                      onClick={() => handleSupport(campaign.id, 25)}
                      className="flex-1 bg-success hover:bg-success/90"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Support $25
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleSupport(campaign.id, 50)}
                      className="flex-1"
                    >
                      Support $50
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleSupport(campaign.id, 100)}
                      className="flex-1"
                    >
                      Support $100
                    </Button>
                    <Button variant="ghost" className="px-3">
                      Custom Amount
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12">
            <div className="space-y-4">
              <div className="text-4xl">💚</div>
              <h3 className="text-lg font-semibold text-foreground">No campaigns found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or create a new campaign
              </p>
            </div>
          </div>
        )}

        {/* Security Notice */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6 text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-primary">
              <Shield className="h-5 w-5" />
              <span className="font-semibold">Verified & Secure</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              All campaigns go through our eKYC verification process. Funds are held in escrow and released directly to 
              healthcare providers to ensure proper use for mental health treatment.
            </p>
            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <span>✓ Identity Verified</span>
              <span>✓ Healthcare Provider Direct Pay</span>
              <span>✓ Secure Payment Processing</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CrowdfundingPage;