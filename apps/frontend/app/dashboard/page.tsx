"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Activity,
  Plus,
  Globe,
  Clock,
  AlertCircle,
  CheckCircle,
  MoreHorizontal,
  Settings,
  Bell,
  User,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Website {
  id: string
  name: string
  url: string
  status: "up" | "down"
  responseTime: number
  uptime: number
  lastChecked: string
  checkInterval: string
}

export default function Dashboard() {
  const [websites, setWebsites] = useState<Website[]>([
    {
      id: "1",
      name: "My Portfolio",
      url: "https://myportfolio.com",
      status: "up",
      responseTime: 245,
      uptime: 99.9,
      lastChecked: "2 minutes ago",
      checkInterval: "1 minute",
    },
    {
      id: "2",
      name: "E-commerce Store",
      url: "https://mystore.com",
      status: "down",
      responseTime: 0,
      uptime: 98.2,
      lastChecked: "5 minutes ago",
      checkInterval: "1 minute",
    },
    {
      id: "3",
      name: "Blog Website",
      url: "https://myblog.com",
      status: "up",
      responseTime: 180,
      uptime: 99.8,
      lastChecked: "1 minute ago",
      checkInterval: "5 minutes",
    },
  ])

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newWebsite, setNewWebsite] = useState({
    name: "",
    url: "",
    checkInterval: "1",
  })

  const handleAddWebsite = () => {
    if (newWebsite.name && newWebsite.url) {
      const website: Website = {
        id: Date.now().toString(),
        name: newWebsite.name,
        url: newWebsite.url,
        status: "up",
        responseTime: Math.floor(Math.random() * 500) + 100,
        uptime: 100,
        lastChecked: "Just now",
        checkInterval: `${newWebsite.checkInterval} minute${newWebsite.checkInterval !== "1" ? "s" : ""}`,
      }
      setWebsites([...websites, website])
      setNewWebsite({ name: "", url: "", checkInterval: "1" })
      setIsAddModalOpen(false)
    }
  }

  const upWebsites = websites.filter((w) => w.status === "up").length
  const downWebsites = websites.filter((w) => w.status === "down").length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">UptimeGuard</h1>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Monitors</p>
                  <p className="text-2xl font-bold text-gray-900">{websites.length}</p>
                </div>
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Up</p>
                  <p className="text-2xl font-bold text-green-600">{upWebsites}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Down</p>
                  <p className="text-2xl font-bold text-red-600">{downWebsites}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Response</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(websites.reduce((acc, w) => acc + w.responseTime, 0) / websites.length)}ms
                  </p>
                </div>
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monitors Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Monitors</h2>

          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Monitor
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Monitor</DialogTitle>
                <DialogDescription>Add a new website to monitor its uptime and performance.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Website Name</Label>
                  <Input
                    id="name"
                    placeholder="My Website"
                    value={newWebsite.name}
                    onChange={(e) => setNewWebsite({ ...newWebsite, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="url">Website URL</Label>
                  <Input
                    id="url"
                    placeholder="https://example.com"
                    value={newWebsite.url}
                    onChange={(e) => setNewWebsite({ ...newWebsite, url: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="interval">Check Interval</Label>
                  <Select
                    value={newWebsite.checkInterval}
                    onValueChange={(value) => setNewWebsite({ ...newWebsite, checkInterval: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select interval" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 minute</SelectItem>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="10">10 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddWebsite} className="bg-blue-600 hover:bg-blue-700">
                  Add Monitor
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Monitors List */}
        <div className="space-y-4">
          {websites.map((website) => (
            <Card key={website.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-3 h-3 rounded-full ${website.status === "up" ? "bg-green-500" : "bg-red-500"}`}
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{website.name}</h3>
                      <p className="text-sm text-gray-500">{website.url}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-600">Status</p>
                      <Badge
                        variant={website.status === "up" ? "default" : "destructive"}
                        className={website.status === "up" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                      >
                        {website.status === "up" ? "Up" : "Down"}
                      </Badge>
                    </div>

                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-600">Response Time</p>
                      <p className="text-sm text-gray-900">
                        {website.status === "up" ? `${website.responseTime}ms` : "N/A"}
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-600">Uptime</p>
                      <p className="text-sm text-gray-900">{website.uptime}%</p>
                    </div>

                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-600">Last Checked</p>
                      <p className="text-sm text-gray-900">{website.lastChecked}</p>
                    </div>

                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-600">Interval</p>
                      <p className="text-sm text-gray-900">{website.checkInterval}</p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Monitor</DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Pause Monitoring</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete Monitor</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {websites.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No monitors yet</h3>
              <p className="text-gray-500 mb-4">Get started by adding your first website to monitor.</p>
              <Button onClick={() => setIsAddModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Monitor
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
