

import BountyCard from '@/components/Home/BountyCard'
import HeroSection from '@/components/Home/HeroSection'

import AppBar from '@/components/AppBar';
import BottomNav from '@/components/BottomNav';

import HomeTabs from '@/components/HomeTabs';


const Home = () => {
  return (
    <div className="pt-22 pb-24 px-2" >
      
      <AppBar />
      <HomeTabs />
      <HeroSection />
      <BountyCard />
      <BottomNav />

    </div>
  )
}

export default Home







