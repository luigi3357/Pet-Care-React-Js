import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ClientView from "./ClientView";
import KeeperView from "./KeeperView";
import { changeBookingStatus, fetchCheckOutDetails, postPayment } from "../REDUX/actions/action";

export function Payment() {
  const statusClosed = ["completed", "approved", "rejected", "cancelled"];
  const link = useSelector((state) => state.urlMP);
  const loginUser = JSON.parse(localStorage.login)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkout_details = useSelector((state) => state.checkout_details);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  // const loginUser = { id: "795edace-30fa-49d1-b6f0-eea097f96836" };
  // const loginUser = { id: "a7c1b729-e78a-4013-be33-3114aa6d5e2b" };

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
      navigate(-1);
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
              complete={() => changeStatus("completed")}
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
