import Form from "./form";
import { getSingleItem } from "../../readsingle/[id]/page";
const DeleteItem = async (context) => {
  const params = await context.params;
  const singleItem = await getSingleItem(params.id);

  return (
    <div>
      <h1 className="page-title">아이템 삭제</h1>
      <Form params={params} singleItem={singleItem} />
    </div>
  );
};
