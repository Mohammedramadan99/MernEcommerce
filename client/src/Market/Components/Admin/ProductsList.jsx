import React, { Fragment, useEffect, lazy, Suspense } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import
{
  reset,
  getAdminProducts,
  removeProduct,
  getProductDetails
} from "../../redux/product/productSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
// import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const Sidebar = lazy(() => import("./Sidebar"));


const ProductList = () =>
{
  const dispatch = useDispatch();

  const navigate = useNavigate()



  const { isError, allProducts, isDeleted, message } = useSelector((state) => state.products);
  const deleteProductHandler = (id) =>
  {
    dispatch(removeProduct(id));
  };

  useEffect(() =>
  {
    if (isError)
    {
      toast.error(message);
      dispatch(reset());
    }

    // if (deleteError) {
    //   toast.error(deleteError);
    //   dispatch(reset());
    // }

    if (isDeleted)
    {
      toast.success("Product Deleted Successfully");
      navigate("/admin/dashboard");
    }
    dispatch(getAdminProducts());
  }, [dispatch, toast, isError, , isDeleted]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) =>
      {
        return (
          <Fragment>
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  allProducts &&
    allProducts.forEach((item) =>
    {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <div className="admin">
        <Suspense fallback={<div>loading ... </div>}>
          <Sidebar />
        </Suspense>
        <div className="productListContainer" data-aos="zoom-in">
          <div className="productListHeading">ALL PRODUCTS</div>
          {/* <UserOptions/> */}

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>

      </div>
    </Fragment>
  );
};

export default ProductList;
