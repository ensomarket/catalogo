import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, Send, Store, X, Menu, Search, Filter } from 'lucide-react';

/**
 * ==========================================
 * ZONA DE CONFIGURACIÓN (¡EDITAR ESTA SECCIÓN!)
 * ==========================================
 * * REGLA DE ORO: 
 * 1. MANTÉN SIEMPRE LAS COMILLAS "" ALREDEDOR DE LOS TEXTOS Y LINKS.
 * 2. NO USES COMILLAS PARA LOS PRECIOS (SOLO NÚMEROS).
 */

const BUSINESS_CONFIG = {
  // 1. Nombre de tu negocio (Ej: "La Panadería de Juan")
  name: "Enso Market", 
  
  // 2. Tu número de WhatsApp. Formato internacional sin símbolos: (Ej: 5491112345678)
  phoneNumber: "5491154925933", 
  
  // 3. El símbolo de tu moneda (Ej: "$", "€", "USD")
  currency: "$",
  
  // 4. Un emoji para el logo (Ej: "☕", "🍕")
  logoText: "🛒",
  
  // 5. Color de la App (Si quieres otro color, cámbialo a 'bg-red-600', 'bg-blue-600', etc.)
  primaryColor: "bg-olive-600 hover:bg-olive-700", 
};


// 👇👇👇 LISTA DE TUS PRODUCTOS 👇👇👇
// Copia y pega el bloque entre { ... } para agregar o eliminar productos.

