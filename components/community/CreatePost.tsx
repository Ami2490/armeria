"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Camera, Video, Mic, MapPin, Smile } from "lucide-react"

interface CreatePostProps {
  onSubmit: (post: any) => void
}

export default function CreatePost({ onSubmit }: CreatePostProps) {
  const [content, setContent] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = [
    { id: "pesca", label: "Pesca", color: "bg-blue-500" },
    { id: "caza", label: "Caza", color: "bg-green-500" },
    { id: "aventura", label: "Aventura", color: "bg-orange-500" },
    { id: "equipo", label: "Equipo", color: "bg-purple-500" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || !selectedCategory) return

    setIsSubmitting(true)

    const newPost = {
      author: {
        id: "current-user",
        name: "Usuario Demo",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: content.trim(),
      category: selectedCategory as "pesca" | "caza" | "aventura" | "equipo",
    }

    onSubmit(newPost)
    setContent("")
    setSelectedCategory("")
    setIsSubmitting(false)
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Avatar and Input */}
          <div className="flex space-x-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>UD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="¿Qué aventura quieres compartir hoy?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[100px] resize-none border-none shadow-none focus-visible:ring-0 text-lg placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Categoría:</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={`cursor-pointer ${
                    selectedCategory === category.id
                      ? `${category.color} text-white`
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedCategory(selectedCategory === category.id ? "" : category.id)}
                >
                  {category.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Media Options */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <Button type="button" variant="ghost" size="sm" className="text-gray-600 hover:text-green-600">
                <Camera className="h-4 w-4 mr-2" />
                Foto
              </Button>
              <Button type="button" variant="ghost" size="sm" className="text-gray-600 hover:text-green-600">
                <Video className="h-4 w-4 mr-2" />
                Video
              </Button>
              <Button type="button" variant="ghost" size="sm" className="text-gray-600 hover:text-green-600">
                <Mic className="h-4 w-4 mr-2" />
                Audio
              </Button>
              <Button type="button" variant="ghost" size="sm" className="text-gray-600 hover:text-green-600">
                <MapPin className="h-4 w-4 mr-2" />
                Ubicación
              </Button>
              <Button type="button" variant="ghost" size="sm" className="text-gray-600 hover:text-green-600">
                <Smile className="h-4 w-4 mr-2" />
                Emoji
              </Button>
            </div>

            <Button
              type="submit"
              disabled={!content.trim() || !selectedCategory || isSubmitting}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? "Publicando..." : "Publicar"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}