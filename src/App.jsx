import React, { useState, useEffect } from 'react';
import { 
    Sun, Cloud, CloudRain, CloudLightning, Leaf, Wheat, DollarSign, MessageSquare, 
    Search, Filter, Cpu, MapPin, Calendar, GitBranch, User, PieChart, TrendingUp, 
    ClipboardList, Tractor, Banknote, X, Send
} from 'lucide-react';

// --- DUMMY DATA ---
const dummyProducts = [
  { id: 1, name: 'Fresh Maize', price: '150 GHS', unit: '/ bag', image: 'https://placehold.co/400x300/a2e9af/333333?text=Maize', seller: 'Ama Farms' },
  { id: 2, name: 'Organic Tomatoes', price: '50 GHS', unit: '/ box', image: 'https://placehold.co/400x300/fecaca/333333?text=Tomatoes', seller: 'Kofi Gardens' },
  { id: 3, name: 'Ripe Plantains', price: '100 GHS', unit: '/ bunch', image: 'https://placehold.co/400x300/fde68a/333333?text=Plantain', seller: 'Adwoa Plantations' },
  { id: 4, name: 'Spicy Peppers', price: '30 GHS', unit: '/ basket', image: 'https://placehold.co/400x300/fca5a5/333333?text=Peppers', seller: 'Esi Spices' },
  { id: 5, name: 'Sweet Cassava', price: '80 GHS', unit: '/ bag', image: 'https://placehold.co/400x300/d8b4fe/333333?text=Cassava', seller: 'Yaw Tubers' },
  { id: 6, name: 'Juicy Pineapples', price: '10 GHS', unit: '/ piece', image: 'https://placehold.co/400x300/fef08a/333333?text=Pineapples', seller: 'Ama Farms' },
];

const weatherForecast = [
  { day: 'Today', temp: '31°/24°', condition: 'Sunny', Icon: Sun },
  { day: 'Tue', temp: '30°/23°', condition: 'Cloudy', Icon: Cloud },
  { day: 'Wed', temp: '29°/23°', condition: 'Rainy', Icon: CloudRain },
  { day: 'Thu', temp: '28°/22°', condition: 'Thunderstorm', Icon: CloudLightning },
  { day: 'Fri', temp: '32°/24°', condition: 'Sunny', Icon: Sun },
];

const dummyFields = [
    { id: 1, name: 'North Field 1', crop: 'Maize', status: 'Flowering', planted: 'Apr 15, 2025' },
    { id: 2, name: 'East Field A', crop: 'Tomatoes', status: 'Fruiting', planted: 'May 02, 2025' },
    { id: 3, name: 'West Valley', crop: 'Cowpea', status: 'Growing', planted: 'May 20, 2025' },
    { id: 4, name: 'South Field 2', crop: 'Yam', status: 'Preparing', planted: 'July 01, 2025' },
];

const dummyHarvests = [
    { id: 1, crop: 'Maize', field: 'North Field 1', status: 'Upcoming', date: 'July 25, 2025', yield: '15 Tons (Est.)' },
    { id: 2, crop: 'Tomatoes', field: 'East Field A', status: 'Upcoming', date: 'August 10, 2025', yield: '5 Tons (Est.)' },
    { id: 3, crop: 'Cassava', field: 'Old South Field', status: 'Completed', date: 'March 12, 2025', yield: '22 Tons' },
    { id: 4, crop: 'Peppers', field: 'Greenhouse 1', status: 'Completed', date: 'Feb 18, 2025', yield: '1.5 Tons' },
];

const dummyFinances = [
    { id: 1, type: 'income', desc: 'Sale of Cassava (22 tons)', amount: 17600, date: 'Mar 15, 2025' },
    { id: 2, type: 'expense', desc: 'Fertilizer Purchase (NPK)', amount: -3200, date: 'Apr 10, 2025' },
    { id: 3, type: 'expense', desc: 'Maize Seed Purchase', amount: -1500, date: 'Apr 12, 2025' },
    { id: 4, type: 'income', desc: 'Early Tomato Sale', amount: 2500, date: 'Jun 05, 2025' },
    { id: 5, type: 'expense', desc: 'Fuel for Tractor', amount: -600, date: 'Jun 18, 2025' },
];

