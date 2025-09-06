import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(request) {
  //const token = await request.headers.get("Authorization")?.split(" ")[1]; // 토큰 취득을 완료한 뒤 다음 처리를 진행하기 위해서 await
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImR1bW15QGVtYWlsLmNvbSIsImV4cCI6MTc1NzIzMjUzM30.wx-wntpTVGNYDG9T68WyEFbA2buPKwq65e3p4VNPU08";

  if (!token) {
    return NextResponse.json({ message: "토큰이 없습니다." });
  }

  try {
    const secretKey = new TextEncoder().encode("next-market-app-book");
    const decodedJwt = await jwtVerify(token, secretKey);
    return NextResponse.next();
  } catch {
    return NextResponse.json({
      message: "토큰이 올바르지 않습니다. 로그인 해 주십시오.",
    });
  }
}

export const config = {
  matcher: [
    "/api/item/create",
    "/api/item/update/:path*",
    "/api/item/delete/:path*",
  ],
};
