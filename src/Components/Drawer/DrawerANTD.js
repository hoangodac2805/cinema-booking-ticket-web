import React, { Component, useState } from "react";
import { Button, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setOpenDrawer } from "../../Redux/Reducer/DrawerReducer";
export default function DrawerANTD() {
  const { isOpenDrawer, drawerContent, drawerTitle } = useSelector(
    (state) => state.DrawerReducer
  );

  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(setOpenDrawer(false));
  };
  return (
    <>
      <Drawer
        width="50%"
        title={drawerTitle}
        placement="right"
        onClose={onClose}
        open={isOpenDrawer}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
