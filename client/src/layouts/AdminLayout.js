import { Outlet } from "react-router-dom";
import "./adminlayout.css";

function AdminLayout() {

  return (
    <div className="admin-layout">

      <div className="admin-body">
        <Outlet />
      </div>

    </div>
  );

}

export default AdminLayout;