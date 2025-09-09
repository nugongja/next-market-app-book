"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useAuth from "@/app/utils/useAuth";

const DeleteItem = (props) => {
  const router = useRouter();
  const loginUserEmail = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/item/delete/${props.params.id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );
      const jsonData = await response.json();
      alert(jsonData.message);
      router.push("/");
      router.refresh();
    } catch {
      alert("아이템 삭제 실패");
    }
  };

  if (loginUserEmail === props.singleItem.email) {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <h2>{props.singleItem.title}</h2>
          <Image
            src={props.singleItem.image}
            width={750}
            height={500}
            alt="item-image"
            priority
          />
          <h3>{props.singleItem.price}</h3>
          <p>{props.singleItem.description}</p>
          <button>삭제</button>
        </form>
      </div>
    );
  } else {
    <h1>권한이 없습니다.</h1>;
  }
};

export default DeleteItem;
