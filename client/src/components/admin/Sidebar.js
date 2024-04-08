import React from "react";
import "./sidebar.css";
// import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import { useColorMode, useColorModeValue } from '@chakra-ui/react';

const Sidebar = () => {
  const { colorMode } = useColorMode();

  const homeBgColor =
    colorMode === 'dark'
      ? 'conic-gradient(from 45deg at 90% 0%, #050505, #1d1d37)'
      : 'linear-gradient(to right, #565697, #bebef8)';
  const fontColor = useColorModeValue('black', '#bfb1d9');
  return (
    <div className="sidebar" style={{ background: homeBgColor, color: fontColor }}>
      <Link to="/">
      </Link>
      <Link to="/admin/dashboard">
        <p style={{ color: fontColor }}>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />} 
        >
          <TreeItem nodeId="1" label="Products" style={{ background: homeBgColor, color: fontColor }}  >
            <Link to="/admin/products" >
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} style={{ color: fontColor }}  />
            </Link>

            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} style={{ color: fontColor }}/>
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to="/admin/orders">
        <p style={{ color: fontColor }}>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p style={{ color: fontColor }}>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p style={{ color: fontColor }}>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;