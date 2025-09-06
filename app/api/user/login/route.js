import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";

export async function POST(request) {
  const reqBody = await request.json();

  try {
    await connectDB();
    const savedUserData = await UserModel.findOne({ email: reqBody.email });

    if (savedUserData) {
      if (savedUserData.password === reqBody.password) {
        const secretKey = new TextEncoder().encode("next-market-app-book"); // 토큰과 함께 사용할 시크릿 키

        const payload = {
          email: reqBody.email,
        };

        const token = await new SignJWT(payload)
          .setProtectedHeader({ alg: "HS256" }) // 인코딩 알고리즘
          .setExpirationTime("1d") // 유효시간
          .sign(secretKey); // 시크릿 키

        console.log(token);

        return NextResponse.json({ message: "로그인 성공", token: token });
      } else {
        return NextResponse.json({
          message: "로그인 실패: 비밀번호가 올바르지 않습니다",
        });
      }
    } else {
      return NextResponse.json({
        message: "로그인 실패: 사용자를 등록하십시오",
      });
    }
  } catch {
    return NextResponse.json({ message: "로그인 실패" });
  }
}
