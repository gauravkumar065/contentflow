"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Edit3,
  Upload,
  Video,
  FileText,
  Download,
  Folder,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export function VideoProductionModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] max-w-4xl flex-col overflow-hidden">
        <DialogHeader className="flex flex-row items-center justify-between space-x-4 space-y-0">
          <div className="flex items-center gap-3">
            <DialogTitle className="text-xl font-semibold">
              Brand Campaign Video Production
            </DialogTitle>
            <Badge
              variant="outline"
              className="border-[#FEF3C7] bg-[#FEF3C7] text-[#92400E]"
            >
              In Progress
            </Badge>
          </div>
          <Button variant="ghost" className="text-gray-500">
            <span className="sr-only">Close</span>×
          </Button>
        </DialogHeader>

        <Tabs
          defaultValue="overview"
          className="flex w-full flex-grow flex-col overflow-hidden"
        >
          <TabsList className="h-12 w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="overview"
              className="rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-[#8B5CF6] data-[state=active]:text-[#8B5CF6]"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="details"
              className="rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-[#8B5CF6]"
            >
              Details
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-[#8B5CF6]"
            >
              History
            </TabsTrigger>
          </TabsList>
          <div className="flex-grow overflow-y-auto">
            <TabsContent
              value="overview"
              className="flex flex-col gap-8 pt-6 md:flex-row"
            >
              <div className="flex-1 space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Project Description
                  </h3>
                  <p className="mt-2 text-sm text-gray-700">
                    Create a compelling brand campaign video showcasing our new
                    product line for Q4 2024. Focus on innovative features and
                    customer benefits.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Progress Timeline
                  </h3>
                  <div className="relative mt-4">
                    <div className="absolute left-0 top-5 h-0.5 w-full bg-gray-200">
                      <div className="absolute left-0 h-full w-[60%] bg-[#8B5CF6]" />
                    </div>
                    <div className="relative flex flex-col justify-between sm:flex-row">
                      <div className="mb-4 flex flex-row items-center sm:mb-0 sm:flex-col">
                        <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#8B5CF6] sm:mr-0">
                          <Check className="h-5 w-5 text-white" />
                        </div>
                        <div className="text-center sm:mt-2">
                          <span className="text-sm font-medium">Scripting</span>
                          <span className="block text-xs text-gray-500">
                            Completed
                          </span>
                        </div>
                      </div>
                      <div className="mb-4 flex flex-row items-center sm:mb-0 sm:flex-col">
                        <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#8B5CF6] sm:mr-0">
                          <Check className="h-5 w-5 text-white" />
                        </div>
                        <div className="text-center sm:mt-2">
                          <span className="text-sm font-medium">Shooting</span>
                          <span className="block text-xs text-gray-500">
                            Completed
                          </span>
                        </div>
                      </div>
                      <div className="mb-4 flex flex-row items-center sm:mb-0 sm:flex-col">
                        <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#F59E0B] sm:mr-0">
                          <Edit3 className="h-5 w-5 text-white" />
                        </div>
                        <div className="text-center sm:mt-2">
                          <span className="text-sm font-medium">Editing</span>
                          <span className="block text-xs text-gray-500">
                            In Progress
                          </span>
                        </div>
                      </div>
                      <div className="mb-4 flex flex-row items-center sm:mb-0 sm:flex-col">
                        <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 sm:mr-0">
                          <Upload className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="text-center sm:mt-2">
                          <span className="text-sm font-medium">
                            Publishing
                          </span>
                          <span className="block text-xs text-gray-500">
                            Not Started
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <Edit3 className="h-5 w-5 text-[#8B5CF6]" />
                      <h4 className="font-medium">Scripting</h4>
                      <Badge
                        variant="outline"
                        className="ml-auto border-[#DCFCE7] bg-[#DCFCE7] text-[#166534]"
                      >
                        Completed
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      Final script approved by creative director. Ready for
                      production.
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>SJ</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-[#8B5CF6]">
                        Sarah Johnson
                      </span>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <Video className="h-5 w-5 text-[#8B5CF6]" />
                      <h4 className="font-medium">Shooting</h4>
                      <Badge
                        variant="outline"
                        className="ml-auto border-[#DCFCE7] bg-[#DCFCE7] text-[#166534]"
                      >
                        Completed
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      All scenes captured. B-roll footage also available.
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>MC</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-[#8B5CF6]">Mike Chen</span>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <Edit3 className="h-5 w-5 text-[#8B5CF6]" />
                      <h4 className="font-medium">Editing</h4>
                      <Badge
                        variant="outline"
                        className="ml-auto border-[#FEF3C7] bg-[#FEF3C7] text-[#92400E]"
                      >
                        In Progress
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      First cut in review. Sound mixing pending.
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>EW</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-[#8B5CF6]">
                        Emma Wilson
                      </span>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <Upload className="h-5 w-5 text-[#8B5CF6]" />
                      <h4 className="font-medium">Publishing</h4>
                      <Badge
                        variant="outline"
                        className="ml-auto border-gray-100 bg-gray-100 text-gray-500"
                      >
                        Not Started
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      Ready for final review and publishing.
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>AT</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-[#8B5CF6]">
                        Alex Thompson
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 md:w-72">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Team Members
                  </h3>
                  <div className="mt-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>SJ</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">Sarah Johnson</p>
                          <p className="text-xs text-gray-500">
                            Creative Director
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        ⋯
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>MC</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">Mike Chen</p>
                          <p className="text-xs text-gray-500">Videographer</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        ⋯
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>EW</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">Emma Wilson</p>
                          <p className="text-xs text-gray-500">Video Editor</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        ⋯
                      </Button>
                    </div>
                  </div>

                  <Button variant="outline" className="mt-3 w-full">
                    + Add Team Member
                  </Button>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Recent Comments
                  </h3>
                  <div className="mt-3 space-y-4">
                    <div className="flex gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>EW</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">Emma Wilson</p>
                          <span className="text-xs text-gray-500">2h ago</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          First cut is ready for review. Please check the
                          transitions between scenes 3 and 4.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>SJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">Sarah Johnson</p>
                          <span className="text-xs text-gray-500">5h ago</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Looking forward to seeing the first cut. Make sure to
                          include the product close-ups we discussed.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="pt-6">
              <div className="space-y-8">
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Start Date
                      </h3>
                      <p className="mt-1 text-lg font-semibold">Oct 15, 2023</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Budget
                      </h3>
                      <p className="mt-1 text-lg font-semibold">$25,000</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Due Date
                      </h3>
                      <p className="mt-1 text-lg font-semibold">Dec 20, 2023</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Status
                      </h3>
                      <Badge
                        variant="outline"
                        className="mt-1 border-[#FEF3C7] bg-[#FEF3C7] text-[#92400E]"
                      >
                        In Progress
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold">Deliverables</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Checkbox checked={true} />
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Main Campaign Video (2:30)
                      </label>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Checkbox checked={true} />
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        30-second Cut
                      </label>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Checkbox checked={false} />
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        15-second Social Media Cuts
                      </label>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Checkbox checked={false} />
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Behind-the-Scenes Content
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold">
                    Files & Resources
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-red-500" />
                        <span className="text-sm font-medium">
                          Project_Brief.pdf
                        </span>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <span className="text-sm font-medium">
                          Script_Final.docx
                        </span>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        <Folder className="h-5 w-5 text-yellow-500" />
                        <span className="text-sm font-medium">Raw Footage</span>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="pt-6">
              <div className="space-y-8">
                <div>
                  <h3 className="mb-4 text-lg font-semibold">Activity Log</h3>
                  <div className="space-y-6">
                    <div className="relative border-l-2 border-[#8B5CF6] pl-6">
                      <div className="mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">Today</span>
                          <span className="text-sm text-gray-500">
                            10:30 AM
                          </span>
                        </div>
                        <p className="text-sm">
                          First cut review completed by Emma Wilson
                        </p>
                      </div>
                    </div>
                    <div className="relative border-l-2 border-gray-200 pl-6">
                      <div className="mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">Yesterday</span>
                          <span className="text-sm text-gray-500">3:45 PM</span>
                        </div>
                        <p className="text-sm">
                          Sound mixing started for main video
                        </p>
                      </div>
                    </div>
                    <div className="relative border-l-2 border-gray-200 pl-6">
                      <div className="mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">Oct 18</span>
                          <span className="text-sm text-gray-500">
                            11:15 AM
                          </span>
                        </div>
                        <p className="text-sm">
                          All shooting completed and footage uploaded
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold">
                    Project History
                  </h3>
                  <div className="space-y-8">
                    <div>
                      <h4 className="mb-4 text-sm font-medium text-gray-500">
                        October 2023
                      </h4>
                      <div className="space-y-6">
                        <div className="relative border-l-2 border-[#8B5CF6] pl-6">
                          <div className="mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">Oct 25</span>
                            </div>
                            <p className="font-medium">
                              First cut review completed
                            </p>
                            <p className="text-sm text-gray-500">
                              Reviewed by Emma Wilson
                            </p>
                          </div>
                        </div>
                        <div className="relative border-l-2 border-[#8B5CF6] pl-6">
                          <div className="mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">Oct 20</span>
                            </div>
                            <p className="font-medium">
                              Sound mixing completed
                            </p>
                            <p className="text-sm text-gray-500">
                              Audio team finalized main video sound
                            </p>
                          </div>
                        </div>
                        <div className="relative border-l-2 border-[#8B5CF6] pl-6">
                          <div className="mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">Oct 15</span>
                            </div>
                            <p className="font-medium">Project initiated</p>
                            <p className="text-sm text-gray-500">
                              Kickoff meeting with client
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-4 text-sm font-medium text-gray-500">
                        Pre-Production
                      </h4>
                      <div className="space-y-6">
                        <div className="relative border-l-2 border-gray-200 pl-6">
                          <div className="mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">Oct 10</span>
                            </div>
                            <p className="font-medium">Script approved</p>
                            <p className="text-sm text-gray-500">
                              Final script version confirmed by client
                            </p>
                          </div>
                        </div>
                        <div className="relative border-l-2 border-gray-200 pl-6">
                          <div className="mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">Oct 5</span>
                            </div>
                            <p className="font-medium">Location scouting</p>
                            <p className="text-sm text-gray-500">
                              Selected primary shooting locations
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <div className="mt-4 flex items-center gap-2 border-t pt-4">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex flex-grow items-center">
            <input
              type="text"
              placeholder="Add a comment..."
              className="flex-grow border-0 bg-transparent text-sm focus:outline-none focus:ring-0"
            />
            <Button className="ml-2 bg-[#8B5CF6] hover:bg-[#7C3AED]">
              Comment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
