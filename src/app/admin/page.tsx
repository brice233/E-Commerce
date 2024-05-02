import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";




async function getSaledata() {
 const data = await   db.order.aggregate({
        _sum: {pricePaidInCents: true},
        _count: true
    })
    
    return{
        amount:(data._sum.pricePaidInCents||0)/100,
        numberOfsales: data._count
    }
}

async function getUserdata(){
    const[userCount,orderData] = await Promise.all([
        db.user.count(),
      db.order.aggregate({
        _sum: {pricePaidInCents: true},
      }),
    ])
    
    return {
        userCount,
      AverageValuePerUser: userCount === 0 ? 0: (orderData._sum.pricePaidInCents||0)/userCount/100,
   }
}

  async function getProductData() {
    const [activeCount,InactiveCount]= await Promise.all([
    db.product.count({where: { isAvailableForPurchase: true }}),
    db.product.count({where: { isAvailableForPurchase: false }})
])  
 return {activeCount, InactiveCount}
  }


export default async function AdminDashboard() {
    const[salesData,useData,ProductData]= await Promise.all([
        getSaledata(),
        getUserdata(),
        getProductData()
       
    ])

    return ( 
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
       <DashboardCard 
          title="Sale" 
          subtitle={`${formatNumber (salesData.numberOfsales)} Orders`} 
          body={formatCurrency(salesData.amount)}
       />
       <DashboardCard 
          title="Customer" 
          subtitle={`${formatCurrency(useData.AverageValuePerUser)} Average Value`} 
          body={formatNumber(useData.userCount)}
       />

       <DashboardCard 
          title="Active Product" 
          subtitle={`${formatNumber(ProductData.InactiveCount)} Inactive`} 
          body={formatNumber(ProductData.activeCount)}
       />

    </div> 
    )  
}
type DashboardCardProps = {
    title: string;
  subtitle: string;
  body: string;
}

function DashboardCard({title, subtitle, body}:DashboardCardProps){
    return <Card>
        <CardHeader>
           <CardTitle>{title}</CardTitle> 
           <CardDescription>{subtitle}</CardDescription>
            </CardHeader>
        <CardContent>
            <p>{body}</p>
        </CardContent>
        </Card>  
}
  