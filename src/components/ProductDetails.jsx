import React, { useState, useEffect } from 'react';
import { Star, Heart, MessageSquare, ShoppingBag, ShieldCheck, Globe, ChevronRight, ChevronDown, Check } from 'lucide-react';

// Main Product Image
import mainImg from '../assets/Image/tech/image 34.png';
import thumb1 from '../assets/Image/tech/image 33.png';
import thumb2 from '../assets/Image/tech/image 32.png';
import thumb3 from '../assets/Image/tech/6.png';
import thumb4 from '../assets/Image/tech/8.png';
import flagDE from '../assets/Layout1/Image/flags/DE@2x.png';

const ProductDetails = ({ setPage, productId }) => {
   const [selectedThumb, setSelectedThumb] = useState(0);
   const thumbnails = [mainImg, thumb1, thumb2, thumb3, thumb4];

   // ===== Single product Django API se =====
   const [product, setProduct] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      if (!productId) {
         setLoading(false);
         return;
      }
      fetch(`https://muhammadbilal786.pythonanywhere.com/api/products/${productId}/`)
         .then((res) => res.json())
         .then((data) => {
            setProduct(data);
            setLoading(false);
         })
         .catch((err) => {
            console.error("Product load nahi hua:", err);
            setLoading(false);
         });
   }, [productId]);

   if (loading) {
      return <div className="container py-20 text-center text-[#8B96A5]">Loading product...</div>;
   }

   if (!product) {
      return (
         <div className="container py-20 text-center text-[#8B96A5]">
            Product nahi mila.{' '}
            <span className="text-primary cursor-pointer hover:underline" onClick={() => setPage('listing')}>Wapas jaayein</span>
         </div>
      );
   }

   return (
      <div className="container py-4">
         {/* Breadcrumbs */}
         <div className="flex items-center gap-2 text-[#8B96A5] text-sm mb-6">
            <span className="cursor-pointer hover:text-primary transition-colors" onClick={() => setPage('home')}>Home</span>
            <ChevronRight className="w-4 h-4" />
            <span className="cursor-pointer hover:text-primary transition-colors" onClick={() => setPage('listing')}>Products</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#1C1C1C] font-normal">{product.category}</span>
         </div>

         {/* Main Content Card */}
         <div className="bg-white border border-[#DEE2E7] rounded-lg p-5 lg:p-8 flex flex-col lg:flex-row gap-8 mb-8 shadow-sm">
            {/* Gallery Section */}
            <div className="lg:w-[450px] flex-shrink-0">
               <div className="border border-[#DEE2E7] rounded-lg p-8 mb-4 flex items-center justify-center bg-[#F7F7F7] aspect-square overflow-hidden group">
                  <img src={product.image || thumbnails[selectedThumb]} alt={product.name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" />
               </div>
               <div className="flex gap-3 overflow-x-auto no-scrollbar">
                  {thumbnails.map((img, i) => (
                     <div
                        key={i}
                        className={`w-[56px] h-[56px] border rounded-md cursor-pointer flex items-center justify-center p-1 bg-[#F7F7F7] hover:border-primary transition-colors ${selectedThumb === i ? 'border-primary shadow-sm' : 'border-[#DEE2E7]'}`}
                        onClick={() => setSelectedThumb(i)}
                     >
                        <img src={img} alt={`thumb-${i}`} className="max-w-[85%] max-h-[85%] object-contain" />
                     </div>
                  ))}
               </div>
            </div>

            {/* Product Info Section */}
            <div className="flex-1">
               <div className="flex items-center gap-2 text-[#00B517] mb-2">
                  <Check size={20} />
                  <span className="text-sm font-medium">{product.stock > 0 ? `In stock (${product.stock} available)` : 'Out of stock'}</span>
               </div>
               <h1 className="text-xl lg:text-2xl font-bold text-[#1C1C1C] mb-4">
                  {product.name}
               </h1>

               {/* Ratings & Orders */}
               <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                     {[5, 4, 3, 2, 1].map((s, i) => <Star key={i} size={16} className={i < 4 ? "fill-[#FF9017] text-[#FF9017]" : "text-[#D1D3D3]"} />)}
                     <span className="text-[#FF9017] text-sm ml-1">4.5</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#8B96A5] text-sm">
                     <MessageSquare size={16} />
                     <span>32 reviews</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#8B96A5] text-sm">
                     <ShoppingBag size={16} />
                     <span>154 sold</span>
                  </div>
               </div>

               {/* Pricing Block */}
               <div className="bg-[#FFF0DF] p-4 rounded-lg flex flex-wrap gap-8 items-center mb-6">
                  <div className="flex flex-col">
                     <span className="text-xl lg:text-3xl font-bold text-[#FA3434]">Rs {product.price}</span>
                     <span className="text-xs text-[#505050]">Per piece</span>
                  </div>
                  <div className="h-10 w-[1px] bg-[#DEE2E7] hidden lg:block"></div>
                  <div className="flex flex-col">
                     <span className="text-lg lg:text-2xl font-bold text-[#1C1C1C]">{product.category}</span>
                     <span className="text-xs text-[#505050]">Category</span>
                  </div>
               </div>

               {/* Product Meta Info */}
               <div className="space-y-4 mb-8">
                  <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
                     <span className="text-[#8B96A5]">Category:</span>
                     <span className="col-span-2 lg:col-span-3 text-[#505050]">{product.category}</span>
                  </div>
                  <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 text-sm border-t border-[#DEE2E7] pt-4">
                     <span className="text-[#8B96A5]">Stock:</span>
                     <span className="col-span-2 lg:col-span-3 text-[#505050]">{product.stock} units</span>
                  </div>
                  <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 text-sm border-t border-[#DEE2E7] pt-4">
                     <span className="text-[#8B96A5]">Price:</span>
                     <span className="col-span-2 lg:col-span-3 text-[#505050]">Rs {product.price}</span>
                  </div>
                  <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 text-sm border-t border-[#DEE2E7] pt-4">
                     <span className="text-[#8B96A5]">Design:</span>
                     <span className="col-span-2 lg:col-span-3 text-[#505050]">Modern design</span>
                  </div>
               </div>

               <div className="h-[1px] bg-[#DEE2E7] mb-8"></div>

               {/* Action Buttons & Variations */}
               <div className="space-y-6">
                  <div className="flex items-center gap-4">
                     <span className="text-sm text-[#505050] w-16">Size:</span>
                     <div className="flex gap-2">
                        {['Small', 'Medium', 'Large'].map(size => (
                           <button key={size} className="px-4 py-2 border border-[#DEE2E7] rounded-md text-sm font-medium hover:border-primary hover:text-primary transition-colors bg-white">
                              {size}
                           </button>
                        ))}
                     </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                     <button
                        className="flex-1 min-w-[150px] bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-bold transition-colors"
                        onClick={() => setPage('cart')}
                     >
                        Buy Now
                     </button>
                     <button
                        className="flex-1 min-w-[150px] bg-[#E3F0FF] hover:bg-[#D1E9FF] text-primary py-3 rounded-lg font-bold transition-colors"
                        onClick={() => setPage('cart')}
                     >
                        Add to Cart
                     </button>
                     <button className="w-12 h-12 flex items-center justify-center border border-[#DEE2E7] rounded-lg text-primary hover:bg-shade transition-colors">
                        <Heart size={20} />
                     </button>
                  </div>
               </div>
            </div>

            {/* Sidebar / Seller Info Section */}
            <div className="lg:w-[280px] space-y-4">
               {/* Seller Module */}
               <div className="bg-white border border-[#DEE2E7] rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="w-12 h-12 rounded-md bg-[#E3F0FF] flex items-center justify-center text-primary font-bold text-xl uppercase">R</div>
                     <div className="flex flex-col">
                        <span className="text-[#1C1C1C] font-normal">Supplier</span>
                        <span className="text-[#505050] text-sm">Guanjhou Trading Co.</span>
                     </div>
                  </div>
                  <div className="h-[1px] bg-[#DEE2E7] mb-4"></div>
                  <div className="space-y-3 mb-5">
                     <div className="flex items-center gap-3 text-sm text-[#8B96A5]">
                        <img src={flagDE} alt="DE" className="w-5 h-3 rounded-sm" />
                        <span>Germany, Berlin</span>
                     </div>
                     <div className="flex items-center gap-3 text-sm text-[#8B96A5]">
                        <ShieldCheck size={18} />
                        <span>Verified Seller</span>
                     </div>
                     <div className="flex items-center gap-3 text-sm text-[#8B96A5]">
                        <Globe size={18} />
                        <span>Worldwide shipping</span>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <button className="w-full bg-primary text-white py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">Send inquiry</button>
                     <button className="w-full bg-white text-primary border border-[#DEE2E7] py-2 rounded-lg text-sm font-medium hover:bg-shade transition-colors">Seller's profile</button>
                  </div>
               </div>

               <div className="text-center p-4">
                  <button className="flex items-center justify-center gap-2 text-primary font-medium hover:underline text-sm w-full">
                     <Heart size={18} />
                     <span>Save for later</span>
                  </button>
               </div>
            </div>
         </div>

         {/* Tabs Section Container */}
         <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
               <div className="bg-white border border-[#DEE2E7] rounded-lg overflow-hidden mb-8">
                  <div className="flex border-b border-[#DEE2E7] bg-white overflow-x-auto no-scrollbar">
                     {['Description', 'Reviews', 'Shipping', 'About company'].map((tab, i) => (
                        <button key={tab} className={`px-6 py-4 text-sm font-medium transition-colors border-b-2 ${i === 0 ? 'text-primary border-primary' : 'text-[#8B96A5] border-transparent hover:text-primary'}`}>
                           {tab}
                        </button>
                     ))}
                  </div>
                  <div className="p-6 lg:p-8">
                     <p className="text-[#505050] text-sm lg:text-base leading-relaxed mb-6">
                        {product.description || 'No description available for this product.'}
                     </p>
                     <table className="w-full text-sm lg:text-base mb-8 rounded overflow-hidden border-collapse">
                        <tbody>
                           <tr className="border border-[#DEE2E7]">
                              <td className="w-1/3 bg-[#F7FAFC] p-3 text-[#505050] font-medium border-r border-[#DEE2E7]">Product ID</td>
                              <td className="p-3 text-[#505050]"># {product.id}</td>
                           </tr>
                           <tr className="border border-[#DEE2E7]">
                              <td className="w-1/3 bg-[#F7FAFC] p-3 text-[#505050] font-medium border-r border-[#DEE2E7]">Category</td>
                              <td className="p-3 text-[#505050]">{product.category}</td>
                           </tr>
                           <tr className="border border-[#DEE2E7]">
                              <td className="w-1/3 bg-[#F7FAFC] p-3 text-[#505050] font-medium border-r border-[#DEE2E7]">Price</td>
                              <td className="p-3 text-[#505050]">Rs {product.price}</td>
                           </tr>
                           <tr className="border border-[#DEE2E7]">
                              <td className="w-1/3 bg-[#F7FAFC] p-3 text-[#505050] font-medium border-r border-[#DEE2E7]">Stock</td>
                              <td className="p-3 text-[#505050]">{product.stock} units</td>
                           </tr>
                        </tbody>
                     </table>
                     <div className="space-y-3">
                        {["Some great feature goes here", "Another amazing benefit", "High quality materials used", "Fast delivery and easy return"].map((item, i) => (
                           <div key={i} className="flex items-center gap-3 text-[#505050] text-sm">
                              <Check size={16} className="text-[#8B96A5]" />
                              <span>{item}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            {/* Similar Products Sidebar */}
            <aside className="lg:w-[280px]">
               <div className="bg-white border border-[#DEE2E7] rounded-lg p-5">
                  <h4 className="font-bold text-[#1C1C1C] mb-4">You may like</h4>
                  <div className="space-y-4">
                     {[thumb1, thumb2, thumb3, thumb4].map((img, i) => (
                        <div key={i} className="flex items-center gap-4 group cursor-pointer p-2 hover:bg-[#F7FAFC] rounded-lg transition-colors">
                           <div className="w-20 h-20 border border-[#DEE2E7] rounded-md p-2 flex items-center justify-center bg-white group-hover:shadow-sm transition-shadow">
                              <img src={img} alt="suggested" className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300" />
                           </div>
                           <div className="flex flex-col">
                              <span className="text-[#1C1C1C] text-sm font-normal group-hover:text-primary transition-colors line-clamp-1 font-medium">Apple Watch Series Space Gray</span>
                              <span className="text-[#8B96A5] text-sm">$7.00 - $99.50</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </aside>
         </div>

         {/* Related Products Section */}
         <div className="bg-white border border-[#DEE2E7] rounded-lg p-5 lg:p-6 mb-8 mt-6">
            <h4 className="font-bold text-[#1C1C1C] text-lg mb-4">Related products</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
               {[
                  { tag: "Xiaomi Redmi 8 Original", price: "$32.00-$40.00", img: thumb1 },
                  { tag: "Xiaomi Redmi 8 Original", price: "$32.00-$40.00", img: thumb2 },
                  { tag: "Xiaomi Redmi 8 Original", price: "$32.00-$40.00", img: thumb3 },
                  { tag: "Xiaomi Redmi 8 Original", price: "$32.00-$40.00", img: thumb4 },
                  { tag: "Xiaomi Redmi 8 Original", price: "$32.00-$40.00", img: thumb1 },
                  { tag: "Xiaomi Redmi 8 Original", price: "$32.00-$40.00", img: thumb2 },
               ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-3 group">
                     <div className="w-full aspect-square border border-[#DEE2E7] rounded-lg p-3 flex items-center justify-center bg-white cursor-pointer group-hover:shadow-[0px_4px_15px_rgba(0,0,0,0.08)] group-hover:-translate-y-1 transition-all duration-300">
                        <img src={item.img} alt="related" className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[#505050] text-sm line-clamp-2 group-hover:text-primary transition-colors cursor-pointer">{item.tag}</span>
                        <span className="text-[#8B96A5] text-sm mt-1">{item.price}</span>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Super Discount Banner */}
         <div className="bg-gradient-to-r from-primary to-[#005ADE] rounded-lg p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-8 text-white relative overflow-hidden">
            <div className="relative z-10 text-center md:text-left">
               <h2 className="text-xl lg:text-2xl font-bold mb-2">Super discount on more than 100 USD</h2>
               <p className="opacity-80 text-sm">Have you ever finally just for dummy info.</p>
            </div>
            <button className="relative z-10 bg-[#FF9017] hover:bg-[#E38015] text-white px-8 py-3 rounded-lg font-bold transition-colors shadow-lg">
               Shop now
            </button>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -ml-10 -mb-10"></div>
         </div>
      </div>
   );
};

export default ProductDetails;