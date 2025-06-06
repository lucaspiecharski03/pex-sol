"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Wind,
  Shield,
  Award,
  Users,
  Star,
  ChevronRight,
  Play,
  Menu,
  X,
  Clock,
  LocateIcon as LocationIcon,
} from "lucide-react"
import { useState, useEffect, useRef, useCallback } from "react"

// Componente para animação de contador otimizado para 60fps
function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const startTimeRef = useRef<number>()

  // Função de easing otimizada
  const easeOutExpo = useCallback((t: number): number => {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
  }, [])

  // Observer otimizado
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px", // Inicia a animação um pouco antes
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  // Animação otimizada para 60fps
  const animate = useCallback(
    (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime
      }

      const elapsed = currentTime - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)

      // Aplicar easing para movimento mais natural
      const easedProgress = easeOutExpo(progress)
      const currentCount = Math.floor(easedProgress * end)

      // Usar callback para evitar re-renders desnecessários
      setCount((prevCount) => {
        if (prevCount !== currentCount) {
          return currentCount
        }
        return prevCount
      })

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        // Garantir que chegue exatamente no valor final
        setCount(end)
      }
    },
    [duration, end, easeOutExpo],
  )

  useEffect(() => {
    if (!isVisible) return

    // Reset para nova animação
    startTimeRef.current = undefined
    setCount(0)

    // Iniciar animação
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isVisible, animate])

  return (
    <div ref={ref} className="text-3xl font-bold text-blue-600 mb-2 will-change-contents">
      {count}
      {suffix}
    </div>
  )
}

