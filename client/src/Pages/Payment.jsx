import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ClientView from "../Components/ClientView";
import KeeperView from "../Components/KeeperView";
import { changeBookingStatus, fetchCheckOutDetails, postPayment } from "../REDUX/actions/action";

export function Payment() {
  const statusClosed = ["completed", "approved", "rejected", "cancelled"];
  const link = useSelector((state) => state.urlMP);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkout_details = useSelector((state) => state.checkout_details);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const loginUser = { id: "f0c5ceb6-9e58-4bb8-bc69-d159aaf47a18" };

  const payload = {
    bookRef: id.slice(24),
    id: id,
    unit_price: checkout_details.price,
  };

  useEffect(() => {
    dispatch(fetchCheckOutDetails(id));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [dispatch]);
  useEffect(() => {
    if (link.length > 0) {
      window.location.assign(link);
    }
  }, [link]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postPayment(payload));
  }
  function changeStatus(status) {
    let newStatus = {
      status: status,
      id: checkout_details.id,
    };
    dispatch(changeBookingStatus(newStatus));
    setTimeout(() => {
      navigate("/");
    }, 500);
  }
  

  return (
    <div>
      {!loading && (
        <div>
          {checkout_details.client.id == loginUser.id ? (
            <ClientView
              checkout_details={checkout_details}
              submit={handleSubmit}
              cancelOrder={() => changeStatus(statusClosed[3])}
              status={statusClosed}
            />
          ) : checkout_details.keeper.id == loginUser.id ? (
            <KeeperView
              checkout_details={checkout_details}
              accept={() => changeStatus("accepted")}
              cancelOrder={() => changeStatus(statusClosed[2])}
              status={statusClosed}
            />
          ) : (
            <p>no tienes acceso a esta informacion</p>
          )}
        </div>
      )}
    </div>
  );
}
