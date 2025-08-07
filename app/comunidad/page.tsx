"use client"
import { Suspense, useRef, useEffect, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import CommunityFeed from "@/components/community/CommunityFeed"
import CommunityHeader from "@/components/community/CommunityHeader"
import CommunitySidebar from "@/components/community/CommunitySidebar"
import LoadingSpinner from "@/components/ui/LoadingSpinner"

export default function ComunidadPage() {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  })

  // Lista de paisajes uruguayos
  const uruguayanLandscapes = [
    "https://media.infobae.com/new-resizer/uGg032yLgSwxM0f2a-YSJ0aHj4c=/1200x900/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/M4M2PIWLJNC3XML4LSS4BMN3PM.jpg",
    "https://www.gub.uy/secretaria-nacional-deporte/sites/secretaria-nacional-deporte/files/imagenes/noticias/laguna_del_sauce_0.jpg",
    "https://i.ytimg.com/vi/qfQY-P5vbm0/maxresdefault.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/2/22/Represa_de_Palmar_sobre_el_R%C3%ADo_Negro.jpg"
  ]
  
  // Crear transformaciones de opacidad para cada imagen
  const imageOpacities = uruguayanLandscapes.map((_, i) => {
    const start = i / uruguayanLandscapes.length
    const end = (i + 1) / uruguayanLandscapes.length
    return useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0])
  })

  return (
    <div ref={targetRef} className="relative bg-black text-white pt-16">
      {/* Fondos Parallax */}
      <div className="fixed top-0 left-0 w-full h-full">
        {uruguayanLandscapes.map((src, i) => (
          <motion.div key={src} style={{ opacity: imageOpacities[i] }} className="absolute inset-0">
            <Image
              src={src}
              alt={`Paisaje de pesca en Uruguay ${i + 1}`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <CommunityHeader />

          <div className="flex flex-col lg:flex-row gap-8 mt-8">
            <aside className="lg:w-80 flex-shrink-0">
              <CommunitySidebar />
            </aside>

            <main className="flex-1">
              <Suspense fallback={<LoadingSpinner />}>
                <CommunityFeed />
              </Suspense>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}