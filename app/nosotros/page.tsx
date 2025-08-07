"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Award, Shield, Users, Heart } from "lucide-react"

const Page = () => {
  const values = [
    {
      icon: <Award className="h-8 w-8 text-green-500" />,
      title: "Calidad",
      description: "Seleccionamos solo los mejores productos, probados en el campo.",
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      title: "Confianza",
      description: "Más de 20 años de experiencia nos respaldan.",
    },
    {
      icon: <Users className="h-8 w-8 text-orange-500" />,
      title: "Comunidad",
      description: "Fomentamos un espacio para compartir y aprender juntos.",
    },
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Pasión",
      description: "Vivimos y respiramos la caza y la pesca, igual que tú.",
    },
  ]

  const team = [
    {
      name: "Alejandro Caraballo",
      role: "Fundador y Experto en Caza",
      image: "https://t4.ftcdn.net/jpg/02/42/59/73/360_F_242597342_UG5N1BeeBRmFYVoNFh1er5JXY7iSh5A1.jpg",
    },
    {
      name: "Sofía Martín",
      role: "Especialista en Pesca",
      image: "https://www.peixacasa.cat/wp-content/uploads/2022/08/metodos-de-pesca.jpg",
    },
    {
      name: "Carlos Vega",
      role: "Atención al Cliente",
      image: "https://static7.depositphotos.com/1033002/732/i/450/depositphotos_7322826-stock-photo-hunter.jpg",
    },
  ]

  return (
    <div className="bg-white pt-16">
      {/* Hero Section */}
      <div className="relative h-96">
        <Image
          src="https://wallpapers.com/images/hd/silhouette-sunset-elk-hunting-a3uul6wt8f7lyilx.jpg"
          alt="Equipo de caza y pesca"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl font-bold">Sobre Nosotros</h1>
            <p className="mt-4 text-xl max-w-2xl">
              Nuestra pasión es tu aventura. Conoce la historia detrás de Alejandro Caraballo.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Our Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900">Nuestra Historia</h2>
            <p className="mt-4 text-gray-600">
              Lo que comenzó como una pasión personal por la naturaleza y la aventura, se ha convertido en un referente
              para cazadores y pescadores de toda la región. Fundada hace más de 20 años por Alejandro Caraballo,
              nuestra tienda nació del deseo de compartir no solo los mejores equipos, sino también el conocimiento y la
              experiencia acumulada a lo largo de décadas.
            </p>
            <p className="mt-4 text-gray-600">
              Cada producto que ofrecemos ha sido seleccionado y probado por nuestro equipo de expertos para garantizar
              que cumple con los más altos estándares de calidad y rendimiento. Creemos que el equipo adecuado puede
              marcar la diferencia entre una buena jornada y una experiencia inolvidable.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="h-80 relative rounded-lg overflow-hidden"
          >
            <Image
              src="https://t3.ftcdn.net/jpg/05/69/33/46/360_F_569334698_OcKueBgAwnNahl4vVNcjhz5JhBx36E32.jpg"
              alt="Fundador en la naturaleza"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Our Values */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Nuestros Valores</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Estos son los pilares que guían cada una de nuestras decisiones y acciones.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-lg shadow-md"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold">{value.title}</h3>
                <p className="mt-2 text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Nuestro Equipo</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Conoce a las personas que hacen posible tu próxima gran aventura.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative h-64 w-full mx-auto rounded-lg overflow-hidden shadow-lg">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-green-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