// --- Main App Component ---
export default function App() {
  const [activePage, setActivePage] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case 'Dashboard': return <Dashboard />;
      case 'Marketplace': return <Marketplace />;
      case 'AI Assistant': return <AIAssistant />;
      case 'Analytics': return <Analytics />;
      case 'Fields': return <Fields />;
      case 'Harvesting': return <Harvesting />;
      case 'Finances': return <Finances />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <Sidebar activePage={activePage} setActivePage={setActivePage} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header pageTitle={activePage} onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 sm:p-6 lg:p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

// --- Layout Components ---
const Sidebar = ({ activePage, setActivePage, isSidebarOpen, setIsSidebarOpen }) => {
  const navItems = ['Dashboard', 'Analytics', 'Fields', 'Harvesting', 'Finances', 'Marketplace', 'AI Assistant'];

  return (
    <>
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-800 text-white transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex md:flex-col`}>
        <div className="flex items-center justify-center h-20 border-b border-slate-700">
          <Leaf className="h-8 w-8 text-green-400" />
          <span className="text-2xl font-bold ml-2">AgriBoost</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map(item => (
            <NavItem 
              key={item} 
              label={item} 
              isActive={activePage === item} 
              onClick={() => { setActivePage(item); setIsSidebarOpen(false); }}
            />
          ))}
        </nav>
        <div className="px-4 py-6 border-t border-slate-700">
            <button className="w-full flex items-center justify-center py-2 px-4 rounded-lg text-slate-300 hover:bg-slate-700">
                <User className="h-5 w-5 mr-3" />
                Logout
            </button>
        </div>
      </div>
       {isSidebarOpen && <div className="fixed inset-0 bg-black opacity-50 z-30 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>}
    </>
  );
};

const NavItem = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center py-3 px-4 rounded-lg text-left transition-colors duration-200 ${
      isActive ? 'bg-green-500 text-white font-semibold shadow-md' : 'text-slate-300 hover:bg-slate-700'
    }`}
  >
    {label}
  </button>
);

const Header = ({ pageTitle, onMenuClick }) => (
  <header className="flex items-center justify-between h-16 bg-white border-b border-gray-200 px-4 sm:px-6">
    <button onClick={onMenuClick} className="md:hidden text-gray-600">
       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
    </button>
    <h1 className="text-2xl font-bold text-slate-800 hidden sm:block">{pageTitle}</h1>
    <div className="flex items-center space-x-4">
      <div className="relative">
        <input type="text" placeholder="Search anything..." className="hidden lg:block w-64 pl-4 pr-10 py-2 rounded-full bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400" />
        <Search className="hidden lg:block absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>
      <div className="flex items-center space-x-2">
        <img src="https://placehold.co/40x40/7e22ce/ffffff?text=U" alt="User" className="w-10 h-10 rounded-full" />
        <div className="hidden md:block">
            <p className="font-semibold text-sm text-slate-700">The Farmer</p>
            <p className="text-xs text-gray-500">Admin</p>
        </div>
      </div>
    </div>
  </header>
);

// --- Page Components ---
const Dashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <InfoCard title="Total Production" value="125" unit="Tons" icon={Wheat} color="blue" percentage={12} />
      <InfoCard title="Total Revenue" value="76k" unit="GHS" icon={DollarSign} color="green" percentage={8} />
      <InfoCard title="Active Fields" value="4" icon={Leaf} color="yellow" percentage={-2} />
      <InfoCard title="Pest Alerts" value="1" icon={MessageSquare} color="red" percentage={0} />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
        <h3 className="text-xl font-bold mb-4 text-slate-800">Manage Your Farm</h3>
        <div className="aspect-w-16 aspect-h-9 bg-green-100 rounded-lg flex items-center justify-center">
            <img src="https://placehold.co/800x450/a2e9af/2f855a?text=Your+Beautiful+Farm" alt="Farm illustration" className="w-full h-full object-cover rounded-lg"/>
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
        <h3 className="text-xl font-bold mb-4 text-slate-800">Weather Forecast</h3>
        <div className="space-y-3">
          {weatherForecast.map(item => <WeatherCard key={item.day} {...item} />)}
        </div>
      </div>
    </div>
     <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
        <h3 className="text-xl font-bold mb-4 text-slate-800">Predictive Analysis - Next 3 Months</h3>
         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <AnalysisCard month="July '25" crop="Maize" percentage={65} />
            <AnalysisCard month="August '25" crop="Rice" percentage={88} />
            <AnalysisCard month="September '25" crop="Yam" percentage={45} />
        </div>
    </div>
  </div>
);

