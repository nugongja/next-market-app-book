import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function POST(request) {
  // request : 프론트에서 전송된 요청을 가리킨다.
  const reqBody = await request.json(); // -> body 데이터를 받는 방법

  try {
    await connectDB();
    await ItemModel.create(reqBody);
    return NextResponse.json({ message: "아이템 작성 성공" }); // 프론트의 요청에 대한 응답이 NextResponse이다.
  } catch {
    return NextResponse.json({ message: "아이템 작성 실패" });
  }
}
