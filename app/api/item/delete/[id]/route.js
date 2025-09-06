import { NextResponse } from "next/server";
import { ItemModel } from "@/app/utils/schemaModels";
import connectDB from "@/app/utils/database";

export async function DELETE(request, context) {
  const reqBody = await request.body;
  try {
    await connectDB();
    const params = await context.params;
    const singleItem = await ItemModel.findById(params.id);
    if (singleItem.email === reqBody.email) {
      await ItemModel.deleteOne({ _id: params.id });
      return NextResponse.json({
        message: "아이템 삭제 성공",
      });
    } else {
      return NextResponse.json({
        message: "다른 사용자가 작성한 아이템입니다.",
      });
    }
  } catch {
    return NextResponse.json({ message: "아이템 삭제 실패" });
  }
}
