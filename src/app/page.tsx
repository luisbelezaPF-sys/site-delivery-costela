'use client'

import { useState } from 'react'
import { Plus, Minus, ShoppingCart, Search, X, Tag } from 'lucide-react'

interface MenuItem {
  id: string
  name: string
  price: number
  category: string
  variations?: { name: string; price: number }[]
}

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  variation?: string
}

interface Coupon {
  code: string
  discount: number
  type: 'percentage' | 'fixed'
  description: string
}

export default function CostelaNobafoMenu() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null)
  const [couponError, setCouponError] = useState('')

  // Cupons disponíveis
  const availableCoupons: Coupon[] = [
    { code: 'PRIMEIRA10', discount: 10, type: 'percentage', description: '10% de desconto na primeira compra' },
    { code: 'COSTELA20', discount: 20, type: 'fixed', description: 'R$ 20 de desconto' },
    { code: 'BAFO15', discount: 15, type: 'percentage', description: '15% de desconto' },
    { code: 'DELIVERY5', discount: 5, type: 'fixed', description: 'R$ 5 de desconto no delivery' },
    { code: 'FAMILIA25', discount: 25, type: 'percentage', description: '25% de desconto para pedidos acima de R$ 150' }
  ]

  const menuItems: MenuItem[] = [
    // Chopp
    { id: '1', name: 'Chopp Brahma', price: 14.00, category: 'Chopp' },
    { id: '2', name: 'Chopp Brahma Black', price: 17.00, category: 'Chopp' },
    { id: '3', name: 'Chopp Brahma Caneca', price: 19.00, category: 'Chopp' },
    { id: '4', name: 'Chopp Brahma Black Caneca', price: 20.00, category: 'Chopp' },
    
    // Cervejas
    { id: '5', name: 'Original', price: 20.00, category: 'Cervejas' },
    { id: '6', name: 'Sem Álcool', price: 18.00, category: 'Cervejas' },
    { id: '7', name: 'Corona Extra (Long Neck)', price: 17.00, category: 'Cervejas' },
    { id: '8', name: 'Spaten', price: 22.00, category: 'Cervejas' },
    { id: '9', name: 'Stella Artois (Long Neck sem glúten)', price: 16.00, category: 'Cervejas' },
    
    // Coquetéis
    { id: '10', name: 'CaipiChopp', price: 40.00, category: 'Coquetéis' },
    { id: '11', name: 'Pina Colada', price: 28.00, category: 'Coquetéis' },
    { id: '12', name: 'Sexy On The Beach', price: 28.00, category: 'Coquetéis' },
    { id: '13', name: 'Aperol Spritz', price: 38.00, category: 'Coquetéis' },
    { id: '14', name: 'Marguerita', price: 38.00, category: 'Coquetéis' },
    { id: '15', name: 'Amarula Ice Cream', price: 38.00, category: 'Coquetéis' },
    { id: '16', name: 'Mojito', price: 25.00, category: 'Coquetéis' },
    { id: '17', name: 'Tom Collins', price: 28.00, category: 'Coquetéis' },
    { id: '18', name: 'Gin Tonic', price: 34.00, category: 'Coquetéis' },
    { id: '19', name: 'Negroni', price: 28.00, category: 'Coquetéis' },
    { id: '20', name: 'Moscow Mule', price: 34.00, category: 'Coquetéis' },
    { id: '21', name: 'Soda Italiana', price: 19.00, category: 'Coquetéis' },
    { id: '22', name: 'Gin Mule', price: 43.00, category: 'Coquetéis' },
    
    // Licores
    { id: '23', name: 'Frangélico', price: 25.00, category: 'Licores' },
    { id: '24', name: 'Amarula', price: 25.00, category: 'Licores' },
    { id: '25', name: 'Cointreau', price: 30.00, category: 'Licores' },
    { id: '26', name: 'Limoncello', price: 35.00, category: 'Licores' },
    { id: '27', name: 'Drambuie', price: 30.00, category: 'Licores' },
    { id: '28', name: '43', price: 30.00, category: 'Licores' },
    
    // Cachaças
    { id: '29', name: 'Anísio Santiago', price: 60.00, category: 'Cachaças' },
    { id: '30', name: 'Regional', price: 8.00, category: 'Cachaças' },
    { id: '31', name: 'Salinas', price: 13.00, category: 'Cachaças' },
    { id: '32', name: 'Vale Verde', price: 17.00, category: 'Cachaças' },
    { id: '33', name: 'Seleta', price: 16.00, category: 'Cachaças' },
    { id: '34', name: 'Canarinha', price: 30.00, category: 'Cachaças' },
    { id: '35', name: 'Pinga com Mel', price: 12.00, category: 'Cachaças' },
    
    // Sucos Naturais (versão simplificada)
    { id: '36', name: 'Laranja', price: 12.00, category: 'Sucos Naturais', variations: [
      { name: 'Suco', price: 12.00 },
      { name: 'Suco c/ Leite', price: 14.00 },
      { name: 'Jarra', price: 24.00 },
      { name: 'Jarra c/ Leite', price: 29.00 }
    ]},
    { id: '37', name: 'Limonada', price: 12.00, category: 'Sucos Naturais', variations: [
      { name: 'Suco', price: 12.00 },
      { name: 'Jarra', price: 22.00 }
    ]},
    { id: '38', name: 'Limonada Suíça', price: 17.00, category: 'Sucos Naturais', variations: [
      { name: 'Suco', price: 17.00 },
      { name: 'Jarra c/ Leite', price: 32.00 }
    ]},
    { id: '39', name: 'Abacaxi', price: 12.00, category: 'Sucos Naturais', variations: [
      { name: 'Suco', price: 12.00 },
      { name: 'Suco c/ Leite', price: 17.00 },
      { name: 'Jarra', price: 22.00 },
      { name: 'Jarra c/ Leite', price: 27.00 }
    ]},
    { id: '40', name: 'Morango', price: 18.00, category: 'Sucos Naturais', variations: [
      { name: 'Suco', price: 18.00 },
      { name: 'Suco c/ Leite', price: 20.00 },
      { name: 'Jarra', price: 29.00 },
      { name: 'Jarra c/ Leite', price: 34.00 }
    ]},
    
    // Porções
    { id: '41', name: 'Asa de frango recheada c/ provolone (4un)', price: 70.00, category: 'Porções' },
    { id: '42', name: 'Batata frita', price: 40.00, category: 'Porções' },
    { id: '43', name: 'Batata frita c/ queijo', price: 45.00, category: 'Porções' },
    { id: '44', name: 'Batata frita c/ bacon e queijo', price: 60.00, category: 'Porções' },
    { id: '45', name: 'Cesta de pão de alho', price: 25.00, category: 'Porções' },
    { id: '46', name: 'Bolinho de camarão c/ catupiry', price: 70.00, category: 'Porções' },
    { id: '47', name: 'Bolinho de costela', price: 60.00, category: 'Porções' },
    { id: '48', name: 'Escondidinho de costela', price: 70.00, category: 'Porções' },
    { id: '49', name: 'Filé mignon à Moda da Casa', price: 100.00, category: 'Porções' },
    { id: '50', name: 'Isca de tilápia', price: 90.00, category: 'Porções' },
    { id: '51', name: 'Linguiça calabresa recheada c/ provolone', price: 80.00, category: 'Porções' },
    { id: '52', name: 'Picanha à palito', price: 160.00, category: 'Porções' },
    { id: '53', name: 'Polenta frita', price: 35.00, category: 'Porções' },
    { id: '54', name: 'Polenta frita c/ queijo', price: 45.00, category: 'Porções' },
    { id: '55', name: 'Provolone', price: 55.00, category: 'Porções' },
    { id: '56', name: 'Torresmo', price: 70.00, category: 'Porções' },
    { id: '57', name: 'Pastelzinho de queijo (farinha de milho)', price: 45.00, category: 'Porções' },
    
    // Carnes
    { id: '58', name: 'Picanha', price: 220.00, category: 'Carnes' },
    { id: '59', name: 'Picanha à Mineira', price: 270.00, category: 'Carnes' },
    { id: '60', name: 'Picanha à Parrilera', price: 250.00, category: 'Carnes' },
    { id: '61', name: 'Picanha com Queijo Coalho na Brasa', price: 250.00, category: 'Carnes' },
    { id: '62', name: 'Bife Ancho Fatiado', price: 230.00, category: 'Carnes' },
    { id: '63', name: 'Filé Mignon à Moda da Casa', price: 230.00, category: 'Carnes' },
    { id: '64', name: 'Filé Mignon ao Molho de Jabuticaba', price: 230.00, category: 'Carnes' },
    { id: '65', name: 'Filé Mignon à Parmegiana', price: 250.00, category: 'Carnes' },
    
    // Costela no Bafo
    { id: '66', name: 'Costela no Bafo 500g (serve até 2 pessoas)', price: 160.00, category: 'Costela no Bafo' },
    { id: '67', name: 'Costela no Bafo 1kg (serve até 4 pessoas)', price: 220.00, category: 'Costela no Bafo' },
    { id: '68', name: 'Costela no Bafo 500g à mineira (serve até 2 pessoas)', price: 200.00, category: 'Costela no Bafo' },
    { id: '69', name: 'Costela no Bafo 1kg à mineira (serve até 4 pessoas)', price: 250.00, category: 'Costela no Bafo' },
    
    // Sobremesas
    { id: '70', name: 'Pudim de Leite à Moda da Casa', price: 25.00, category: 'Sobremesas' },
    { id: '71', name: 'Romeu e Julieta Gelado', price: 30.00, category: 'Sobremesas' },
    { id: '72', name: 'Creme de Papaya', price: 25.00, category: 'Sobremesas' },
    { id: '73', name: 'Petit Gateau c/ Sorvete de Creme', price: 40.00, category: 'Sobremesas' },
    { id: '74', name: 'Carpaccio de Morango', price: 45.00, category: 'Sobremesas' },
    { id: '75', name: 'Sorvete Torta Alemã', price: 35.00, category: 'Sobremesas' },
  ]

  const categories = ['all', ...Array.from(new Set(menuItems.map(item => item.category)))]

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const addToCart = (item: MenuItem, variation?: { name: string; price: number }) => {
    const cartItemId = variation ? `${item.id}-${variation.name}` : item.id
    const cartItemName = variation ? `${item.name} (${variation.name})` : item.name
    const cartItemPrice = variation ? variation.price : item.price

    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === cartItemId)
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === cartItemId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      } else {
        return [...prevCart, {
          id: cartItemId,
          name: cartItemName,
          price: cartItemPrice,
          quantity: 1,
          variation: variation?.name
        }]
      }
    })
  }

  const removeFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id)
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      )
    }
  }

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const applyCoupon = () => {
    setCouponError('')
    const coupon = availableCoupons.find(c => c.code.toLowerCase() === couponCode.toLowerCase())
    
    if (!coupon) {
      setCouponError('Cupom inválido')
      return
    }

    // Verificar se é o cupom FAMILIA25 que tem condição mínima
    if (coupon.code === 'FAMILIA25' && getSubtotal() < 150) {
      setCouponError('Este cupom é válido apenas para pedidos acima de R$ 150')
      return
    }

    setAppliedCoupon(coupon)
    setCouponCode('')
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
  }

  const getDiscount = () => {
    if (!appliedCoupon) return 0
    
    if (appliedCoupon.type === 'percentage') {
      return (getSubtotal() * appliedCoupon.discount) / 100
    } else {
      return appliedCoupon.discount
    }
  }

  const getTotalPrice = () => {
    return Math.max(0, getSubtotal() - getDiscount())
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const sendToWhatsApp = () => {
    const subtotal = getSubtotal()
    const discount = getDiscount()
    const total = getTotalPrice()

    let message = `Olá, Costela no Bafo!\n\nGostaria de fazer o seguinte pedido:\n\n*MEU PEDIDO:*\n${cart.map(item => `• ${item.name} - Qtd: ${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}`).join('\n')}\n\n*SUBTOTAL: R$ ${subtotal.toFixed(2)}*`

    if (appliedCoupon) {
      message += `\n*CUPOM APLICADO: ${appliedCoupon.code}*\n*DESCONTO: -R$ ${discount.toFixed(2)}*`
    }

    message += `\n\n*TOTAL DO PEDIDO: R$ ${total.toFixed(2)}*\n\nNome: \nEndereço: \nForma de pagamento:`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/5535984455051?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  const groupedItems = categories.reduce((acc, category) => {
    if (category === 'all') return acc
    acc[category] = filteredItems.filter(item => item.category === category)
    return acc
  }, {} as Record<string, MenuItem[]>)

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#8B4513] font-serif">
      {/* Header */}
      <header className="bg-[#8B4513] text-[#F5F1E8] py-6 px-4 text-center relative">
        <h1 className="text-3xl font-bold mb-2">COSTELA NO BAFO</h1>
        <p className="text-sm opacity-90">Cardápio Premium</p>
        
        {/* Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed top-4 right-4 bg-[#D2691E] text-white p-3 rounded-full shadow-lg z-50 flex items-center gap-2"
        >
          <ShoppingCart size={20} />
          {getTotalItems() > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
              {getTotalItems()}
            </span>
          )}
        </button>
      </header>

      {/* Cupons Promocionais */}
      <div className="bg-gradient-to-r from-[#D2691E] to-[#B8860B] text-white p-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <Tag size={20} />
            Cupons Disponíveis
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {availableCoupons.map((coupon) => (
              <div key={coupon.code} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <div className="font-bold text-lg">{coupon.code}</div>
                <div className="text-sm opacity-90">{coupon.description}</div>
                <div className="text-xs mt-1 opacity-75">
                  {coupon.code === 'FAMILIA25' && 'Válido para pedidos acima de R$ 150'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="p-4 bg-white shadow-sm">
        <div className="max-w-md mx-auto mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar item..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
            />
          </div>
        </div>
        
        <div className="flex overflow-x-auto gap-2 pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-[#8B4513] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category === 'all' ? 'Todos' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Content */}
      <main className="p-4 max-w-4xl mx-auto">
        {selectedCategory === 'all' ? (
          Object.entries(groupedItems).map(([category, items]) => (
            items.length > 0 && (
              <div key={category} className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-[#8B4513] border-b-2 border-[#D2691E] pb-2">
                  {category}
                </h2>
                <div className="space-y-3">
                  {items.map(item => (
                    <MenuItemCard key={item.id} item={item} onAddToCart={addToCart} />
                  ))}
                </div>
              </div>
            )
          ))
        ) : (
          <div className="space-y-3">
            {filteredItems.map(item => (
              <MenuItemCard key={item.id} item={item} onAddToCart={addToCart} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#8B4513] text-[#F5F1E8] p-6 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">COSTELA NO BAFO</h3>
          <div className="space-y-2 text-sm">
            <p>Av. Tuany Toledo, 145 - Bairro Fátima II</p>
            <p>Pouso Alegre - MG</p>
            <p className="mt-3">costelanobafo.com.br</p>
            <div className="mt-3 space-y-1">
              <p>(35) 3423.4833</p>
              <p>(35) 3022.5104</p>
              <p>(35) 9 8445-5051</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full sm:max-w-md sm:mx-4 max-h-[90vh] overflow-hidden rounded-t-lg sm:rounded-lg">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-bold text-[#8B4513]">Seu Pedido</h3>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-4 max-h-96 overflow-y-auto">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Seu carrinho está vazio</p>
              ) : (
                <div className="space-y-3">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-[#8B4513] font-bold">R$ {item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="bg-gray-200 hover:bg-gray-300 rounded-full p-1"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-medium min-w-[20px] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="bg-gray-200 hover:bg-gray-300 rounded-full p-1"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {cart.length > 0 && (
              <div className="p-4 border-t">
                {/* Cupom Section */}
                <div className="mb-4">
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Código do cupom"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
                    />
                    <button
                      onClick={applyCoupon}
                      className="bg-[#8B4513] hover:bg-[#A0522D] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Aplicar
                    </button>
                  </div>
                  
                  {couponError && (
                    <p className="text-red-500 text-xs">{couponError}</p>
                  )}
                  
                  {appliedCoupon && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-2 flex justify-between items-center">
                      <div>
                        <p className="text-green-700 font-medium text-sm">{appliedCoupon.code}</p>
                        <p className="text-green-600 text-xs">{appliedCoupon.description}</p>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Totals */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span>Subtotal:</span>
                    <span className="font-bold text-[#8B4513]">R$ {getSubtotal().toFixed(2)}</span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="flex justify-between items-center text-green-600">
                      <span>Desconto ({appliedCoupon.code}):</span>
                      <span className="font-bold">-R$ {getDiscount().toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center text-lg border-t pt-2">
                    <span className="font-bold">Total:</span>
                    <span className="text-xl font-bold text-[#8B4513]">R$ {getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={sendToWhatsApp}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Enviar pelo WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function MenuItemCard({ item, onAddToCart }: { item: MenuItem; onAddToCart: (item: MenuItem, variation?: { name: string; price: number }) => void }) {
  const [selectedVariation, setSelectedVariation] = useState<{ name: string; price: number } | null>(null)

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-[#8B4513] flex-1 pr-2">{item.name}</h3>
        <span className="font-bold text-[#8B4513] whitespace-nowrap">
          R$ {item.price.toFixed(2)}
        </span>
      </div>
      
      {item.variations && item.variations.length > 0 && (
        <div className="mb-3">
          <p className="text-sm text-gray-600 mb-2">Escolha uma opção:</p>
          <div className="grid grid-cols-2 gap-2">
            {item.variations.map((variation, index) => (
              <button
                key={index}
                onClick={() => setSelectedVariation(variation)}
                className={`text-xs p-2 rounded border transition-colors ${
                  selectedVariation?.name === variation.name
                    ? 'bg-[#8B4513] text-white border-[#8B4513]'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {variation.name} - R$ {variation.price.toFixed(2)}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <button
        onClick={() => onAddToCart(item, selectedVariation || undefined)}
        className="w-full bg-[#D2691E] hover:bg-[#B8860B] text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
      >
        <Plus size={16} />
        Adicionar ao Pedido
      </button>
    </div>
  )
}