"use client";
import { useRouter } from "next/navigation";
import useAuth from "@/app/utils/useAuth";

const UpdateItem = (props) => {
  const router = useRouter();
  const loginUserEmail = useAuth();

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/item/update/${props.params.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title: formData.get("title"),
            price: formData.get("price"),
            image: formData.get("image"),
            description: formData.get("description"),
            email: loginUserEmail,
          }),
        }
      );
      const jsonData = await response.json();
      alert(jsonData.message);
      router.push("/");
      router.refresh();
    } catch {
      alert("아이템 수정 실패");
    }
  };

  if (loginUserEmail === props.singleItem.email) {
    return (
      <div>
        <form action={handleSubmit}>
          <input
            defaultValue={props.singleItem.title}
            type="text"
            name="title"
            placeholder="아이템명"
            required
          />
          <input
            defaultValue={props.singleItem.price}
            type="text"
            name="price"
            placeholder="가격"
            required
          />{" "}
          <input
            defaultValue={props.singleItem.image}
            type="text"
            name="image"
            placeholder="이미지"
            required
          />
          <textarea
            defaultValue={props.singleItem.description}
            name="description"
            rows={15}
            placeholder="상품 설명"
            required
          />
          <button>수정</button>
        </form>
      </div>
    );
  } else {
    return <h1>권한이 없습니다.</h1>;
  }
};

export default UpdateItem;