const Analytics = () => (
    <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard title="Avg. Yield" value="8.2" unit="Tons/acre" icon={TrendingUp} color="green" percentage={5} />
            <InfoCard title="Avg. Price" value="650" unit="GHS/ton" icon={DollarSign} color="blue" percentage={-3} />
            <InfoCard title="Fields in Use" value="4" unit="of 6" icon={Tractor} color="yellow" percentage={0} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-slate-800">Revenue by Crop</h3>
                <div className="space-y-4">
                    <ProgressBar label="Cassava" value={17600} total={25000} color="bg-green-500" />
                    <ProgressBar label="Tomatoes" value={2500} total={25000} color="bg-red-500" />
                    <ProgressBar label="Peppers" value={4900} total={25000} color="bg-yellow-500" />
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-slate-800">Yield Performance (Tons)</h3>
                <div className="space-y-4">
                    <ProgressBar label="Cassava" value={22} total={30} color="bg-green-500" />
                    <ProgressBar label="Peppers" value={1.5} total={3} color="bg-red-500" />
                    <ProgressBar label="Maize (Est.)" value={15} total={20} color="bg-blue-500" />
                </div>
            </div>
        </div>
    </div>
);

const Fields = () => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-700">Your Farm Fields</h2>
            <button className="px-5 py-2 rounded-full font-bold text-white bg-green-500 hover:bg-green-600 shadow-md transition-transform transform hover:scale-105">Add New Field</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {dummyFields.map(field => <FieldCard key={field.id} {...field} />)}
        </div>
    </div>
);

