import ContactUs from '@/components/ContactUs'
import CraftsmanshipSection from '@/components/CraftsmanshipSection'
import InstagramSection from '@/components/InstagramSection'
import ProductEnquiry from '@/components/ProductEnquiry'
import React from 'react'

export default function page() {
  return (
    <div>
        <ContactUs/>
        <ProductEnquiry/>
        <InstagramSection/>
        <CraftsmanshipSection/>
    </div>
  )
}
