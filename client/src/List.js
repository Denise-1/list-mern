import { CheckCircle, Circle, X } from "@phosphor-icons/react";

function List({ listItem, setList }) {
  const updateList = async (listId, listStatus) => {
    const res = await fetch(`/api/list/${listId}`, {
      method: "PUT",
      body: JSON.stringify({ status: listStatus }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();
    if (json.acknowledged) {
      setList((currentList) =>
        currentList.map((item) =>
          item._id === listId ? { ...item, status: !item.status } : item
        )
      );
    }
  };

  const deleteList = async (listId) => {
    const res = await fetch(`/api/list/${listId}`, {
      method: "DELETE",
    });
    const json = await res.json();
    if (json.acknowledged) {
      setList((currentList) =>
        currentList.filter((item) => item._id !== listId)
      );
    }
  };

  return (
    <div className="list-item">
      <p>{listItem.list}</p>
      <div className="mutations">
        <button
          className="list__status"
          onClick={() => updateList(listItem._id, listItem.status)}
        >
          {listItem.status ? (
            <CheckCircle size={25} weight="bold" />
          ) : (
            <Circle size={25} weight="bold" />
          )}
        </button>
        <button
          className="list__delete"
          onClick={() => deleteList(listItem._id)}
        >
          <X size={25} />
        </button>
      </div>
    </div>
  );
}

export default List;
