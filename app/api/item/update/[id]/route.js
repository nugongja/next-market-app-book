import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function PUT(request, context) {
  const reqBody = await request.json();
  try {
    await connectDB();
    const params = await context.params;
    const singleItem = await ItemModel.findById(params.id);
    console.log(reqBody);
    if (singleItem.email === reqBody.email) {
      await ItemModel.updateOne({ _id: params.id }, reqBody);
      return NextResponse.json({ message: "아이템 수정 성공" });
    } else {
      return NextResponse.json({
        message: "다른 사용자가 작성한 아이템입니다.",
      });
    }
  } catch {
    return NextResponse.json({ message: "아이템 수정 실패" });
  }
}
