"use client";
import { useState } from "react";

const Register = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/user/register`,
        {
          method: "POST", // GET, POST, PUT, DELETE
          headers: {
            // 데이터 종류 및 보충 정보 작성
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser), // 백엔드에 송신하는 데이터 작성 -> JSON형식으로 변환하는 JSON.stringify로 감싸줌
        }
      );
      const jsonData = await response.json();
      alert(jsonData.message);
    } catch {
      alert("사용자 등록 실패");
    }
  };

  return (
    <div>
      <header>헤더입니다.</header>
      <h1 className="page-title">사용자 등록</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={newUser.name} // value : 이 input에 입력된 데이터
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="이름"
          required
        />
        <input
          value={newUser.email}
          onChange={handleChange}
          type="text"
          name="email"
          placeholder="메일 주소"
          required
        />
        <input
          value={newUser.password}
          onChange={handleChange}
          type="text"
          name="password"
          placeholder="비밀번호"
          required
        />
        <button>등록</button>
      </form>
    </div>
  );
};

export default Register;
