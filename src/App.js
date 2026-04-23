import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatFrancys from "./components/ChatFrancys";
import { PesquisaProvider } from "./components/PesquisaContext";
import { CartProvider } from "./components/CartContext";

// páginas
import HomePage from "./components/pages/HomePage";
import PasseiosPage from "./components/pages/PasseiosPage";
import VinicolasPage from "./components/pages/VinicolasPage";
import TransfersPage from "./components/pages/TransfersPage";
import JantaresPage from "./components/pages/JantaresPage";
import IngressosPage from "./components/pages/IngressosPage";
import NatalLuzPage from "./components/pages/NatalLuzPage";
import ProdutoDetalhePage from "./components/pages/ProdutoDetalhePage";
import CheckoutPage from "./components/pages/CheckoutPage";
import BuscaPage from "./components/pages/BuscaPage";

function Layout() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/passeios" element={<PasseiosPage />} />
          <Route path="/viniculas" element={<VinicolasPage />} />
          <Route path="/transfers" element={<TransfersPage />} />
          <Route path="/jantares" element={<JantaresPage />} />
          <Route path="/ingressos" element={<IngressosPage />} />
          <Route path="/natal-luz" element={<NatalLuzPage />} />
          <Route path="/produto/:id" element={<ProdutoDetalhePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/busca" element={<BuscaPage />} />
        </Routes>
      </main>
      <Footer />
      {/* ✅ Chat IA Francys — aparece em todas as páginas */}
      <ChatFrancys />
    </div>
  );
}

const App = () => {
  return (
    <Router>
      <PesquisaProvider>
        <CartProvider>
          <Layout />
        </CartProvider>
      </PesquisaProvider>
    </Router>
  );
};

export default App;
