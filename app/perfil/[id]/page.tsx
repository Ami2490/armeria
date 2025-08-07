"use client"

import { useParams } from "next/navigation"
import { mockPosts, type Post } from "@/components/community/CommunityFeed"
import ProfileHeader from "@/components/profile/ProfileHeader"
import ProfileTabs from "@/components/profile/ProfileTabs"
import PostCard from "@/components/community/PostCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserX } from "lucide-react"

export default function ProfilePage() {
  const params = useParams()
  const userId = params.id

  const allAuthors = mockPosts.map(p => p.author)
  const user = allAuthors.find(author => author.id === userId)
  const userPosts = mockPosts.filter(post => post.author.id === userId)
  
  if (!user) {
    return (
       <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-16">
        <Card className="w-full max-w-md text-center">
            <CardHeader>
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <UserX className="w-8 h-8 text-red-600" />
                </div>
                <CardTitle>Usuario no encontrado</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-600">
                    El perfil que estás buscando no existe o ha sido eliminado.
                </p>
            </CardContent>
        </Card>
       </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileHeader user={user} />
        
        <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            {/* Left sidebar with user info, photos, friends etc. */}
            <div className="sticky top-24 space-y-6">
                <Card>
                    <CardHeader><CardTitle className="text-lg">Información</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-700">{user.bio}</p>
                        <p className="text-sm text-gray-500 mt-2">Se unió en {new Date(user.joinedDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })}</p>
                    </CardContent>
                </Card>
            </div>
          </div>

          <div className="lg:col-span-8 mt-8 lg:mt-0">
            <ProfileTabs />
            <div className="mt-6 space-y-6">
              {userPosts.map(post => (
                <PostCard key={post.id} post={post} onLike={() => {}} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
