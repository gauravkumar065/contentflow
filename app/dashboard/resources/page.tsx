"use client";
import { useState } from "react";
import {
  Copy,
  Check,
  Link,
  Hash,
  ShoppingBag,
  Users,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data for resources
const resources = [
  {
    id: 1,
    title: "Brand Collaboration",
    description: "Exciting partnership opportunity with a leading brand.",
    type: "BRAND_LINK",
    links: ["https://brand.com/collab1", "https://brand.com/collab2"],
  },
  {
    id: 2,
    title: "Merchant Spotlight",
    description: "Featured products from our top merchants.",
    type: "MERCHANT",
    links: ["https://merchant1.com", "https://merchant2.com"],
  },
  {
    id: 3,
    title: "Referral Program",
    description: "Earn rewards by referring friends to our platform.",
    type: "REFERRAL_LINK",
    links: ["https://refer.com/program1", "https://refer.com/program2"],
  },
  {
    id: 4,
    title: "Social Media Campaign",
    description:
      "Join our latest social media challenge and increase engagement.",
    type: "SOCIAL_MEDIA",
    links: ["https://instagram.com/campaign", "https://twitter.com/campaign"],
  },
  {
    id: 5,
    title: "Trending Hashtags",
    description: "Boost your content visibility with these popular hashtags.",
    type: "Hashtags",
    links: ["#TrendingNow", "#ViralContent", "#InstaFamous"],
  },
];

const getIconForType = (type) => {
  switch (type) {
    case "BRAND_LINK":
      return <Link className="h-4 w-4" />;
    case "MERCHANT":
      return <ShoppingBag className="h-4 w-4" />;
    case "REFERRAL_LINK":
      return <Users className="h-4 w-4" />;
    case "SOCIAL_MEDIA":
      return <Share2 className="h-4 w-4" />;
    case "Hashtags":
      return <Hash className="h-4 w-4" />;
    default:
      return <Link className="h-4 w-4" />;
  }
};

export default function Component() {
  const [copiedStates, setCopiedStates] = useState({});

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedStates({ ...copiedStates, [id]: true });
    setTimeout(() => {
      setCopiedStates({ ...copiedStates, [id]: false });
    }, 2000);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Resource Page</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <Card key={resource.id} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <CardTitle className="text-xl">{resource.title}</CardTitle>
                <Badge variant="secondary" className="flex items-center gap-1">
                  {getIconForType(resource.type)}
                  {resource.type}
                </Badge>
              </div>
              <CardDescription>{resource.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {resource.links.map((link, index) => (
                  <div
                    key={index}
                    className="bg-muted flex items-center justify-between rounded-md p-2"
                  >
                    <span className="mr-2 flex-1 truncate text-sm">{link}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        handleCopy(link, `${resource.id}-${index}`)
                      }
                    >
                      {copiedStates[`${resource.id}-${index}`] ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