const INITIAL_PRODUCTS = [
  // --- PRODUCTO DE EJEMPLO 1 ---
  {
    id: 1, // ¡Importante! Debe ser un número único (1, 2, 3, 4, ...)
    name: "Frutillas x1kg", 
    price: 7560, // Precio (Ej: 1500). SIN comillas.
    category: "Frutas IQF", // Ejemplo: "Panadería", "Bebidas"
    description: "Frutillas seleccionadas, ultracongeladas enteras", 
    // ¡IMPORTANTE! Este link de Drive NO es directo, causará "Sin Imagen".
    // DEBES convertirlo a formato de descarga directa (Opción 2) o usar un link de Imgur (Opción 1).
    image: "https://imgur.com/c7QeXMp.jpg" 
  },
  
  // --- PRODUCTO DE EJEMPLO 2 ---
    {
    id: 2,
    name: "Ananá 1kg",
    price: 800,
    category: "Frutas IQF",
    description: "Ananá congelada con metodología IQF, cortada en trozos.",
    // ¡IMPORTANTE! Este link de Drive NO es directo, causará "Sin Imagen".
    image:
      "https://imgur.com/eJSbrYG.jpg",
  },

  // --- PRODUCTO DE EJEMPLO 3 ---
  {
    id: 3,
    name: "Arándano 1kg",
    price: 11340,
    category: "Frutas IQF",
    description:
      "Ultracongelados al momento óptimo, son una fuente insuperable de antioxidantes.",
    // 🔥 CORRECCIÓN APLICADA: Convertido a formato de enlace directo para Google Drive:
    // Original: https://drive.google.com/file/d/1ZaJyDkvOFuChKIU1Uhq6AlN9lF8-EPJD/view?usp=drive_link
    // Corregido:
    image:
      "https://imgur.com/Y3a8M9f.jpg",
  },

  // ¡Puedes agregar más productos aquí!
  {
    id: 4,
    name: "Acelga 900GR",
    price: 5170,
    category: "Verduras IQF",
    description: "Acelga de primera calidad, lista para usar.",
    // ¡IMPORTANTE! Este link de Drive NO es directo, causará "Sin Imagen".
    image:
      "https://imgur.com/8yHk4Aj.jpg",
  },
  {
    id: 5,
    name: "Arveja 1kg",
    price: 7280,
    category: "Verduras IQF",
    description: "Arvejas frescas seleccionadas, ultracongeladas.",
    // ¡IMPORTANTE! Este link de Drive NO es directo, causará "Sin Imagen".
    image:
      "https://imgur.com/Mj5GGjd.jpg",
  },
  {
    id: 6,
    name: "Brócoli 1kg",
    price: 9380,
    category: "Verduras IQF",
    description:
      "Floretes de brócoli ultracongelados que mantienen su textura y todos sus beneficios.",
    // ¡IMPORTANTE! Este link de Drive NO es directo, causará "Sin Imagen".
    image:
      "https://imgur.com/jqmpGUp.jpg",
  },
  {
    id: 7,
    name: "Cebolla 1kg",
    price: 5900,
    category: "Verduras IQF",
    description: "Cebolla blanca seleccionada, pelada y cortada en cubos.",
    // ¡IMPORTANTE! Este link de Drive NO es directo, causará "Sin Imagen".
    image:
      "https://imgur.com/D4IkmYc.jpg",
  },
  {
    id: 8,
    name: "Champignon x900gr",
    price: 9100,
    category: "Verduras IQF",
    description:
      "Laminado y ultracongelado para preservar su textura carnosa y sabor.",
    // ¡IMPORTANTE! Este link de Drive NO es directo, causará "Sin Imagen".
    image:
      "https://imgur.com/jeOSPfI.jpg",
  },
  {
    id: 9,
    name: "Chaucha 1kg",
    price: 7840,
    category: "Verduras IQF",
    description:
      "Chauchas tiernas, cortadas y ultracongeladas al punto justo para conservar su textura crujiente y su alto contenido de fibra y vitaminas.",
    // ¡IMPORTANTE! Este link de Drive NO es directo, causará "Sin Imagen".
    image:
      "https://imgur.com/JrlzdpH.jpg",
  },
  {
    id: 10,
    name: "Choclo 1kg",
    price: 5880,
    category: "Verduras IQF",
    description:
      "Granos de choclo seleccionados, desgranados y ultracongelados para preservar su dulzura y textura tierna.",
    // ¡IMPORTANTE! Este link de Drive NO es directo, causará "Sin Imagen".
    image:
      "https://imgur.com/KjVfwWT.jpg",
  },
  {
    id: 11,
    name: "Durazno 1kg",
    price: 7000,
    category: "Frutas IQF",
    description:
      "Trozos de durazno maduro, perfectos para dar dulzor natural a sus preparaciones.",
    // ¡IMPORTANTE! Este link de Drive NO es directo, causará "Sin Imagen".
    image:
      "https://imgur.com/NeAqJbb.jpg",
  },
  {
    id: 12,
    name: "Espárrago 1kg",
    price: 13720,
    category: "Verduras IQF",
    description:
      "Puntas de espárragos seleccionadas, ultracongeladas para asegurar que su sabor y textura permanezcan intactos.",
    // ¡IMPORTANTE! Este link de Drive NO es directo, causará "Sin Imagen".
    image:
      "https://imgur.com/BHH12oY.jpg",
  },
  {
    id: 13,
    name: "Espinaca 1kg",
    price: 6300,
    category: "Verduras IQF",
    description:
      "Hojas de espinaca lavadas y troceadas, conservando todo el hierro y ácido fólico.",
    // ¡IMPORTANTE! Este link de Drive NO es directo, causará "Sin Imagen".
    image:
      "https://imgur.com/y1WcO9w.jpg",
  },
  {
    id: 14,
    name: "Frambuesa 1kg",
    price: 21420,
    category: "Frutas IQF",
    description: "Frambuesas enteras ultracongeladas IQF.",
    // ¡IMPORTANTE! Este link de Drive NO es directo, causará "Sin Imagen".
    image:
      "https://imgur.com/5voboCD.jpg",
  },
  {
    id: 15,
    name: "Pulpa de Lima 1kg",
    price: 7420,
    category: "Frutas IQF",
    description:
      "Pulpa de lima pura, ultracongelada para mantener toda su acidez y frescura.",
    // ¡IMPORTANTE! Este link de Drive NO es directo, causará "Sin Imagen".
    image:
      "https://imgur.com/TbwyEGn.jpg",
  },
  {
    id: 16,
    name: "Mango 1kg",
    price: 8680,
    category: "Frutas IQF",
    description:
      "Trozos de mango maduro, seleccionados y ultracongelados para conservar su dulzura natural y su alta concentración de vitaminas A y C.",
    // ¡IMPORTANTE! Este link de Drive NO es directo, causará "Sin Imagen".
    image:
      "https://imgur.com/Cqkat8y.jpg",
  },
  {
    id: 17,
    name: "Pulpa de Maracuyá con Semillas 1kg",
    price: 10700,
    category: "Frutas IQF",
    description:
      "La pasión de la fruta congelada. Un toque ácido y vibrante para sus smoothies, jugos detox o salsas. Las semillas aportan un extra de fibra.",
    // ¡IMPORTANTE! Este link de Drive NO es directo, causará "Sin Imagen".
    image:
      "https://imgur.com/rcmiixK.jpg",
  },
  {
    id: 18,
    name: "Pulpa de Maracuyá sin Semillas 1kg",
    price: 11480,
    category: "Frutas IQF",
    description:
      "Pulpa de maracuyá ultracongelada, lista para mezclar. El mismo sabor intenso y la fuente de Vitamina C, pero con una textura más suave y homogénea para sus preparaciones más finas.",
    // ¡IMPORTANTE! Este link de Drive NO es directo, causará "Sin Imagen".
    image:
      "https://imgur.com/OaDrgDO.jpg",
  },
  {
    id: 19,
    name: "Mix 4 Berries 1kg",
    price: 11620,
    category: "Frutas IQF",
    description: "Mix 4 Berries: Frutilla, arándano, frambuesa y mora",
    // ¡IMPORTANTE! Este link de Drive NO es directo, causará "Sin Imagen".
    image:
      "https://imgur.com/yWQ62tS.jpg",
  },
  {
    id: 20,
    name: "Mix Patagónico 1kg",
    price: 11060,
    category: "Frutas IQF",
    description: "Frutilla, arándano y frambuesa",
    // ¡IMPORTANTE! Este link de Drive NO es directo, causará "Sin Imagen".
    image:
      "https://imgur.com/0LejsV5.jpg",
  },
  {
    id: 21,
    name: "Mix Rojo 1kg",
    price: 12600,
    category: "Frutas IQF",
    description: "Arándano, frambuesa y mora",
    // ¡IMPORTANTE! Este link de Drive NO es directo, causará "Sin Imagen".
    image:
      "https://imgur.com/H16vZDR.jpg",
  },
  {
    id: 22,
    name: "Mix Tropifrutal 1kg",
    price: 11480,
    category: "Frutas IQF",
    description: "Kiwi, melón, durazno y ananá",
    // ¡IMPORTANTE! Este link de Drive NO es directo, causará "Sin Imagen".
    image:
      "https://imgur.com/s6VogHV.jpg",
  },
  {
    id: 23,
    name: "Mix Tucumano 1kg",
    price: 9240,
    category: "Frutas IQF",
    description: "Frutilla, Arándano y Mora",
    // ¡IMPORTANTE! Este link de Drive NO es directo, causará "Sin Imagen".
    image:
      "https://imgur.com/qmsyHF6.jpg",
  },
  {
    id: 24,
    name: "Mora 1kg",
    price: 8680,
    category: "Frutas IQF",
    description:
      "Moras enteras seleccionadas, ultracongeladas para máxima frescura.",
    // ¡IMPORTANTE! Este link de Drive NO es directo, causará "Sin Imagen".
    image:
      "https://imgur.com/4hvC9HT.jpg",
  },
  {
    id: 25,
    name: "Palta en Cubos 1kg",
    price: 16380,
    category: "Frutas IQF",
    description:
      "Palta Hass de alta calidad cortada en cubos y ultracongelada.",
    // ¡IMPORTANTE! Este link de Drive NO es directo, causará "Sin Imagen".
    image:
      "https://imgur.com/hMP0lKL.jpg",
  },
  {
    id: 26,
    name: "Pulpa de Palta Hass 1kg",
    price: 8260,
    category: "Frutas IQF",
    description: "Pulpa de palta Hass lista, congelada IQF.",
    // ¡IMPORTANTE! Este link de Drive NO es directo, causará "Sin Imagen".
    image:
      "https://imgur.com/vAQls0H.jpg",
  },
  {
    id: 27,
    name: "Pulpa de Acai 1kg",
    price: 15120,
    category: "Frutas IQF",
    description: "Pulpa pura de Acai, el superfood amazónico",
    // ¡IMPORTANTE! Este link de Drive NO es directo, causará "Sin Imagen".
    image:
      "https://imgur.com/14r5Puj.jpg",
  },
  {
    id: 28,
    name: "Papas bastón 1kg",
    price: 5320,
    category: "Verduras IQF",
    description:
      "El Clásico Crujiente, Listo en Minutos. Papas bastón prefritas y ultracongeladas.",
    // ¡IMPORTANTE! Este link de Drive NO es directo, causará "Sin Imagen".
    image:
      "https://imgur.com/Z1EPl2g.jpg",
  }
  
  // ¡Puedes agregar más productos aquí!
];

