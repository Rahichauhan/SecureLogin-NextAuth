import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import {connectMongodb} from "@/../../TaskManagementDashboard-NEXT/task/lib/mongodb"
import User from "@/../../TaskManagementDashboard-NEXT/task/models/user"
export async function POST(req)
{
    try {
        const {name,email,password}= await req.json();
        await connectMongodb();
        const hpassword = await bcrypt.hash(password,10);
        await User.create({ name, email,password:hpassword});
        return NextResponse.json({message:"User registered"},{status:201})
    } catch (error) {
        return NextResponse.json({message:"An error occured while registering the user."},{status:500})
    }
}