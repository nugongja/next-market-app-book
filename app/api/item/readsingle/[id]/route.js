import { NextResponse } from "next/server";
import { ItemModel } from "@/app/utils/schemaModels";
import connectDB from "@/app/utils/database";

export async function GET(request, context) {
  try {
    await connectDB();
    const params = await context.params;
    const singleItem = await ItemModel.findById(params.id);
    return NextResponse.json({
      message: "아이템 읽기 성공 (하나)",
      singleItem: singleItem,
    });
  } catch {
    return NextResponse.json({ message: "아이템 읽기 실패 (하나)" });
  }
}
