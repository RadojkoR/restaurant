import OrderListProps from './orderListType';
import { MainLoader } from '../Common';
import { orderHeaderModel } from '../../../Interfaces/Index';
import { useNavigate } from 'react-router-dom';
import { getStatusColor } from '../../../Helper';
import "../../../Style/order.css";

function OrderList({isLoading, orderData}: OrderListProps) {
  const navigate = useNavigate();
  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <>
          <div className="container-fluid row justify-content-between mb-5 mx-auto">
            <h1 className="text-success mt-5 mb-3">Orders List</h1>
            {orderData.map((orderItem: orderHeaderModel) => {
              const badgeColor = getStatusColor(orderItem.status!);
              return (
                <div
                  className="card col-md-4 col-12 p-4 pb-0 mb-4 orderListCard"
                  style={{ boxShadow: "0 1px 7px 0 rgb(0 0 0 / 50%)" }}
                >
                  <div
                    className={`card-header d-flex align-items-center justify-content-between bg-${badgeColor}`}
                  >
                    <p className="m-0">Status:</p>
                    <p className="m-0">{orderItem.status}</p>
                  </div>
                  <div className="card-body p-0">
                    <div className="d-flex border-bottom align-items-center justify-content-between bg-light px-3 ">
                      <p className="pt-1 mb-1">ID:</p>
                      <p className="">{orderItem.orderHeaderId}</p>
                    </div>

                    <div className="d-flex border-bottom align-items-center justify-content-between px-3">
                      <p className="pt-1 mb-1">Name:</p>
                      <p className="">{orderItem.pickupName}</p>
                    </div>

                    <div className="d-flex border-bottom align-items-center justify-content-between bg-light px-3">
                      <p className="pt-1">Phone:</p>
                      <p className="">{orderItem.pickupPhoneNumber}</p>
                    </div>

                    <div className="d-flex border-bottom align-items-center justify-content-between px-3">
                      <p className="pt-1">Total:</p>
                      <p className="">{orderItem.orderTotal}</p>
                    </div>

                    <div className="d-flex border-bottom align-items-center justify-content-between bg-light px-3">
                      <p className="pt-1">Total:</p>
                      <p className="">{orderItem.orderTotal!.toFixed(2)}</p>
                    </div>

                    <div className="d-flex border-bottom align-items-center justify-content-between px-3">
                      <p className="pt-1">Date:</p>
                      <p className="">
                        {new Date(orderItem.orderDate!).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="d-flex align-items-center justify-content-between">
                      <button
                        className="btn btn-success my-4 w-50 ms-auto"
                        onClick={() =>
                          navigate(
                            "/order/orderDetails/" + orderItem.orderHeaderId
                          )
                        }
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

export default OrderList