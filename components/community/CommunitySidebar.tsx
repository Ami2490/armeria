"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Calendar, Award } from "lucide-react"
import Link from "next/link"

export default function CommunitySidebar() {
  const trendingTopics = [
    { tag: "#truchas", posts: 45 },
    { tag: "#cazamayor", posts: 32 },
    { tag: "#señuelos", posts: 28 },
    { tag: "#montaña", posts: 24 },
    { tag: "#nocturna", posts: 19 },
  ]

  const topMembers = [
    {
      id: "1",
      name: "Carlos M.",
      avatar: "/placeholder.svg?height=32&width=32",
      posts: 156,
      badge: "Experto",
    },
    {
      id: "2",
      name: "Ana G.",
      avatar: "/placeholder.svg?height=32&width=32",
      posts: 134,
      badge: "Veterana",
    },
    {
      id: "3",
      name: "Miguel T.",
      avatar: "/placeholder.svg?height=32&width=32",
      posts: 98,
      badge: "Aventurero",
    },
  ]

  const upcomingEvents = [
    {
      id: "1",
      title: "Concurso de Pesca",
      date: "15 Feb",
      participants: 23,
    },
    {
      id: "2",
      title: "Salida Grupal - Caza",
      date: "22 Feb",
      participants: 12,
    },
  ]

  return (
    <div className="space-y-6">
      {/* User Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Tu Perfil</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>UD</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Usuario Demo</p>
              <p className="text-sm text-gray-600">Miembro desde 2023</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-green-600">12</div>
              <div className="text-xs text-gray-600">Posts</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600">45</div>
              <div className="text-xs text-gray-600">Likes</div>
            </div>
          </div>
          <Link href="/perfil/1" className="w-full">
             <Button className="w-full" size="sm">
              Ver Perfil
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Trending Topics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Tendencias</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-600 cursor-pointer hover:underline">{topic.tag}</span>
              <Badge variant="secondary" className="text-xs">
                {topic.posts}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top Members */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center space-x-2">
            <Award className="h-4 w-4" />
            <span>Miembros Destacados</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {topMembers.map((member, index) => (
            <div key={member.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-gray-400">#{index + 1}</span>
                <Avatar className="h-6 w-6">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{member.name}</p>
                  <Badge variant="outline" className="text-xs">
                    {member.badge}
                  </Badge>
                </div>
              </div>
              <span className="text-xs text-gray-600">{member.posts} posts</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Próximos Eventos</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-sm">{event.title}</h4>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-600">{event.date}</span>
                <Badge variant="secondary" className="text-xs">
                  {event.participants} participantes
                </Badge>
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full bg-transparent">
            Ver todos los eventos
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}