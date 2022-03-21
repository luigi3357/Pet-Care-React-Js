import axios from "axios";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Tag } from "primereact/tag";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { localhost } from "../REDUX/actions/action";



//La tabla recibe title 'Reservaciones' o 'Contrataciones'
//data es el array de reservaciones o el array de contrataciones
export const BookingDatatables = ({ title, data }) => {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(async () => {
    await axios.get(`${localhost}/bookings/all`).then((response) => {
      setDetails(response.data);
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  console.log(details);

  const statusTemplate = (rowData) => {
    switch (rowData.status) {
      case "pending":
        return (
          <Tag style={{ backgroundColor: "LIGHTBLUE", color: "BLACK" }}>
            {"PENDIENTE"}
          </Tag>
        );

      case "accepted":
        return (
          <Tag severity="warning" style={{ color: "black" }}>
            {"ACEPTADA"}
          </Tag>
        );

      case "approved":
        return <Tag severity="success">{"ABONADA"} </Tag>;

      case "completed":
        return (
          <Tag style={{ backgroundColor: "black", color: "white" }}>
            {"COMPLETADA"}
          </Tag>
        );

      default:
        return <Tag severity="danger">{"CANCELADA"} </Tag>;
    }
  };
  const nameTemplate = (rowData) => {
    if (title == "Reservaciones") {
      return (
        <Link style={{ fontSize: 15 }} to={"/booking/" + rowData.id}>
          {rowData.keeper.name.toUpperCase() +
            " " +
            rowData.keeper.last_name.toUpperCase()}
        </Link>
      );
    }
    return (
      <Link style={{ fontSize: 15 }} to={"/booking/" + rowData.id}>
        {rowData.client.name.toUpperCase() +
          " " +
          rowData.client.last_name.toUpperCase()}
      </Link>
    );
  };

  return (
    <div style={{ width: 600 }}>
      <div className="card">
        <DataTable
          value={loading ? null : details}
          size="small"
          header={title}
          responsiveLayout="stack"
          breakpoint="960px"
          emptyMessage={
            loading
              ? "Cargando operaciones..."
              : `Aún no tienes ${title.toLowerCase()}`
          }
        >
          {/* <Column field="id" header="ID" body={idTemplate} /> */}
          <Column
            header={title == "Reservaciones" ? "Cuidador" : "Cliente"}
            body={nameTemplate}
          />
          <Column field="check_in" header="Entrada" />
          <Column field="check_out" header="Salida" />
          <Column field="status" header="Estado" body={statusTemplate} />
          <Column field="price" header="Costo" />
          {/* <Column field="inventoryStatus" header="Status" body={statusTemplate} /> */}
        </DataTable>
      </div>
    </div>
  );
};