const Harvesting = () => (
    <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-slate-800">Upcoming Harvests</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b">
                            <th className="p-3">Crop</th><th className="p-3">Field</th><th className="p-3">Est. Date</th><th className="p-3">Est. Yield</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dummyHarvests.filter(h => h.status === 'Upcoming').map(h => (
                            <tr key={h.id} className="border-b hover:bg-gray-50">
                                <td className="p-3 font-semibold">{h.crop}</td><td className="p-3">{h.field}</td><td className="p-3">{h.date}</td><td className="p-3">{h.yield}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-slate-800">Harvest History</h3>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b">
                            <th className="p-3">Crop</th><th className="p-3">Field</th><th className="p-3">Harvest Date</th><th className="p-3">Actual Yield</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dummyHarvests.filter(h => h.status === 'Completed').map(h => (
                            <tr key={h.id} className="border-b hover:bg-gray-50 text-gray-600">
                                <td className="p-3 font-semibold">{h.crop}</td><td className="p-3">{h.field}</td><td className="p-3">{h.date}</td><td className="p-3">{h.yield}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

const Finances = () => {
    const totalIncome = dummyFinances.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = dummyFinances.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const netProfit = totalIncome + totalExpense;

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InfoCard title="Total Revenue" value={totalIncome/1000 + 'k'} unit="GHS" icon={DollarSign} color="green" />
                <InfoCard title="Total Costs" value={Math.abs(totalExpense)/1000 + 'k'} unit="GHS" icon={Banknote} color="red" />
                <InfoCard title="Net Profit" value={netProfit/1000 + 'k'} unit="GHS" icon={PieChart} color="blue" />
            </div>
             <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-slate-800">Recent Transactions</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                         <thead>
                            <tr className="border-b">
                                <th className="p-3">Date</th><th className="p-3">Description</th><th className="p-3 text-right">Amount (GHS)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dummyFinances.map(t => (
                                <tr key={t.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3 text-gray-500">{t.date}</td>
                                    <td className="p-3 font-semibold">{t.desc}</td>
                                    <td className={`p-3 text-right font-bold ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                        {t.amount.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const Marketplace = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(dummyProducts);

    useEffect(() => {
        const results = dummyProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.seller.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(results);
    }, [searchTerm]);

  return (
    <div className="space-y-6">
        <div className="bg-white p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-grow w-full sm:w-auto">
                <input 
                    type="text" 
                    placeholder="Search for produce, farms..." 
                    className="w-full pl-10 pr-4 py-3 rounded-full bg-gray-100 border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <div className="flex items-center gap-4">
                 <button className="flex items-center space-x-2 px-4 py-2 rounded-full font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300">
                    <Filter className="w-5 h-5" />
                    <span>Filter</span>
                </button>
                <button className="px-6 py-3 rounded-full font-bold text-white bg-green-500 hover:bg-green-600 shadow-md transition-transform transform hover:scale-105">
                    Add Product
                </button>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {filteredProducts.map(product => <ProductCard key={product.id} {...product} />)}
        </div>
    </div>
  );
};

const AIAssistant = () => {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleGenerate = () => {
    setIsLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(`
        <h3 class="text-2xl font-bold text-slate-800 mb-4">Your Custom Planting Plan</h3>
        <div class="space-y-6">
          <div>
            <h4 class="text-xl font-semibold text-green-700 mb-2">Primary Crop: Maize (Pioneer 30W33)</h4>
            <p class="text-gray-600">This variety is an excellent choice for the Major Rainy Season in Kumasi due to its high yield and strong resistance to leaf blight. Your loamy soil provides good drainage, which is ideal.</p>
          </div>
          <div>
            <h4 class="text-xl font-semibold text-green-700 mb-2">Secondary Crop: Tomatoes (Pectomech VF)</h4>
            <p class="text-gray-600">A reliable choice for your conditions. Ensure consistent watering. The loamy soil will support strong root development.</p>
          </div>
          <p class="pt-4 border-t border-green-200 font-semibold text-green-800">Happy farming! With this plan, you are set up for a successful and bountiful harvest.</p>
        </div>
      `);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="relative min-h-full">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-800">Your AI Farming Assistant ✨</h2>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">Get a personalized, data-driven planting plan. Just provide your farm's conditions and let our AI do the rest.</p>
        </div>
        <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <SelectField label="Your Location" Icon={MapPin} options={['Kumasi, Ashanti', 'Accra, Greater Accra']} />
            <SelectField label="Current Season" Icon={Calendar} options={['Major Rainy (Apr-Jul)', 'Minor Rainy (Sep-Oct)']} />
            <SelectField label="Soil Type" Icon={GitBranch} options={['Forest Ochrosol (Loamy)', 'Savannah Ochrosol']} />
          </div>
          <div className="text-center">
            <button onClick={handleGenerate} disabled={isLoading} className="px-10 py-4 text-lg font-bold text-white bg-green-500 rounded-full shadow-xl hover:bg-green-600 transition-all transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center mx-auto">
              {isLoading ? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div> : <>✨ Get AI Plan</>}
            </button>
          </div>
        </div>
        {result && (
          <div className="max-w-4xl mx-auto mt-8 bg-green-50 p-6 sm:p-8 rounded-2xl border-2 border-green-200 shadow-md" dangerouslySetInnerHTML={{ __html: result }}>
          </div>
        )}
      </div>
      <button onClick={() => setIsChatOpen(true)} className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-4 rounded-full shadow-2xl flex items-center space-x-3 font-bold text-lg hover:bg-green-700 transition-all transform hover:scale-110">
        <MessageSquare />
        <span>Talk to your AI expert</span>
      </button>
      {isChatOpen && <AIChatModal onClose={() => setIsChatOpen(false)} />}
    </div>
  );
};


// --- UI Card & Helper Components ---
const InfoCard = ({ title, value, unit, icon: Icon, color, percentage }) => {
    const colors = {
        blue: 'from-blue-400 to-blue-500',
        green: 'from-green-400 to-green-500',
        yellow: 'from-yellow-400 to-yellow-500',
        red: 'from-red-400 to-red-500',
    };
  return (
    <div className={`bg-gradient-to-br ${colors[color]} text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1`}>
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="font-semibold text-lg">{title}</p>
          <p className="text-3xl font-bold">{value} <span className="text-xl">{unit}</span></p>
        </div>
        <div className="bg-white/30 p-3 rounded-full">
            <Icon className="h-6 w-6" />
        </div>
      </div>
      {percentage !== undefined && (
         <p className={`text-sm mt-4 ${percentage > 0 ? 'text-green-200' : percentage < 0 ? 'text-red-200' : 'text-blue-200'}`}>
            <span className={`font-bold`}>{percentage > 0 ? `+${percentage}` : percentage}%</span> vs last month
        </p>
      )}
    </div>
  );
};

const WeatherCard = ({ day, temp, condition, Icon }) => (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100">
        <div className="flex items-center space-x-4">
            <Icon className="h-8 w-8 text-yellow-400" />
            <div>
                <p className="font-bold text-slate-700">{day}</p>
                <p className="text-sm text-gray-500">{condition}</p>
            </div>
        </div>
        <p className="font-bold text-lg text-slate-800">{temp}</p>
    </div>
);

const AnalysisCard = ({ month, crop, percentage }) => (
    <div className="bg-gray-50 p-4 rounded-lg border">
        <p className="text-sm font-semibold text-gray-500">{month}</p>
        <div className="flex justify-between items-center mt-2">
            <p className="font-bold text-slate-800">{crop}</p>
            <p className="font-bold text-green-600">{percentage}% Yield</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div className="bg-green-500 h-2.5 rounded-full" style={{width: `${percentage}%`}}></div>
        </div>
    </div>
);

const ProductCard = ({ name, price, unit, image, seller }) => (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative">
            <img src={image} alt={name} className="w-full h-48 object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
        </div>
        <div className="p-4">
            <h3 className="text-lg font-bold text-slate-800 truncate">{name}</h3>
            <p className="text-sm text-gray-500 mb-3">from {seller}</p>
            <div className="flex justify-between items-center">
                <p className="text-xl font-extrabold text-green-600">{price}<span className="text-sm font-normal text-gray-500">{unit}</span></p>
                <button className="flex items-center space-x-2 px-4 py-2 rounded-full font-semibold text-sm text-green-700 bg-green-100 hover:bg-green-200 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat</span>
                </button>
            </div>
        </div>
    </div>
);

const FieldCard = ({name, crop, status, planted}) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start">
            <div>
                <p className="font-bold text-xl text-slate-800">{name}</p>
                <p className="text-gray-500">Planted on {planted}</p>
            </div>
            <span className="px-3 py-1 text-xs font-bold text-white bg-blue-500 rounded-full">{status}</span>
        </div>
        <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-gray-500">Current Crop</p>
            <p className="font-semibold text-lg text-green-700">{crop}</p>
        </div>
    </div>
);

const ProgressBar = ({ label, value, total, color }) => {
    const percentage = (value / total) * 100;
    return (
        <div>
            <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-slate-700">{label}</span>
                <span className="text-sm font-medium text-slate-700">{new Intl.NumberFormat('en-GH', { style: 'currency', currency: 'GHS' }).format(value)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
                <div className={`${color} h-4 rounded-full`} style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    );
};

const SelectField = ({ label, Icon, options }) => (
    <div>
        <label className="font-semibold text-gray-700 block mb-2 flex items-center">
            <Icon className="w-5 h-5 mr-2 text-gray-400" />
            {label}
        </label>
        <select className="w-full p-3 rounded-lg bg-gray-100 border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent appearance-none">
            {options.map(opt => <option key={opt}>{opt}</option>)}
        </select>
    </div>
);

const AIChatModal = ({ onClose }) => {
    const [messages, setMessages] = useState([
        { from: 'ai', text: 'Hello! I am your AI farming expert. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;
        const newMessages = [...messages, { from: 'user', text: input }];
        setMessages(newMessages);
        setInput('');

        // Fake AI response
        setTimeout(() => {
            setMessages([...newMessages, { from: 'ai', text: 'That is an excellent question! Based on current soil moisture, I recommend watering the North Field for 30 minutes tomorrow morning.' }])
        }, 1500);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg h-[70vh] rounded-2xl shadow-2xl flex flex-col">
                <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="text-xl font-bold text-slate-800">AI Expert Chat</h3>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200"><X /></button>
                </div>
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${msg.from === 'user' ? 'bg-green-500 text-white rounded-br-none' : 'bg-gray-200 text-slate-800 rounded-bl-none'}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t flex items-center gap-2">
                    <input 
                        type="text" 
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && handleSend()}
                        placeholder="Ask about pests, watering..." 
                        className="flex-1 w-full px-4 py-2 rounded-full bg-gray-100 border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <button onClick={handleSend} className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors">
                        <Send />
                    </button>
                </div>
            </div>
        </div>
    );
};
