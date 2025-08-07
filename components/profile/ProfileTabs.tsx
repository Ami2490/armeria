"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("posts")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4 bg-white border">
        <TabsTrigger value="posts">Publicaciones</TabsTrigger>
        <TabsTrigger value="about">Información</TabsTrigger>
        <TabsTrigger value="photos">Fotos</TabsTrigger>
        <TabsTrigger value="friends">Amigos</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
