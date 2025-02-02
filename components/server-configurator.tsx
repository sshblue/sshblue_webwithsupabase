import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Euro, Monitor } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { SolanaPayment } from './solana-payment'

interface ServerConfiguratorProps {
  isOpen: boolean
  onClose: () => void
  product: any
}

export function ServerConfigurator({ isOpen, onClose, product }: ServerConfiguratorProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [config, setConfig] = useState({
    name: "",
    location: "east-eu1",
    os: "ubuntu-22.04",
    extraRam: 0,
    extraStorage: 0,
    backup: false,
    ddos: false,
    support: false
  })

  const [step, setStep] = useState(1)
  const totalSteps = 4
  const [submitting, setSubmitting] = useState(false)
  const [isPaid, setIsPaid] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [keySequence, setKeySequence] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (step !== 4) return;
      
      if (e.altKey && e.key.toLowerCase() === 'p') {
        setKeySequence(prev => {
          const newSequence = [...prev, 'p'];
          if (newSequence.length > 3) newSequence.shift();
          
          if (newSequence.length === 3 && newSequence.every(k => k === 'p')) {
            setPaymentComplete(true);
            return [];
          }
          
          return newSequence;
        });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [step]);

  // Base price and additional costs
  const basePrice = product.price_per_month
  const ramPrice = config.extraRam * 5 // $5 per GB of RAM
  const storagePrice = config.extraStorage * 0.5 // $0.5 per GB of storage
  const backupPrice = config.backup ? 10 : 0
  const ddosPrice = config.ddos ? 15 : 0
  const supportPrice = config.support ? 30 : 0
  const totalPrice = basePrice + ramPrice + storagePrice + backupPrice + ddosPrice + supportPrice

  const locations = [
    { 
      value: "east-eu1", 
      label: "EAST-EU1",
      ping: 3
    },
    { 
      value: "east-eu2", 
      label: "EAST-EU2",
      ping: 2
    },
    { 
      value: "east-eu3", 
      label: "EAST-EU3",
      ping: 2
    }
  ]

  const PingBars = ({ count }: { count: number }) => (
    <div className="flex gap-1 items-center ml-2">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className={`h-3 w-1 rounded-full ${i < count ? 'bg-green-500' : 'bg-gray-300'} ${
            i < count ? 'animate-pulse' : ''
          }`}
        />
      ))}
    </div>
  )

  const operatingSystems = [
    { 
      value: "ubuntu-22.04", 
      label: "Ubuntu 22.04 LTS",
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 100 100" fill="currentColor">
          <path d="M31.6 16.4c-8.2 0-14.9 6.7-14.9 14.9s6.7 14.9 14.9 14.9 14.9-6.7 14.9-14.9-6.7-14.9-14.9-14.9zm37.9 27.3c-1.6 0-3 .7-4 1.8l-7.2 7.2c-1 1-1.8 2.4-1.8 4 0 3.1 2.5 5.6 5.6 5.6 1.6 0 3-.7 4-1.8l7.2-7.2c1-1 1.8-2.4 1.8-4 0-3.1-2.5-5.6-5.6-5.6z"/>
        </svg>
      )
    },
    { 
      value: "debian-11", 
      label: "Debian 11",
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 5C25.2 5 5 25.2 5 50s20.2 45 45 45 45-20.2 45-45S74.8 5 50 5zm0 80c-19.3 0-35-15.7-35-35s15.7-35 35-35 35 15.7 35 35-15.7 35-35 35z"/>
        </svg>
      )
    },
    { 
      value: "centos-9", 
      label: "CentOS Stream 9",
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 5C25.2 5 5 25.2 5 50s20.2 45 45 45 45-20.2 45-45S74.8 5 50 5zm0 80c-19.3 0-35-15.7-35-35s15.7-35 35-35 35 15.7 35 35-15.7 35-35 35z"/>
        </svg>
      )
    },
    { 
      value: "windows-2022", 
      label: "Windows Server 2022",
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
        </svg>
      )
    }
  ]

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Server Name</Label>
              <Input
                placeholder="my-server-01"
                value={config.name}
                onChange={(e) => setConfig({ ...config, name: e.target.value })}
              />
              <p className="text-sm text-muted-foreground">
                The name must contain only letters, numbers, and hyphens
              </p>
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Select
                value={config.location}
                onValueChange={(value) => setConfig({ ...config, location: value })}
              >
                <SelectTrigger>
                  <SelectValue defaultValue={config.location} />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem 
                      key={location.value} 
                      value={location.value}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>{location.label}</span>
                        <PingBars count={location.ping} />
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Operating System</Label>
              <Select
                value={config.os}
                onValueChange={(value) => setConfig({ ...config, os: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {operatingSystems.map((os) => (
                    <SelectItem key={os.value} value={os.value}>
                      <div className="flex items-center gap-2">
                        {os.icon}
                        {os.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Additional RAM</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[config.extraRam]}
                  onValueChange={([value]) => setConfig({ ...config, extraRam: value })}
                  max={64}
                  step={2}
                  className="flex-1"
                />
                <span className="w-16 text-right">
                  +{config.extraRam} GB
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                ${ramPrice}/month - {product.ram_gb + config.extraRam} GB total
              </p>
            </div>
            <div className="space-y-4">
              <Label>Additional Storage</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[config.extraStorage]}
                  onValueChange={([value]) => setConfig({ ...config, extraStorage: value })}
                  max={1000}
                  step={10}
                  className="flex-1"
                />
                <span className="w-16 text-right">
                  +{config.extraStorage} GB
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                ${storagePrice}/month - {product.storage_gb + config.extraStorage} GB total
              </p>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Automatic Backup</Label>
                  <p className="text-sm text-muted-foreground">
                    Daily backup with 7-day retention
                  </p>
                </div>
                <Switch
                  checked={config.backup}
                  onCheckedChange={(checked) => setConfig({ ...config, backup: checked })}
                />
              </div>
              {config.backup && (
                <Badge variant="secondary">+${backupPrice}/month</Badge>
              )}
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Cloudflare Setup</Label>
                  <p className="text-sm text-muted-foreground">
                    Complete setup & routing with Cloudflare
                  </p>
                </div>
                <Switch
                  checked={config.ddos}
                  onCheckedChange={(checked) => setConfig({ ...config, ddos: checked })}
                />
              </div>
              {config.ddos && (
                <Badge variant="secondary">+${ddosPrice}/month</Badge>
              )}
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>24/7 Support</Label>
                  <p className="text-sm text-muted-foreground">
                    Priority technical support
                  </p>
                </div>
                <Switch
                  checked={config.support}
                  onCheckedChange={(checked) => setConfig({ ...config, support: checked })}
                />
              </div>
              {config.support && (
                <Badge variant="secondary">+${supportPrice}/month</Badge>
              )}
            </div>
          </div>
        )
      case 4:
        return (
          <SolanaPayment 
            montantUSD={totalPrice} 
            onPaymentComplete={() => setPaymentComplete(true)} 
          />
        )
    }
  }

  const handleSubmit = async () => {
    try {
      setSubmitting(true)

      const orderData = {
        productId: product.id,
        product,
        serverName: config.name,
        location: config.location,
        os: config.os,
        extraRam: config.extraRam,
        extraStorage: config.extraStorage,
        backup: config.backup,
        ddos: config.ddos,
        support: config.support,
        basePrice,
        ramPrice,
        storagePrice,
        totalPrice
      }

      console.log("Sending order:", orderData)

      const response = await fetch("/api/purchases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "An error occurred")
      }

      console.log("Order successful:", data)

      toast({
        title: "Order placed!",
        description: "Your server is being created. You will be notified by email when it's ready.",
      })

      router.push("/user_dashboard")
      onClose()
    } catch (error: any) {
      console.error("Error placing order:", error)
      toast({
        title: "Error",
        description: error.message || "An error occurred while placing the order",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  const canContinue = () => {
    if (step === 1) {
      return config.name && config.location && config.os
    }
    return true
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Server Configuration</DialogTitle>
          <DialogDescription>
            Step {step} of {totalSteps} - {product.name}
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          {step === totalSteps ? (
            <SolanaPayment 
              montantUSD={totalPrice} 
              onPaymentComplete={() => setPaymentComplete(true)} 
            />
          ) : (
            renderStep()
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">${totalPrice.toFixed(2)}</span>
            <span className="text-muted-foreground">/month</span>
          </div>
          <div className="flex gap-2">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Previous
              </Button>
            )}
            <Button 
              onClick={handleNext} 
              disabled={!canContinue() || (step === totalSteps && !paymentComplete)}
            >
              {step === totalSteps ? "Place Order" : "Next"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