export default function HomePage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Função para rolagem suave
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      // Fechar o menu após clicar
      setIsMenuOpen(false)

      // Rolagem suave
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Fechar o menu ao redimensionar a janela para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section id="inicio" className="relative h-screen flex flex-col overflow-hidden">
        {/* Image Carousel Background */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            {/* Cyclus 2 */}
            <div className="absolute inset-0 opacity-100 animate-fade-in-out" style={{ animationDelay: "0s" }}>
              <img src="/images/cyclus-2.jpg" alt="Cyclus 2 - Parapente SOL" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Prymus 6 */}
            <div className="absolute inset-0 opacity-0 animate-fade-in-out" style={{ animationDelay: "5s" }}>
              <img src="/images/prymus-6.jpg" alt="Prymus 6 - Parapente SOL" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Atmus 3 */}
            <div className="absolute inset-0 opacity-0 animate-fade-in-out" style={{ animationDelay: "10s" }}>
              <img src="/images/atmus-3.jpg" alt="Atmus 3 - Parapente SOL" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Fun 2 */}
            <div className="absolute inset-0 opacity-0 animate-fade-in-out" style={{ animationDelay: "15s" }}>
              <img src="/images/fun-2.jpg" alt="Fun 2 - Ground Handling" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Calliplox Reverse 2 */}
            <div className="absolute inset-0 opacity-0 animate-fade-in-out" style={{ animationDelay: "20s" }}>
              <img
                src="/images/calliplox-reverse-2.png"
                alt="Calliplox Reverse 2 - Equipamento"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          </div>
        </div>

        {/* Header integrado na seção hero */}
        <div className="relative z-50 container mx-auto px-4 pt-8">
          <header className="bg-white/30 backdrop-blur-2xl shadow-2xl rounded-full border border-white/30 py-4 px-6 max-w-6xl mx-auto backdrop-saturate-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg p-2 hover:bg-white/20 transition-all duration-500">
                  <img
                    src="/images/sol-logo.png"
                    alt="SOL PARAGLIDERS"
                    className="h-5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:brightness-110 group-hover:drop-shadow-lg"
                  />
                  {/* Efeito de brilho */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                  {/* Partículas de brilho */}
                  <div
                    className="absolute top-0 left-0 w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="absolute top-1 right-1 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"
                    style={{ animationDelay: "0.3s" }}
                  ></div>
                  <div
                    className="absolute bottom-0 left-2 w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  {/* Anel de energia */}
                  <div className="absolute inset-0 border-2 border-blue-400/50 rounded-lg scale-75 opacity-0 group-hover:scale-110 group-hover:opacity-100 group-hover:border-blue-400/0 transition-all duration-500"></div>
                </div>
              </div>
              <nav className="hidden md:flex items-center space-x-10">
                <a
                  href="#inicio"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("inicio")
                  }}
                  className="relative text-gray-700 hover:text-blue-600 transition-all duration-300 text-sm font-medium px-3 py-2 rounded-full hover:bg-white/20 hover:backdrop-blur-sm hover:shadow-lg hover:scale-105 group"
                >
                  <span className="relative z-10">Início</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                <a
                  href="#sobre"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("sobre")
                  }}
                  className="relative text-gray-700 hover:text-blue-600 transition-all duration-300 text-sm font-medium px-3 py-2 rounded-full hover:bg-white/20 hover:backdrop-blur-sm hover:shadow-lg hover:scale-105 group"
                >
                  <span className="relative z-10">Sobre</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                <a
                  href="#produtos"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("produtos")
                  }}
                  className="relative text-gray-700 hover:text-blue-600 transition-all duration-300 text-sm font-medium px-3 py-2 rounded-full hover:bg-white/20 hover:backdrop-blur-sm hover:shadow-lg hover:scale-105 group"
                >
                  <span className="relative z-10">Produtos</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                <a
                  href="#servicos"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("servicos")
                  }}
                  className="relative text-gray-700 hover:text-blue-600 transition-all duration-300 text-sm font-medium px-3 py-2 rounded-full hover:bg-white/20 hover:backdrop-blur-sm hover:shadow-lg hover:scale-105 group"
                >
                  <span className="relative z-10">Serviços</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                <a
                  href="#galeria"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("galeria")
                  }}
                  className="relative text-gray-700 hover:text-blue-600 transition-all duration-300 text-sm font-medium px-3 py-2 rounded-full hover:bg-white/20 hover:backdrop-blur-sm hover:shadow-lg hover:scale-105 group"
                >
                  <span className="relative z-10">Galeria</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                <a
                  href="#contato"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("contato")
                  }}
                  className="relative text-gray-700 hover:text-blue-600 transition-all duration-300 text-sm font-medium px-3 py-2 rounded-full hover:bg-white/20 hover:backdrop-blur-sm hover:shadow-lg hover:scale-105 group"
                >
                  <span className="relative z-10">Contato</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </nav>
              <div className="flex items-center space-x-4">
                <Button className="hidden md:flex bg-black hover:bg-gray-800 text-white rounded-full px-6 hover:scale-105 hover:shadow-xl transition-all duration-300">
                  Fale Conosco
                </Button>
                <button
                  className="md:hidden text-gray-700 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-white/20 hover:scale-110 transition-all duration-300"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </header>

          {/* Menu Mobile */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white/40 backdrop-blur-2xl shadow-2xl rounded-b-2xl p-4 border border-white/30 animate-fade-down mx-0 mt-2 backdrop-saturate-150">
              <nav className="flex flex-col space-y-4 py-2">
                <a
                  href="#inicio"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("inicio")
                  }}
                  className="text-gray-700 hover:text-blue-600 transition-all duration-300 px-4 py-3 rounded-lg hover:bg-white/30 hover:backdrop-blur-sm hover:shadow-md hover:scale-105 hover:translate-x-2"
                >
                  Início
                </a>
                <a
                  href="#sobre"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("sobre")
                  }}
                  className="text-gray-700 hover:text-blue-600 transition-all duration-300 px-4 py-3 rounded-lg hover:bg-white/30 hover:backdrop-blur-sm hover:shadow-md hover:scale-105 hover:translate-x-2"
                >
                  Sobre
                </a>
                <a
                  href="#produtos"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("produtos")
                  }}
                  className="text-gray-700 hover:text-blue-600 transition-all duration-300 px-4 py-3 rounded-lg hover:bg-white/30 hover:backdrop-blur-sm hover:shadow-md hover:scale-105 hover:translate-x-2"
                >
                  Produtos
                </a>
                <a
                  href="#servicos"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("servicos")
                  }}
                  className="text-gray-700 hover:text-blue-600 transition-all duration-300 px-4 py-3 rounded-lg hover:bg-white/30 hover:backdrop-blur-sm hover:shadow-md hover:scale-105 hover:translate-x-2"
                >
                  Serviços
                </a>
                <a
                  href="#galeria"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("galeria")
                  }}
                  className="text-gray-700 hover:text-blue-600 transition-all duration-300 px-4 py-3 rounded-lg hover:bg-white/30 hover:backdrop-blur-sm hover:shadow-md hover:scale-105 hover:translate-x-2"
                >
                  Galeria
                </a>
                <a
                  href="#contato"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("contato")
                  }}
                  className="text-gray-700 hover:text-blue-600 transition-all duration-300 px-4 py-3 rounded-lg hover:bg-white/30 hover:backdrop-blur-sm hover:shadow-md hover:scale-105 hover:translate-x-2"
                >
                  Contato
                </a>
                <Button className="w-full bg-black hover:bg-gray-800 text-white rounded-full hover:scale-105 hover:shadow-xl transition-all duration-300">
                  Fale Conosco
                </Button>
              </nav>
            </div>
          )}
        </div>

        {/* Content centralizado */}
        <div className="relative z-10 flex-1 flex items-center justify-center text-center text-white max-w-4xl mx-auto px-4">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">SOL PARAGLIDERS</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 drop-shadow-md">
              Voando alto com segurança e qualidade há mais de 25 anos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg rounded-full px-8">
                Conheça Nossos Produtos
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-white text-white hover:bg-white hover:text-blue-600 shadow-lg backdrop-blur-sm rounded-full px-8"
                onClick={() => setIsVideoModalOpen(true)}
              >
                <Play className="mr-2 h-5 w-5" />
                Assista ao Vídeo
              </Button>
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="relative z-20 pb-8 flex justify-center">
          <div className="flex space-x-2">
            <div
              className="w-3 h-3 rounded-full bg-white opacity-100 animate-indicator"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="w-3 h-3 rounded-full bg-white opacity-50 animate-indicator"
              style={{ animationDelay: "5s" }}
            ></div>
            <div
              className="w-3 h-3 rounded-full bg-white opacity-50 animate-indicator"
              style={{ animationDelay: "10s" }}
            ></div>
            <div
              className="w-3 h-3 rounded-full bg-white opacity-50 animate-indicator"
              style={{ animationDelay: "15s" }}
            ></div>
            <div
              className="w-3 h-3 rounded-full bg-white opacity-50 animate-indicator"
              style={{ animationDelay: "20s" }}
            ></div>
          </div>
        </div>

        {/* Video Modal */}
        {isVideoModalOpen && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="relative bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                ✕
              </button>
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/joWGdF4vwPg?autoplay=1"
                  title="SOL Sports 30 anos"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Sobre a Empresa */}
      <section id="sobre" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">Sobre Nós</Badge>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">Tradição e Inovação no Parapente</h2>
              <p className="text-lg text-gray-600 mb-6">
                Desde 1979 a Sol veste aventura, ação e emoção. Fundada em 1991, há mais de 32 anos temos como propósito
                tornar o sonho do voo livre uma realidade para pessoas de todas as partes do mundo. Nossa missão é
                produzir equipamentos de alta qualidade que proporcionem liberdade e segurança aos nossos clientes,
                sempre movidos pela paixão de voar.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <AnimatedCounter end={32} suffix="+" duration={2000} />
                  <div className="text-gray-600">Anos de Experiência</div>
                </div>
                <div className="text-center">
                  <AnimatedCounter end={10} suffix="K+" duration={1800} />
                  <div className="text-gray-600">Clientes Satisfeitos</div>
                </div>
              </div>
              <Button>
                Saiba Mais
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <div className="relative flex justify-center">
                <div className="bg-white p-8 rounded-2xl shadow-2xl border-4 border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-3xl hover:scale-105">
                  <img
                    src="/images/sol-logo-about.png"
                    alt="SOL PARAGLIDERS - Logo Oficial"
                    className="w-full max-w-md mx-auto h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Produtos */}
      <section id="produtos" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Nossos Produtos</Badge>
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Equipamentos de Alta Performance</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubra nossa linha completa de parapentes e equipamentos desenvolvidos com a mais alta tecnologia e
              padrões de segurança.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Produto 1 - Calliplox Reverse 2 */}
            <Card className="overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="relative h-64">
                <img
                  src="/images/calliplox-reverse-2-product.png"
                  alt="Calliplox Reverse 2 - Selim SOL"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-red-500">Leisure</Badge>
              </div>
              <CardHeader>
                <CardTitle>Calliplox Reverse 2</CardTitle>
                <CardDescription>
                  Selim de alta qualidade para voo de lazer e conforto. Design ergonômico com excelente proteção e
                  facilidade de uso.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Produto 2 - Cx Max */}
            <Card className="overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="relative h-64">
                <img
                  src="/images/cx-max-product.jpg"
                  alt="Cx Max - Parapente SOL"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-green-500">Competition</Badge>
              </div>
              <CardHeader>
                <CardTitle>Cx Max</CardTitle>
                <CardDescription>
                  Parapente de alta performance para competição e cross country. Tecnologia avançada para máximo
                  desempenho.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Produto 3 - S3 */}
            <Card className="overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="relative h-64">
                <img
                  src="/images/s3-product.jpg"
                  alt="S3 - Selim SOL"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-blue-500">Training</Badge>
              </div>
              <CardHeader>
                <CardTitle>S3</CardTitle>
                <CardDescription>
                  Selim ideal para treinamento, escola e voo duplo. Segurança e conforto para iniciantes e instrutores.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Produto 4 - Alpamayo */}
            <Card className="overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="relative h-64">
                <img
                  src="/images/alpamayo-product.jpg"
                  alt="Alpamayo - Selim SOL"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-purple-500">Hike & Fly</Badge>
              </div>
              <CardHeader>
                <CardTitle>Alpamayo</CardTitle>
                <CardDescription>
                  Selim ultralight para hike and fly. Perfeito para aventuras que combinam caminhada e voo livre.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section id="servicos" className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Por que Escolher a SOL PARAGLIDERS?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Nossos diferenciais que fazem a diferença na sua experiência de voo
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Segurança</h3>
              <p className="opacity-90">Todos os produtos seguem rigorosos padrões internacionais de segurança</p>
            </div>

            <div className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Qualidade</h3>
              <p className="opacity-90">Materiais premium e tecnologia de ponta em cada equipamento</p>
            </div>

            <div className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Suporte</h3>
              <p className="opacity-90">Equipe especializada para orientação e suporte técnico</p>
            </div>

            <div className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Wind className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Performance</h3>
              <p className="opacity-90">Equipamentos desenvolvidos para máxima performance de voo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Galeria */}
      <section id="galeria" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Galeria</Badge>
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Momentos Inesquecíveis</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Veja alguns dos momentos mais incríveis capturados por nossos clientes
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Galeria 1"
                className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
              />
            </div>
            <div className="aspect-square">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Galeria 2"
                className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
              />
            </div>
            <div className="aspect-square">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Galeria 3"
                className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
              />
            </div>
            <div className="aspect-square">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Galeria 4"
                className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
              />
            </div>
            <div className="aspect-square">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Galeria 5"
                className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
              />
            </div>
            <div className="aspect-square">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Galeria 6"
                className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
              />
            </div>
            <div className="aspect-square">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Galeria 7"
                className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
              />
            </div>
            <div className="aspect-square">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Galeria 8"
                className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
              />
            </div>
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Ver Mais Fotos
            </Button>
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Instagram</Badge>
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Siga-nos no Instagram</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Acompanhe nossos últimos posts e veja mais conteúdo exclusivo sobre parapentes e voo livre
            </p>
            <a
              href="https://www.instagram.com/solparaglidersofficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              <Instagram className="mr-2 h-5 w-5" />
              @solparaglidersofficial
            </a>
          </div>

          {/* Instagram Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {/* Post 1 - Parapente Vermelho */}
            <div className="aspect-square relative group cursor-pointer overflow-hidden rounded-lg">
              <img
                src="/images/instagram-1.png"
                alt="Parapente vermelho sobrevoando montanhas"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-8 w-8" />
              </div>
            </div>

            {/* Post 2 - Parapente Amarelo */}
            <div className="aspect-square relative group cursor-pointer overflow-hidden rounded-lg">
              <img
                src="/images/instagram-2.png"
                alt="Parapente amarelo e azul sobre o mar"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-8 w-8" />
              </div>
            </div>

            {/* Post 3 - Dois Parapentes */}
            <div className="aspect-square relative group cursor-pointer overflow-hidden rounded-lg">
              <img
                src="/images/instagram-3.png"
                alt="Dois parapentes voando sobre montanhas"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-8 w-8" />
              </div>
            </div>

            {/* Post 4 - Dia das Mães */}
            <div className="aspect-square relative group cursor-pointer overflow-hidden rounded-lg">
              <img
                src="/images/instagram-4.png"
                alt="Feliz Dia das Mães - Mulher praticando parapente"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-8 w-8" />
              </div>
            </div>

            {/* Post 5 - Parapentes Coloridos */}
            <div className="aspect-square relative group cursor-pointer overflow-hidden rounded-lg">
              <img
                src="/images/instagram-5.png"
                alt="Parapentes coloridos sendo preparados para voo"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-8 w-8" />
              </div>
            </div>

            {/* Post 6 - Parapente Azul */}
            <div className="aspect-square relative group cursor-pointer overflow-hidden rounded-lg">
              <img
                src="/images/instagram-6.png"
                alt="Parapente azul sobrevoando montanhas com névoa"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-8 w-8" />
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
            >
              <a href="https://www.instagram.com/solparaglidersofficial/" target="_blank" rel="noopener noreferrer">
                <Instagram className="mr-2 h-5 w-5" />
                Seguir no Instagram
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Depoimentos</Badge>
            <h2 className="text-4xl font-bold mb-6 text-gray-900">O que Nossos Clientes Dizem</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Depoimento 1 - Leandro Chaicoski */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  "Loja com excelente variedade de roupas esportivas, comprei calças com tecido leve e com boa
                  elasticidade, algumas blusas segunda pele térmicas e outras com tecido corta vento, muito leves e
                  perfeitas para caminhadas e esportes outdoor."
                </p>
                <div className="flex items-center">
                  <img src="/images/star1.png" alt="Leandro Chaicoski" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <div className="font-semibold">Leandro Chaicoski</div>
                    <div className="flex items-center text-sm text-gray-500">
                      <LocationIcon className="h-3 w-3 mr-1" />
                      <span>Jaraguá do Sul - SC</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-xs text-gray-400 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Avaliação feita há 2 meses</span>
                </div>
              </CardContent>
            </Card>

            {/* Depoimento 2 - Simone Guedes */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  "Ótimo atendimento, roupas lindas de excelente qualidade em oferta."
                </p>
                <div className="flex items-center">
                  <img src="/images/star2.png" alt="Simone Guedes" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <div className="font-semibold">Simone Guedes</div>
                    <div className="flex items-center text-sm text-gray-500">
                      <LocationIcon className="h-3 w-3 mr-1" />
                      <span>Jaraguá do Sul - SC</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-xs text-gray-400 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Avaliação feita há 3 meses</span>
                </div>
              </CardContent>
            </Card>

            {/* Depoimento 3 - Olmiro Amrain */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  "Ótimo atendimento! Sem falar na qualidade dos equipamentos! Parabéns! Recomendo!"
                </p>
                <div className="flex items-center">
                  <img src="/images/star3.png" alt="Olmiro Amrain" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <div className="font-semibold">Olmiro Amrain</div>
                    <div className="flex items-center text-sm text-gray-500">
                      <LocationIcon className="h-3 w-3 mr-1" />
                      <span>Jaraguá do Sul - SC</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-xs text-gray-400 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Avaliação feita há 1 mês</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Contato</Badge>
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Entre em Contato Conosco</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Estamos prontos para atendê-lo. Entre em contato e tire suas dúvidas
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Informações de Contato */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">Informações de Contato</h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-3">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Endereço</h4>
                    <p className="text-gray-600">
                      Rua Walter Marquardt, 1180 - Vila Nova
                      <br />
                      Jaraguá do Sul - SC - 89259-565
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-3">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Telefone</h4>
                    <p className="text-gray-600">
                      (47) 3275-7753
                      <br />
                      <a href="https://wa.me/5547999999999" className="text-blue-600 hover:underline">
                        WhatsApp: Envie uma mensagem
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-3">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">E-mail</h4>
                    <p className="text-gray-600">
                      <a href="mailto:contato@solparagliders.com.br" className="hover:underline">
                        contato@solparagliders.com.br
                      </a>
                      <br />
                      <a href="mailto:vendas@solparagliders.com.br" className="hover:underline">
                        vendas@solparagliders.com.br
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-semibold mb-4">Horário de Funcionamento</h4>
                <div className="text-gray-600 space-y-1">
                  <p>Segunda a Sexta: 08:30 às 18:00</p>
                  <p>Sábado: 08:30 às 12:00</p>
                  <p>Domingo: Fechado</p>
                </div>
              </div>

              {/* Mapa */}
              <div className="mt-8 rounded-lg overflow-hidden shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.0453456042!2d-49.09344492394726!3d-26.27953447706903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94de9fde5d8f2e0d%3A0x37c5d8b0f18dc3a7!2sR.%20Walter%20Marquardt%2C%201180%20-%20Vila%20Nova%2C%20Jaragu%C3%A1%20do%20Sul%20-%20SC%2C%2089259-565!5e0!3m2!1spt-BR!2sbr!4v1717711200000!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização da SOL PARAGLIDERS"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>

            {/* Formulário de Contato */}
            <Card>
              <CardHeader>
                <CardTitle>Envie sua Mensagem</CardTitle>
                <CardDescription>Preencha o formulário abaixo e entraremos em contato em breve</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nome">Nome</Label>
                      <Input id="nome" placeholder="Seu nome" />
                    </div>
                    <div>
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input id="telefone" placeholder="Seu telefone" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" placeholder="seu@email.com" />
                  </div>
                  <div>
                    <Label htmlFor="assunto">Assunto</Label>
                    <Input id="assunto" placeholder="Assunto da mensagem" />
                  </div>
                  <div>
                    <Label htmlFor="mensagem">Mensagem</Label>
                    <Textarea id="mensagem" placeholder="Digite sua mensagem aqui..." className="min-h-[120px]" />
                  </div>
                  <Button className="w-full">Enviar Mensagem</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img src="/images/sol-logo.png" alt="SOL PARAGLIDERS" className="h-4 mb-4" />
              <p className="text-gray-400 mb-4">
                Fabricante de parapentes e equipamentos para voo livre desde 1991. Qualidade, segurança e inovação em
                cada produto.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/solparagliders/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/solparaglidersofficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://www.youtube.com/@SolParagliders_Since_1991/featured"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#inicio"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection("inicio")
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Início
                  </a>
                </li>
                <li>
                  <a
                    href="#sobre"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection("sobre")
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Sobre
                  </a>
                </li>
                <li>
                  <a
                    href="#produtos"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection("produtos")
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Produtos
                  </a>
                </li>
                <li>
                  <a
                    href="#servicos"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection("servicos")
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Serviços
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Produtos</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    [Categoria 1]
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    [Categoria 2]
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    [Categoria 3]
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    [Categoria 4]
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">Receba novidades e promoções exclusivas</p>
              <div className="flex">
                <Input placeholder="Seu e-mail" className="bg-gray-800 border-gray-700 text-white" />
                <Button className="ml-2">Inscrever</Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SOL PARAGLIDERS. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
