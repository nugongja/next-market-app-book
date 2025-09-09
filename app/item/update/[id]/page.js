import Form from "./forms";
import { getSingleItem } from "../../readsingle/[id]/page";

const UpdateItem = async (context) => {
  const parmas = await context.parmas;
  const singleItem = await getSingleItem(parmas.id);

  return (
    <div>
      <h1 className="page-title">아이템 수정</h1>
      <Form params={parmas} singleItem={singleItem} />
    </div>
  );
};

export default UpdateItem;
