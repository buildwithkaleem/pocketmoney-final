
import AppBar from '@/components/AppBar'
import BottomNav from '@/components/BottomNav'
import CreateBountyHero from '@/components/create-bounty/CreateBountyHero'
import CreateDailyBountyModal from '@/components/create-bounty/CreateDailyBountyModal'
import { PopupProvider } from '@/context/usePopup'


const page = () => {


  return (
    <div className='mt-[80px]'>
      <AppBar />
      <PopupProvider>
        <CreateBountyHero />
        <CreateDailyBountyModal />
      </PopupProvider>
      <BottomNav />
    </div>
  )
}

export default page
