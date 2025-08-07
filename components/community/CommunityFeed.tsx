"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import PostCard from "./PostCard"
import CreatePost from "./CreatePost"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Clock, Heart } from "lucide-react"

export interface Author {
  id: string
  name: string
  avatar: string
  verified?: boolean
  bio: string
  joinedDate: string
  coverPhotoUrl: string
  stats: {
    posts: number
    followers: number
    following: number
  }
}

export interface Post {
  id: string
  author: Author
  content: string
  images?: string[]
  video?: string
  audio?: string
  createdAt: string
  likes: number
  comments: number
  shares: number
  isLiked: boolean
  category: "pesca" | "caza" | "aventura" | "equipo"
  location: string
}

export const mockPosts: Post[] = [
  {
    id: "1",
    author: {
      id: "1",
      name: "Martín Rodríguez",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      verified: true,
      bio: "Apasionado de la pesca deportiva de dorados en los ríos de Uruguay. Siempre en busca de la próxima gran captura.",
      joinedDate: "2023-05-12",
      coverPhotoUrl: "https://media.infobae.com/new-resizer/zL-a55z1Y7b-Dx2Bq4tY2b-qX8Y=/1200x900/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/C2Q6F2Z3Z5F3Z7Y5Z6X3Z2Z6YI.jpg",
      stats: { posts: 28, followers: 1200, following: 150 },
    },
    content:
      "¡Tremenda captura de Dorado en el Río Negro! La pelea fue increíble. Usando señuelos de superficie al atardecer, no fallan. El equipo que compré aquí se portó de maravilla. ¡Pura adrenalina! 🎣",
    images: ["https://media.infobae.com/new-resizer/uGg032yLgSwxM0f2a-YSJ0aHj4c=/1200x900/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/M4M2PIWLJNC3XML4LSS4BMN3PM.jpg"],
    createdAt: "2024-07-28T10:30:00Z",
    likes: 128,
    comments: 23,
    shares: 15,
    isLiked: false,
    category: "pesca",
    location: "Río Negro, Uruguay",
  },
  {
    id: "2",
    author: {
      id: "2",
      name: "Lucía Fernández",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      verified: false,
      bio: "Amante de la tranquilidad y la pesca de pejerrey. Cada fin de semana es una nueva oportunidad para conectar con la naturaleza.",
      joinedDate: "2022-11-20",
      coverPhotoUrl: "https://www.gub.uy/secretaria-nacional-deporte/sites/secretaria-nacional-deporte/files/imagenes/noticias/laguna_del_sauce_0.jpg",
      stats: { posts: 45, followers: 850, following: 210 },
    },
    content:
      "Una paz increíble pescando pejerrey en la Laguna del Sauce. El agua estaba como un espejo. Ideal para desconectar y disfrutar de la naturaleza. Saqué varios de buen tamaño con la caña nueva. 🛶",
    images: [
        "https://www.gub.uy/secretaria-nacional-deporte/sites/secretaria-nacional-deporte/files/imagenes/noticias/laguna_del_sauce_0.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/e/e0/Laguna_del_Sauce%2C_Uruguay_3.jpg"
    ],
    createdAt: "2024-07-27T18:45:00Z",
    likes: 95,
    comments: 15,
    shares: 7,
    isLiked: true,
    category: "pesca",
    location: "Laguna del Sauce, Maldonado",
  },
  {
    id: "3",
    author: {
      id: "3",
      name: "Javier Costa",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
      verified: false,
      bio: "Explorador de arroyos y cañadas en busca de tarariras. La aventura es mi motor.",
      joinedDate: "2024-01-05",
      coverPhotoUrl: "https://i.ytimg.com/vi/qfQY-P5vbm0/maxresdefault.jpg",
      stats: { posts: 15, followers: 450, following: 80 },
    },
    content:
      "Explorando la desembocadura del arroyo Pando. Un lugar con mucha vida y desafíos. No hubo capturas gigantes, pero la variedad de tarariras fue impresionante. ¡Volveré por la revancha!",
    images: ["https://i.ytimg.com/vi/qfQY-P5vbm0/maxresdefault.jpg"],
    createdAt: "2024-07-26T09:20:00Z",
    likes: 78,
    comments: 11,
    shares: 5,
    isLiked: false,
    category: "aventura",
    location: "Arroyo Pando, Canelones",
  },
]

export default function CommunityFeed() {
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [activeTab, setActiveTab] = useState("recientes")
  const [loading, setLoading] = useState(false)

  const handleLike = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
  }

  const handleNewPost = (newPost: Omit<Post, "id" | "createdAt" | "likes" | "comments" | "shares" | "isLiked" | "location">) => {
    const post: Post = {
      ...newPost,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      location: "Uruguay"
    }
    setPosts((prevPosts) => [post, ...prevPosts])
  }

  const sortedPosts = [...posts].sort((a, b) => {
    switch (activeTab) {
      case "populares":
        return b.likes - a.likes
      case "tendencia":
        return b.likes + b.comments + b.shares - (a.likes + a.comments + a.shares)
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  return (
    <div className="space-y-6">
      <CreatePost onSubmit={handleNewPost} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-black/30 backdrop-blur-sm text-white border-white/20">
          <TabsTrigger value="recientes" className="flex items-center space-x-2 data-[state=active]:bg-white/20 data-[state=active]:text-white">
            <Clock className="h-4 w-4" />
            <span>Recientes</span>
          </TabsTrigger>
          <TabsTrigger value="populares" className="flex items-center space-x-2 data-[state=active]:bg-white/20 data-[state=active]:text-white">
            <Heart className="h-4 w-4" />
            <span>Populares</span>
          </TabsTrigger>
          <TabsTrigger value="tendencia" className="flex items-center space-x-2 data-[state=active]:bg-white/20 data-[state=active]:text-white">
            <TrendingUp className="h-4 w-4" />
            <span>Tendencia</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <AnimatePresence>
            <div className="space-y-6">
              {sortedPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <PostCard post={post} onLike={handleLike} />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>

          {!loading && (
            <div className="flex justify-center mt-8">
              <Button variant="outline" onClick={() => setLoading(true)} disabled={loading} className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                {loading ? "Cargando..." : "Cargar más publicaciones"}
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}