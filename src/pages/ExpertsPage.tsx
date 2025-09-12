import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  MapPin, 
  Star, 
  Shield, 
  MessageCircle, 
  Calendar,
  CheckCircle,
  Filter,
  Clock,
  DollarSign,
  Heart,
  Phone,
  Video
} from "lucide-react";
import { toast } from "sonner";

interface Expert {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  location: string;
  verified: boolean;
  avatar?: string;
  price: number;
  availability: "available" | "busy" | "offline";
  responseTime: string;
  languages: string[];
  description: string;
}

const ExpertsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const experts: Expert[] = [
    {
      id: "1",
      name: "Dr. Sarah Chen",
      title: "Licensed Clinical Psychologist",
      specialties: ["Anxiety", "Depression", "Trauma", "CBT"],
      rating: 4.9,
      reviewCount: 156,
      location: "San Francisco, CA",
      verified: true,
      price: 120,
      availability: "available",
      responseTime: "Within 2 hours",
      languages: ["English", "Mandarin"],
      description: "Specializing in anxiety disorders and trauma recovery with 10+ years of experience. I believe in creating a safe, supportive environment for healing."
    },
    {
      id: "2", 
      name: "Dr. Marcus Johnson",
      title: "Psychiatrist & Therapist",
      specialties: ["ADHD", "Bipolar", "Medication Management"],
      rating: 4.8,
      reviewCount: 203,
      location: "New York, NY",
      verified: true,
      price: 150,
      availability: "busy",
      responseTime: "Within 4 hours",
      languages: ["English", "Spanish"],
      description: "Board-certified psychiatrist with expertise in medication management and therapy. Committed to holistic mental health care."
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      title: "Licensed Marriage & Family Therapist",
      specialties: ["Relationships", "Family Therapy", "Couples Counseling"],
      rating: 4.7,
      reviewCount: 89,
      location: "Austin, TX",
      verified: true,
      price: 100,
      availability: "available",
      responseTime: "Within 1 hour",
      languages: ["English", "Spanish"],
      description: "Helping couples and families build stronger connections through evidence-based therapeutic approaches."
    },
    {
      id: "4",
      name: "Dr. James Wilson",
      title: "Clinical Social Worker",
      specialties: ["Substance Abuse", "Addiction Recovery", "Group Therapy"],
      rating: 4.9,
      reviewCount: 134,
      location: "Denver, CO", 
      verified: true,
      price: 90,
      availability: "available",
      responseTime: "Within 3 hours",
      languages: ["English"],
      description: "Specialized in addiction recovery and substance abuse treatment with compassionate, evidence-based care."
    },
    {
      id: "5",
      name: "Dr. Priya Patel",
      title: "Child & Adolescent Psychologist",
      specialties: ["Child Psychology", "Autism", "ADHD", "Behavioral Issues"],
      rating: 4.8,
      reviewCount: 92,
      location: "Seattle, WA",
      verified: true,
      price: 110,
      availability: "offline",
      responseTime: "Within 6 hours", 
      languages: ["English", "Hindi"],
      description: "Dedicated to helping children and teens navigate mental health challenges with age-appropriate therapeutic techniques."
    }
  ];

  const specialties = ["all", "Anxiety", "Depression", "Trauma", "ADHD", "Relationships", "Addiction", "Child Psychology"];
  const locations = ["all", "San Francisco, CA", "New York, NY", "Austin, TX", "Denver, CO", "Seattle, WA"];

  const filteredExperts = experts.filter(expert => {
    const matchesSearch = expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         expert.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSpecialty = selectedSpecialty === "all" || expert.specialties.includes(selectedSpecialty);
    const matchesLocation = selectedLocation === "all" || expert.location === selectedLocation;
    
    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  const getAvailabilityColor = (status: Expert["availability"]) => {
    switch (status) {
      case "available": return "bg-success";
      case "busy": return "bg-warning";
      case "offline": return "bg-muted-foreground";
    }
  };

  const getAvailabilityText = (status: Expert["availability"]) => {
    switch (status) {
      case "available": return "Available";
      case "busy": return "Busy";
      case "offline": return "Offline";
    }
  };

  const connectWithExpert = (expertId: string, type: "chat" | "call" | "video") => {
    const expert = experts.find(e => e.id === expertId);
    if (!expert) return;

    if (expert.availability === "offline") {
      toast.error("This expert is currently offline. Please try again later.");
      return;
    }

    const actionText = type === "chat" ? "Starting secure Haven chat" : 
                     type === "call" ? "Initiating voice call" : "Starting video session";
    
    toast.success(`${actionText} with ${expert.name}! 🔒`);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Expert Network</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with verified mental health professionals for personalized support and guidance
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex gap-4 flex-col md:flex-row">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by name or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Specialty" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map(specialty => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty === "all" ? "All Specialties" : specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>
                      {location === "all" ? "All Locations" : location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Found {filteredExperts.length} experts</span>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-success" />
                <span>All experts are verified and licensed</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Experts Grid */}
        <div className="grid gap-6">
          {filteredExperts.map((expert) => (
            <Card key={expert.id} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Expert Info */}
                  <div className="flex gap-4 flex-1">
                    <div className="relative">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-success text-white text-lg">
                          {expert.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {expert.verified && (
                        <div className="absolute -bottom-1 -right-1">
                          <CheckCircle className="h-5 w-5 text-success bg-background rounded-full" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg text-foreground">{expert.name}</h3>
                          <p className="text-muted-foreground">{expert.title}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-warning text-warning" />
                            <span className="font-medium text-foreground">{expert.rating}</span>
                            <span className="text-muted-foreground text-sm">({expert.reviewCount})</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <div className={`h-2 w-2 rounded-full ${getAvailabilityColor(expert.availability)}`} />
                            <span className="text-xs text-muted-foreground">{getAvailabilityText(expert.availability)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {expert.specialties.map((specialty, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{expert.description}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {expert.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {expert.responseTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          ${expert.price}/session
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Languages:</span>
                        {expert.languages.map((lang, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3 lg:w-48">
                    <Button 
                      onClick={() => connectWithExpert(expert.id, "chat")}
                      className="w-full"
                      disabled={expert.availability === "offline"}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Haven Chat
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={() => connectWithExpert(expert.id, "call")}
                      className="w-full"
                      disabled={expert.availability === "offline"}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Voice Call
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={() => connectWithExpert(expert.id, "video")}
                      className="w-full"
                      disabled={expert.availability === "offline"}
                    >
                      <Video className="h-4 w-4 mr-2" />
                      Video Session
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      className="w-full text-xs"
                    >
                      <Calendar className="h-3 w-3 mr-1" />
                      Schedule Later
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredExperts.length === 0 && (
          <div className="text-center py-12">
            <div className="space-y-4">
              <div className="text-4xl">🔍</div>
              <h3 className="text-lg font-semibold text-foreground">No experts found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or browse all available experts
              </p>
              <Button onClick={() => {
                setSearchQuery("");
                setSelectedSpecialty("all");
                setSelectedLocation("all");
              }}>
                Clear Filters
              </Button>
            </div>
          </div>
        )}

        {/* Info Card */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6 text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-primary">
              <Shield className="h-5 w-5" />
              <span className="font-semibold">Secure & Private</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              All conversations with experts are conducted through our secure Haven platform with end-to-end encryption. 
              Your privacy and safety are our top priorities.
            </p>
            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <span>✓ Licensed Professionals</span>
              <span>✓ Encrypted Communications</span>
              <span>✓ 24/7 Crisis Support</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExpertsPage;