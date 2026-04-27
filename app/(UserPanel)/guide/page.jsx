

import AppBar from '@/components/AppBar'
import BottomNav from '@/components/BottomNav'
import Guide from '@/components/guide/Guide'
import HomeTabs from '@/components/HomeTabs'

const page = () => {

  return (
    <div className='mt-[90px]'>
      <AppBar />
      <HomeTabs />
      <Guide />
      <BottomNav />
    </div>
  )
}

export default page
