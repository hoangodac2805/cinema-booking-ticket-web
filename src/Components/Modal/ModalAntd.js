import { Modal } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModalClose } from "../../Redux/Reducer/ModalReducer";

export default function ModalAntd() {
  //redux
  const { isModalOpen, content, title, submitFunc } = useSelector(
    (state) => state.ModalReducer
  );
  const dispatch = useDispatch();
  //--------antd--------

  const handleCancel = () => {
    dispatch(setModalClose());
  };

  return (
    <>
      <Modal
        okText="Xác nhận"
        title={title}
        open={isModalOpen}
        onOk={submitFunc}
        onCancel={handleCancel}
      >
        <hr></hr>
        {content}
      </Modal>
    </>
  );
}
