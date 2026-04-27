import AppBar from '@/components/AppBar'
import BottomNav from '@/components/BottomNav'
import ProfileInfo from '@/components/Profile/ProfileInfo'
import React from 'react'
import ProfileHero from '@/components/Profile/ProfileHero'

const page = () => {
  return (
    <div className='mb-24'>
      <AppBar />
      <ProfileHero />
      <ProfileInfo/>
      <BottomNav />
    </div>
  )
}

export default page
