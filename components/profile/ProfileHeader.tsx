"use client"

import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, MessageSquare, UserPlus } from "lucide-react"
import type { Author } from "../community/CommunityFeed"

interface ProfileHeaderProps {
  user: Author
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Cover Photo */}
      <div className="relative h-48 md:h-64">
        <Image
          src={user.coverPhotoUrl || "/placeholder.svg"}
          alt={`${user.name}'s cover photo`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Profile Info */}
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-end -mt-16 sm:-mt-20 space-y-4 sm:space-y-0 sm:space-x-6">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-white">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {user.verified && (
              <div className="absolute bottom-1 right-1 bg-white rounded-full p-0.5">
                 <CheckCircle className="h-6 w-6 text-blue-500 fill-white" />
              </div>
            )}
          </div>

          {/* Name, Stats, and Actions */}
          <div className="flex-1 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                <span><strong>{user.stats.posts}</strong> publicaciones</span>
                <span><strong>{user.stats.followers}</strong> seguidores</span>
                <span><strong>{user.stats.following}</strong> siguiendo</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <UserPlus className="h-4 w-4 mr-2" />
                Seguir
              </Button>
              <Button variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Mensaje
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
