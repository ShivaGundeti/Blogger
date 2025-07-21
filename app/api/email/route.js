import { ConnectDB } from "../../../lib/config/db";
import EmailModel from "../../../lib/models/MailModel";
import { NextResponse } from "next/server";

const LoadDB = async ()=>{
    await ConnectDB();
}
LoadDB()
export async function POST(request) {
    try {
        const formData = await request.formData();
        console.log("🚀🚀---route.js",formData);
        
        const emailData = {
            email: `${formData.get("email")}`,
        };
        await EmailModel.create(emailData);
        return NextResponse.json({ success: true, msg: "Email subscribed" });
    } catch (error) {
        console.error("Error saving email:", error);
        return NextResponse.json({ success: false, msg: "Server error" }, { status: 500 });
    }
}

export async function GET(request) {
    const emails = await EmailModel.find({});
    return NextResponse.json({success:true,msg:"Fetched emails",emails})
}

export async function DELETE(request){
    const mailid = request.nextUrl.searchParams.get("id");
    await EmailModel.findByIdAndDelete(mailid);
    return NextResponse.json({success:true,msg:"Deleted successfully"})
}