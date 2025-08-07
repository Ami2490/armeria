"use client"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp, MessageCircle, Camera } from "lucide-react"

export default function CommunityHeader() {
  const stats = [
    { icon: Users, label: "Miembros", value: "2,847" },
    { icon: MessageCircle, label: "Posts hoy", value: "23" },
    { icon: TrendingUp, label: "Activos", value: "156" },
    { icon: Camera, label: "Fotos", value: "1,234" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Explora los Pesqueros de Uruguay</h1>
        <p className="text-lg text-gray-200 max-w-2xl mx-auto">
          Comparte tus experiencias, conecta con otros aventureros y descubre los mejores lugares de nuestro país.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="glass-card rounded-lg p-4 text-center">
            <stat.icon className="h-8 w-8 mx-auto mb-2 text-green-400" />
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-gray-300">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}