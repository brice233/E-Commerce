"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ProductForm() {
    return <form className="space-y-8">
        <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" name="name" required/>
        </div>
    </form>
}