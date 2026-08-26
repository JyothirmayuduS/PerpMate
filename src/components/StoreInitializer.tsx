'use client'

import { useEffect } from 'react'
import { useStore } from '@/store/useStore'

export default function StoreInitializer() {
  const fetchInitialData = useStore((state) => state.fetchInitialData)

  useEffect(() => {
    fetchInitialData()
  }, [fetchInitialData])

  return null
}
