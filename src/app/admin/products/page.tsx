import { Button } from "@/components/ui/button";
import PageHeader from "../_component/PageHeader";
import Link from "next/link";
import { Table, TableBody, TableHead, TableRow} from "@/components/ui/table";

export default function AdminProductsPage() {
    return <>
    <div className="flex justify-between items-center gap-4">
    <PageHeader>Products</PageHeader>
    <Button asChild>
        <Link href="/admin/products/new">add product</Link>
    </Button>
    </div>
    <ProductsTable />
    </>
}


function ProductsTable(){
    return (
    <Table>
       <TableRow>
        <TableHead className="w-0">
            <span className="sr-only">Avaliable for Purchase</span>
        </TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Price</TableHead>
        <TableHead>order</TableHead>
        <TableHead className="w-0">
            <span className="sr-only">Actions</span>
        </TableHead>
       </TableRow>
       <TableBody>
        
       </TableBody>
    </Table>
    )
    
}