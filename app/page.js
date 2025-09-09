import Link from "next/link";
import Image from "next/image";

const getAllItems = async () => {
  const response = await fetch("http://localhost:3000/api/item/readall", {
    cache: "no-store", // Next.js에서는 기본적으로 캐시를 사용함 -> but, 데이터를 업데이트해도 값이 반영되지 않을 때가 있으므로 캐시를 사용하지 않도록 설정함
  });
  const jsonData = await response.json();
  const allItems = jsonData.allItems;
  return allItems;
};

const ReadAllItems = async () => {
  const allItems = await getAllItems();
  return (
    <div className="grid-container-in">
      {allItems.map((item) => (
        <Link href={`/item/readsingle/${item._id}`} key={item._id}>
          <Image
            src={item.image}
            width={750}
            height={500}
            alt="item-image"
            priority
          />
          <div>
            <h2>{item.price}</h2>
            <h3>{item.title}</h3>
            <p>{item.description.substring(0, 80)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ReadAllItems;