// 👆👆👆 FIN DE LA ZONA DE CONFIGURACIÓN 👆👆👆

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [customerInfo, setCustomerInfo] = useState({ name: "", address: "", notes: "" });
  const [activeTab, setActiveTab] = useState('catalog');

  // Calcular total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Obtener categorías únicas
  const categories = ["Todos", ...new Set(INITIAL_PRODUCTS.map(p => p.category))];

  // Filtrar productos
  const filteredProducts = INITIAL_PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Funciones del carrito
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      });
    });
  };

  // Función mágica: Enviar a WhatsApp
  const sendOrderToWhatsApp = (e) => {
    e.preventDefault();
    
    // NOTA: Usamos un modal o componente visual en lugar de 'alert()'
    // En este caso, el botón está deshabilitado si falta el nombre.
    if (cart.length === 0) {
        // Podrías mostrar un mensaje modal aquí si no usáramos 'alert'
        console.error("Tu carrito está vacío, no se puede enviar el pedido.");
        return;
    } 
    // Si el nombre no está completo, el botón debe estar deshabilitado, pero
    // si se pudiera saltar, podríamos mostrar un mensaje.

    let message = `*¡Hola! Quiero realizar un pedido en ${BUSINESS_CONFIG.name}* 👋\n\n`;
    message += `*📋 Detalle del pedido:*\n`;
    
    cart.forEach(item => {
      message += `▫️ ${item.quantity}x ${item.name} - ${BUSINESS_CONFIG.currency}${item.price * item.quantity}\n`;
    });

    message += `\n*💰 Total: ${BUSINESS_CONFIG.currency}${cartTotal}*\n`;
    message += `--------------------------------\n`;
    message += `*👤 Datos del Cliente:*\n`;
    message += `Nombre: ${customerInfo.name}\n`;
    message += `Dirección: ${customerInfo.address || 'A convenir'}\n`;
    if (customerInfo.notes) message += `Notas: ${customerInfo.notes}\n`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* HEADER */}
      <header className={`sticky top-0 z-40 ${BUSINESS_CONFIG.primaryColor} text-white shadow-lg`}>
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => {setIsCartOpen(false); setActiveTab('catalog')}}>
            <span className="text-2xl">{BUSINESS_CONFIG.logoText}</span>
            <h1 className="text-xl font-bold tracking-tight hidden sm:block">{BUSINESS_CONFIG.name}</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Buscador Rápido (Desktop) */}
            <div className="hidden md:flex items-center bg-white/10 rounded-full px-3 py-1">
              <Search size={18} className="text-white/80" />
              <input 
                type="text"
                placeholder="Buscar..."
                className="bg-transparent border-none focus:ring-0 text-sm text-white placeholder-white/70 w-32 ml-2"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Botón Carrito */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="container mx-auto px-4 py-6 mb-20">
        
        {/* Barra de Categorías y Buscador Móvil */}
        <div className="mb-6 space-y-4">
          <div className="md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="¿Qué estás buscando?" 
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat 
                    ? 'bg-gray-800 text-white shadow-md' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => {
            const inCart = cart.find(item => item.id === product.id);
            return (
              <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col h-full border border-gray-100">
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = "https://placehold.co/400x300?text=Sin+Imagen" }}
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-gray-700 shadow-sm">
                    {product.category}
                  </div>
                </div>
                
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-bold text-lg text-gray-800 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">{product.description}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                    <span className="text-xl font-bold text-gray-900">{BUSINESS_CONFIG.currency}{product.price}</span>
                    
                    {inCart ? (
                      <div className="flex items-center bg-gray-100 rounded-lg p-1">
                        <button 
                          onClick={() => updateQuantity(product.id, -1)}
                          className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm text-gray-600 active:scale-95 transition-transform"
                        >
                          {inCart.quantity === 1 ? <Trash2 size={16} className="text-red-500"/> : <Minus size={16} />}
                        </button>
                        <span className="w-8 text-center font-bold text-sm">{inCart.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(product.id, 1)}
                          className={`w-8 h-8 flex items-center justify-center text-white rounded-md shadow-sm active:scale-95 transition-transform ${BUSINESS_CONFIG.primaryColor}`}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => addToCart(product)}
                        className={`px-4 py-2 rounded-lg text-white font-medium text-sm shadow-sm active:scale-95 transition-all flex items-center gap-2 ${BUSINESS_CONFIG.primaryColor}`}
                      >
                        <Plus size={16} />
                        Agregar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {filteredProducts.length === 0 && (
            <div className="text-center py-20">
                <p className="text-gray-400 text-lg">No encontramos productos con esa búsqueda.</p>
                <button onClick={() => {setSearchTerm(""); setSelectedCategory("Todos")}} className="mt-4 text-emerald-600 font-medium hover:underline">Ver todo</button>
            </div>
        )}
      </main>

      {/* CART MODAL / CHECKOUT */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          ></div>

          {/* Cart Sidebar */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in">
            <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <ShoppingCart size={20} /> Tu Pedido
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
                  <ShoppingBagIcon />
                  <p>Tu carrito está vacío</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className={`mt-4 px-6 py-2 rounded-full text-white ${BUSINESS_CONFIG.primaryColor}`}
                  >
                    Ver Catálogo
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-4 items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <img src={item.image} className="w-16 h-16 rounded-lg object-cover bg-white" alt={item.name}/>
                        <div className="flex-grow">
                          <h4 className="font-semibold text-sm text-gray-800">{item.name}</h4>
                          <div className="text-emerald-600 font-bold text-sm">{BUSINESS_CONFIG.currency}{item.price * item.quantity}</div>
                        </div>
                        <div className="flex flex-col items-center gap-1 bg-white rounded-lg p-1 shadow-sm border border-gray-100">
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-gray-100 rounded text-green-600"><Plus size={14}/></button>
                          <span className="text-xs font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-gray-100 rounded text-red-500">
                            {item.quantity === 1 ? <Trash2 size={14}/> : <Minus size={14}/>}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Formulario Cliente */}
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <h3 className="font-bold mb-4 text-gray-800">Datos de Envío</h3>
                    <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Tu Nombre *</label>
                        <input 
                          required
                          type="text" 
                          value={customerInfo.name}
                          onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})}
                          className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                          placeholder="Ej: Juan Pérez"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Dirección de Entrega</label>
                        <input 
                          type="text" 
                          value={customerInfo.address}
                          onChange={e => setCustomerInfo({...customerInfo, address: e.target.value})}
                          className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                          placeholder="Calle y Número (Opcional)"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Notas (Opcional)</label>
                        <textarea 
                          rows="2"
                          value={customerInfo.notes}
                          onChange={e => setCustomerInfo({...customerInfo, notes: e.target.value})}
                          className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
                          placeholder="Ej: Sin mayonesa, timbre roto..."
                        />
                      </div>
                    </form>
                  </div>
                </>
              )}
            </div>

            {/* Footer Carrito */}
            {cart.length > 0 && (
              <div className="p-4 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between items-center mb-4 text-lg">
                  <span className="text-gray-500">Total:</span>
                  <span className="font-bold text-gray-900 text-xl">{BUSINESS_CONFIG.currency}{cartTotal}</span>
                </div>
                <button 
                  onClick={sendOrderToWhatsApp}
                  disabled={!customerInfo.name}
                  className={`w-full py-4 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all active:scale-[0.98] ${
                    !customerInfo.name ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  <Send size={20} />
                  Confirmar Pedido por WhatsApp
                </button>
                {!customerInfo.name && (
                  <p className="text-center text-xs text-red-500 mt-2">Completa tu nombre para continuar</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Icono simple para estado vacío
function ShoppingBagIcon() {
  return (
    <svg className="w-16 h-16 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
}
