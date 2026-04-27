"use client"
import AppBar from '@/components/AppBar'
import BottomNav from '@/components/BottomNav'
import MonthlyHero from '@/components/monthly-reward/MonthlyHero'
import HomeTabs from '@/components/HomeTabs'
// import { useGetAllMonthlyBounties } from "@/lib/hooks/useGetAllMonthlyBounties";
// import { useGetCurrentUser } from '@/lib/hooks/useGetCurrentUser'


const page = () => {

 

  return (
    <div className='mt-[90px]'>
      <AppBar  />
      <HomeTabs />
      <MonthlyHero />
      <BottomNav />
    </div>
  )
}

export default page
