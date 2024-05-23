import { CheckCircle, Circle } from "@phosphor-icons/react";

function List(props) {
  const { list, setList } = props;

  const updateList = async (listId, listStatus) => {
    const res = await fetch(`./api/list/${listId}`, {
      method: "PUT",
      body: JSON.stringify({ status: listStatus }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // checking items won't need to be refreshed and change status
    const json = await res.json();
    if (json.acknowledged) {
      setList((currentList) => {
        return currentList.map((item) => {
          if (item._id === listId) {
            return { ...item, status: !item.status };
          }
          return item;
        });
      });
    }
  };

  return (
    <div className="list-item">
      <p>{list.list}</p>
      <div>
        <button
          className="list__status"
          onClick={() => updateList(list._id, list.status)}
        >
          {list.status ? (
            <CheckCircle size={25} weight="bold" />
          ) : (
            <Circle size={25} weight="bold" />
          )}
        </button>
      </div>
    </div>
  );
}

export default List;