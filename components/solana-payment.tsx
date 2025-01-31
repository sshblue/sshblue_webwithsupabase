'use client'

import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'
import axios from 'axios'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface SolanaPaymentProps {
  montantUSD: number
  onPaymentComplete: () => void
}

export function SolanaPayment({ montantUSD, onPaymentComplete }: SolanaPaymentProps) {
  const router = useRouter()
  const supabase = createClient()
  const [prixSol, setPrixSol] = useState<number>(0)
  const [montantSol, setMontantSol] = useState<number>(0)
  const [adressePaiement] = useState(new PublicKey('6HCff4B3AGYLfpHXcNciMBsz55Mhd3iRp8SXBCRNMoTi'))
  const [isPaid, setIsPaid] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  const connection = new Connection('https://api.mainnet-beta.solana.com')

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      toast.error('Please sign in to order a server')
      router.push('/sign-in')
      return
    }
    setUser(user)
  }

  useEffect(() => {
    const fetchSolPrice = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'
        )
        const price = response.data.solana.usd
        setPrixSol(price)
        setMontantSol(Number((montantUSD / price).toFixed(4)))
      } catch (error) {
        console.error('Error fetching SOL price:', error)
        toast.error('Error fetching Solana price')
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchSolPrice()
    }
  }, [montantUSD, user])

  useEffect(() => {
    if (!isPaid && user) {
      const checkPayment = async () => {
        try {
          const balance = await connection.getBalance(adressePaiement)
          const expectedAmount = montantSol * LAMPORTS_PER_SOL

          if (balance >= expectedAmount) {
            setIsPaid(true)
            toast.success('Payment received successfully')
            onPaymentComplete()
          }
        } catch (error) {
          console.error('Error checking payment:', error)
        }
      }

      const interval = setInterval(checkPayment, 5000)
      return () => clearInterval(interval)
    }
  }, [adressePaiement, montantSol, isPaid, onPaymentComplete, user])

  const paymentUrl = `solana:${adressePaiement.toString()}?amount=${montantSol}`

  if (isLoading) {
    return <div className="text-center p-4">Loading Solana price...</div>
  }

  if (!user) {
    return <div className="text-center p-4">Please sign in to continue</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Solana Payment</CardTitle>
        <CardDescription>
          Scan the QR code to pay {montantSol} SOL (${montantUSD})
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <QRCodeSVG value={paymentUrl} size={256} />
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Current price: 1 SOL = ${prixSol}
          </p>
          <p className="font-mono mt-2">
            Address: {adressePaiement.toString()}
          </p>
        </div>
        {isPaid ? (
          <Button className="w-full" disabled>
            Payment received ✓
          </Button>
        ) : (
          <Button
            className="w-full"
            onClick={() => window.open(`https://explorer.solana.com/address/${adressePaiement.toString()}`, '_blank')}
          >
            View on Solana Explorer
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
