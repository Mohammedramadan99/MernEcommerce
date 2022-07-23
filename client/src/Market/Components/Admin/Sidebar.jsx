import React from "react";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@mui/lab";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import Logo from '../Layout/Logo'
const Sidebar = () =>
{
  const clickHandler = (e) =>
  {
    console.log(e.target.class)
    e.target.class = "active"
  }
  return (
    <div className="sidebar">
      <Link to="/">
        <Logo />
      </Link>
      <Link to="/admin/dashboard" onClick={(e) => clickHandler(e)}>

        <p>
          <div className="icon">
            <DashboardIcon />
          </div>
          <div className="text">
            Dashboard
          </div>
        </p>
      </Link>
      <Link to="#" onClick={(e) => clickHandler(e)}>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/products">
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>

            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to="/admin/orders" onClick={(e) => clickHandler(e)}>

        <p>
          <div className="icon">
            <ListAltIcon />
          </div>
          <div className="text">
            Orders
          </div>
        </p>
      </Link>
      <Link to="/admin/users" onClick={(e) => clickHandler(e)}>

        <p>
          <div className="icon">
            <PeopleIcon />
          </div>
          <div className="text">
            Users
          </div>
        </p>
      </Link>
      <Link to="/admin/reviews" onClick={(e) => clickHandler(e)}>

        <p>
          <div className="icon">
            <RateReviewIcon />
          </div>
          <div className="text">
            Reviews
          </div>
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
