import Image from "next/image";
import Link from "next/link";

export const getSingleItem = async (id) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`,
    { cache: "no-store" }
  );
  const jsonData = await response.json();
  const singleItem = jsonData.singleItem;
  return singleItem;
};

const ReadSingleItem = async (context) => {
  const params = await context.params;
  const singleItem = await getSingleItem(params.id);

  return (
    <div className="grid-container-si">
      <div>
        <Image
          src={singleItem.image}
          width={750}
          height={500}
          alt="item-image"
          priority
        />
      </div>
      <div>
        <h1>₩{singleItem.price}</h1>
        <h2>{singleItem.title}</h2>
        <hr />
        <p>{singleItem.description}</p>
        <div>
          <Link href={`/item/update/${singleItem._id}`}>아이템 수정</Link>
          <Link href={`/item/delete/${singleItem._id}`}>아이템 삭제</Link>
        </div>
      </div>
    </div>
  );
};

export default ReadSingleItem;
