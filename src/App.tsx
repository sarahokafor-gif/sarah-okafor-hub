import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ToolsPage from './pages/ToolsPage'
import ResourcesPage from './pages/ResourcesPage'
import BlogPage from './pages/BlogPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
// Practice Area Pages
import CourtOfProtectionPage from './pages/CourtOfProtectionPage'
import AdultSocialCarePage from './pages/AdultSocialCarePage'
import FamilyLawPage from './pages/FamilyLawPage'
import PrivateClientPage from './pages/PrivateClientPage'
import ImmigrationPage from './pages/ImmigrationPage'
import PublicLawPage from './pages/PublicLawPage'
import ProfessionalPage from './pages/ProfessionalPage'
import LegislationPage from './pages/LegislationPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="tools" element={<ToolsPage />} />
          <Route path="resources" element={<ResourcesPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          {/* Practice Area Routes */}
          <Route path="court-of-protection" element={<CourtOfProtectionPage />} />
          <Route path="adult-social-care" element={<AdultSocialCarePage />} />
          <Route path="family-law" element={<FamilyLawPage />} />
          <Route path="private-client" element={<PrivateClientPage />} />
          <Route path="immigration" element={<ImmigrationPage />} />
          <Route path="public-law" element={<PublicLawPage />} />
          <Route path="professional" element={<ProfessionalPage />} />
          <Route path="legislation" element={<LegislationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
