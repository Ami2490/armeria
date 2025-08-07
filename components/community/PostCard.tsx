"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, MoreHorizontal, Play, Volume2, MapPin } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import type { Post } from "./CommunityFeed"

interface PostCardProps {
  post: Post
  onLike: (postId: string) => void
}

export default function PostCard({ post, onLike }: PostCardProps) {
  const [showComments, setShowComments] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const categoryColors = {
    pesca: "bg-blue-500",
    caza: "bg-green-500",
    aventura: "bg-orange-500",
    equipo: "bg-purple-500",
  }

  const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
    locale: es,
  })

  return (
    <Card className="glass-card overflow-hidden transition-shadow duration-200 text-white">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Link href={`/perfil/${post.author.id}`}>
              <Avatar>
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <div className="flex items-center space-x-2">
                <Link href={`/perfil/${post.author.id}`} className="hover:underline">
                  <h3 className="font-semibold">{post.author.name}</h3>
                </Link>
                {post.author.verified && (
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-300">{timeAgo}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Location & Category */}
        <div className="flex items-center space-x-4 mb-4">
          <Badge className="bg-white/10 text-white border-none">
            <MapPin className="h-3 w-3 mr-1" />
            {post.location}
          </Badge>
          <Badge className={`${categoryColors[post.category]} text-white text-xs`}>{post.category}</Badge>
        </div>


        {/* Content */}
        <div className="mb-4">
          <p className="whitespace-pre-wrap text-gray-100">{post.content}</p>
        </div>

        {/* Media */}
        {post.images && post.images.length > 0 && (
          <div
            className={`mb-4 grid gap-2 ${
              post.images.length === 1 ? "grid-cols-1" : post.images.length === 2 ? "grid-cols-2" : "grid-cols-2"
            }`}
          >
            {post.images.map((image, index) => (
              <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Post image ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-200"
                />
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center pt-4 border-t border-white/20">
          <div className="flex space-x-4">
            <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-300 hover:text-white" onClick={() => onLike(post.id)}>
              <Heart className={`h-4 w-4 ${post.isLiked ? 'text-red-500 fill-current' : ''}`} />
              <span>{post.likes}</span>
            </Button>
             <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-300 hover:text-white" onClick={() => setShowComments(!showComments)}>
              <MessageCircle className="h-4 w-4" />
              <span>{post.comments}</span>
            </Button>
             <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-300 hover:text-white">
              <Share2 className="h-4 w-4" />
              <span>{post.shares}</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}