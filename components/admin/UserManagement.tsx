"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search, Shield, User, Edit, Trash2, Ban, CheckCircle, X, Save, UserPlus, Download } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface UserData {
  id: string
  name: string
  email: string
  avatar: string
  role: "user" | "moderator" | "admin"
  status: "active" | "suspended" | "banned"
  posts: number
  comments: number
  likes: number
  joinDate: string
  lastActive: string
  phone?: string
  location?: string
  bio?: string
  verified: boolean
  coverPhotoUrl?: string
}

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showUserModal, setShowUserModal] = useState(false)
  const [editingUser, setEditingUser] = useState<UserData | null>(null)
  const [showBanModal, setShowBanModal] = useState<UserData | null>(null)
  const [banReason, setBanReason] = useState("")

  const [users, setUsers] = useState<UserData[]>([
    {
      id: "1",
      name: "Carlos Mendoza",
      email: "carlos@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "user",
      status: "active",
      posts: 45,
      comments: 123,
      likes: 234,
      joinDate: "2023-01-15",
      lastActive: "2024-01-20",
      phone: "+34 123 456 789",
      location: "Madrid, España",
      bio: "Apasionado de la pesca deportiva desde hace 15 años.",
      verified: true,
      coverPhotoUrl: "https://media.infobae.com/new-resizer/uGg032yLgSwxM0f2a-YSJ0aHj4c=/1200x900/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/M4M2PIWLJNC3XML4LSS4BMN3PM.jpg",
    },
    {
      id: "2",
      name: "Ana García",
      email: "ana@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "moderator",
      status: "active",
      posts: 32,
      comments: 89,
      likes: 156,
      joinDate: "2023-02-20",
      lastActive: "2024-01-19",
      phone: "+34 987 654 321",
      location: "Barcelona, España",
      bio: "Moderadora de la comunidad y experta en caza con arco.",
      verified: true,
      coverPhotoUrl: "https://www.gub.uy/secretaria-nacional-deporte/sites/secretaria-nacional-deporte/files/imagenes/noticias/laguna_del_sauce_0.jpg",
    },
    {
      id: "3",
      name: "Miguel Torres",
      email: "miguel@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "user",
      status: "suspended",
      posts: 12,
      comments: 34,
      likes: 67,
      joinDate: "2023-03-10",
      lastActive: "2024-01-15",
      phone: "+34 555 123 456",
      location: "Valencia, España",
      bio: "Nuevo en la comunidad, aprendiendo sobre pesca en agua salada.",
      verified: false,
      coverPhotoUrl: "https://i.ytimg.com/vi/qfQY-P5vbm0/maxresdefault.jpg",
    },
    {
      id: "4",
      name: "Laura Ruiz",
      email: "laura@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "user",
      status: "active",
      posts: 78,
      comments: 234,
      likes: 445,
      joinDate: "2022-11-05",
      lastActive: "2024-01-21",
      phone: "+34 666 777 888",
      location: "Sevilla, España",
      bio: "Fotógrafa de naturaleza especializada en pesca y caza.",
      verified: true,
      coverPhotoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/22/Represa_de_Palmar_sobre_el_R%C3%ADo_Negro.jpg",
    },
  ])

  const roles = [
    { value: "all", label: "Todos los roles" },
    { value: "user", label: "Usuarios" },
    { value: "moderator", label: "Moderadores" },
    { value: "admin", label: "Administradores" },
  ]

  const statuses = [
    { value: "all", label: "Todos los estados" },
    { value: "active", label: "Activos" },
    { value: "suspended", label: "Suspendidos" },
    { value: "banned", label: "Baneados" },
  ]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = selectedRole === "all" || user.role === selectedRole
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus

    return matchesSearch && matchesRole && matchesStatus
  })

  const handleEditUser = (user: UserData) => {
    setEditingUser(user)
    setShowUserModal(true)
  }

  const handleUpdateUser = () => {
    if (!editingUser) return

    setUsers(users.map((u) => (u.id === editingUser.id ? editingUser : u)))
    setEditingUser(null)
    setShowUserModal(false)

    toast({
      title: "Usuario actualizado",
      description: `${editingUser.name} se ha actualizado correctamente`,
    })
  }

  const handleDeleteUser = (userId: string) => {
    const user = users.find((u) => u.id === userId)
    if (!user) return

    if (confirm(`¿Estás seguro de que quieres eliminar a "${user.name}"? Esta acción no se puede deshacer.`)) {
      setUsers(users.filter((u) => u.id !== userId))

      toast({
        title: "Usuario eliminado",
        description: `${user.name} se ha eliminado correctamente`,
      })
    }
  }

  const handleBanUser = (user: UserData) => {
    setShowBanModal(user)
    setBanReason("")
  }

  const confirmBanUser = () => {
    if (!showBanModal || !banReason.trim()) return

    setUsers(
      users.map((u) =>
        u.id === showBanModal.id ? { ...u, status: "banned" as "active" | "suspended" | "banned" } : u,
      ),
    )

    toast({
      title: "Usuario baneado",
      description: `${showBanModal.name} ha sido baneado por: ${banReason}`,
    })

    setShowBanModal(null)
    setBanReason("")
  }

  const handleToggleStatus = (userId: string) => {
    setUsers(
      users.map((u) =>
        u.id === userId
          ? {
              ...u,
              status: u.status === "active" ? "suspended" : ("active" as "active" | "suspended" | "banned"),
            }
          : u,
      ),
    )
  }

  const handleToggleVerification = (userId: string) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, verified: !u.verified } : u)))
  }

  const handleChangeRole = (userId: string, newRole: "user" | "moderator" | "admin") => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, role: newRole } : u)))

    const user = users.find((u) => u.id === userId)
    toast({
      title: "Rol actualizado",
      description: `${user?.name} ahora es ${newRole === "user" ? "usuario" : newRole === "moderator" ? "moderador" : "administrador"}`,
    })
  }

  const exportUsers = () => {
    const csvContent = [
      ["Nombre", "Email", "Rol", "Estado", "Posts", "Fecha de Registro", "Última Actividad"],
      ...filteredUsers.map((user) => [
        user.name,
        user.email,
        user.role,
        user.status,
        user.posts.toString(),
        user.joinDate,
        user.lastActive,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "usuarios.csv"
    a.click()
    window.URL.revokeObjectURL(url)

    toast({
      title: "Exportación completada",
      description: "Los datos de usuarios se han exportado correctamente",
    })
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "moderator":
        return "bg-blue-100 text-blue-800"
      case "user":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "suspended":
        return "bg-yellow-100 text-yellow-800"
      case "banned":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleText = (role: string) => {
    switch (role) {
      case "admin":
        return "Administrador"
      case "moderator":
        return "Moderador"
      case "user":
        return "Usuario"
      default:
        return role
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Activo"
      case "suspended":
        return "Suspendido"
      case "banned":
        return "Baneado"
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h2>
          <p className="text-gray-600">Administra los miembros de tu comunidad</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={exportUsers} variant="outline" className="flex items-center space-x-2 bg-transparent">
            <Download className="h-4 w-4" />
            <span>Exportar</span>
          </Button>
          <Button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700">
            <UserPlus className="h-4 w-4" />
            <span>Invitar Usuario</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 font-medium">Total Usuarios</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
              <User className="h-8 w-8 text-blue-100" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 font-medium">Usuarios Activos</p>
                <p className="text-2xl font-bold">{users.filter((u) => u.status === "active").length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-100" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 font-medium">Moderadores</p>
                <p className="text-2xl font-bold">{users.filter((u) => u.role === "moderator").length}</p>
              </div>
              <Shield className="h-8 w-8 text-purple-100" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 font-medium">Nuevos (7 días)</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <UserPlus className="h-8 w-8 text-orange-100" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar usuarios por nombre o email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
              >
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
              >
                {statuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-900">Usuarios ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Usuario</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Rol</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Estado</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actividad</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Registro</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-gray-900">{user.name}</p>
                            {user.verified && <CheckCircle className="h-4 w-4 text-blue-500" />}
                          </div>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          {user.location && <p className="text-xs text-gray-500">{user.location}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Badge className={getRoleColor(user.role)}>
                          {user.role === "moderator" ? (
                            <Shield className="h-3 w-3 mr-1" />
                          ) : (
                            <User className="h-3 w-3 mr-1" />
                          )}
                          {getRoleText(user.role)}
                        </Badge>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(user.status)}>{getStatusText(user.status)}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <p className="text-gray-900">{user.posts} posts</p>
                        <p className="text-gray-600">{user.comments} comentarios</p>
                        <p className="text-gray-500 text-xs">
                          Último: {new Date(user.lastActive).toLocaleDateString()}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">
                        {new Date(user.joinDate).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditUser(user)}
                          className="text-gray-600 hover:text-blue-600"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleToggleStatus(user.id)}
                          className="text-gray-600 hover:text-yellow-600"
                        >
                          {user.status === "active" ? <Ban className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleBanUser(user)}
                          className="text-gray-600 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <select
                          value={user.role}
                          onChange={(e) => handleChangeRole(user.id, e.target.value as "user" | "moderator" | "admin")}
                          className="text-xs px-2 py-1 border border-gray-300 rounded bg-white text-gray-900"
                        >
                          <option value="user">Usuario</option>
                          <option value="moderator">Moderador</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Edit User Modal */}
      {showUserModal && editingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-gray-900">Editar Usuario</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setShowUserModal(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name" className="text-gray-900">
                    Nombre
                  </Label>
                  <Input
                    id="edit-name"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email" className="text-gray-900">
                    Email
                  </Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-phone" className="text-gray-900">
                    Teléfono
                  </Label>
                  <Input
                    id="edit-phone"
                    value={editingUser.phone || ""}
                    onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-location" className="text-gray-900">
                    Ubicación
                  </Label>
                  <Input
                    id="edit-location"
                    value={editingUser.location || ""}
                    onChange={(e) => setEditingUser({ ...editingUser, location: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-cover" className="text-gray-900">
                  URL de Foto de Portada
                </Label>
                <Input
                  id="edit-cover"
                  value={editingUser.coverPhotoUrl || ""}
                  onChange={(e) => setEditingUser({ ...editingUser, coverPhotoUrl: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-bio" className="text-gray-900">
                  Biografía
                </Label>
                <Textarea
                  id="edit-bio"
                  value={editingUser.bio || ""}
                  onChange={(e) => setEditingUser({ ...editingUser, bio: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-role" className="text-gray-900">
                    Rol
                  </Label>
                  <select
                    id="edit-role"
                    value={editingUser.role}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, role: e.target.value as "user" | "moderator" | "admin" })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
                  >
                    <option value="user">Usuario</option>
                    <option value="moderator">Moderador</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status" className="text-gray-900">
                    Estado
                  </Label>
                  <select
                    id="edit-status"
                    value={editingUser.status}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, status: e.target.value as "active" | "suspended" | "banned" })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
                  >
                    <option value="active">Activo</option>
                    <option value="suspended">Suspendido</option>
                    <option value="banned">Baneado</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="edit-verified"
                  checked={editingUser.verified}
                  onChange={(e) => setEditingUser({ ...editingUser, verified: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="edit-verified" className="text-gray-900">
                  Usuario Verificado
                </Label>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setShowUserModal(false)} className="bg-transparent">
                  Cancelar
                </Button>
                <Button onClick={handleUpdateUser} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  Actualizar Usuario
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Ban User Modal */}
      {showBanModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-gray-900">Banear Usuario</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setShowBanModal(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-red-50 border-red-200">
                <Ban className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  ¿Estás seguro de que quieres banear a <strong>{showBanModal.name}</strong>? Esta acción impedirá que
                  el usuario acceda a la plataforma.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label htmlFor="ban-reason" className="text-gray-900">
                  Motivo del baneo *
                </Label>
                <Textarea
                  id="ban-reason"
                  value={banReason}
                  onChange={(e) => setBanReason(e.target.value)}
                  placeholder="Describe el motivo del baneo..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setShowBanModal(null)} className="bg-transparent">
                  Cancelar
                </Button>
                <Button onClick={confirmBanUser} disabled={!banReason.trim()} className="bg-red-600 hover:bg-red-700">
                  <Ban className="h-4 w-4 mr-2" />
                  Confirmar Baneo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}