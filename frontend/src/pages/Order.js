import { useEffect, useState } from "react"
import { fetchAllOrder } from "../service/admin/adminService"
import { useSelector } from "react-redux"

const Order = () => {
    const idAccount = useSelector(state => state.user.account.idAccount)

    const [listOrder, setListOrder] = useState([])

    useEffect(() => {
        fnFetchAllOrder()
    }, [])
    const fnFetchAllOrder = async () => {
        let res = await fetchAllOrder({ idAccount })
        console.log("res fetch order: ", res)


        const result = res.data.DT.reduce((acc, current) => {
            // Tìm xem đã có object nào trong acc có cùng id với object hiện tại chưa
            const existing = acc.find(item => item.id === current.id);

            if (existing) {
                // Nếu đã có, thêm object hiện tại vào mảng con objects
                existing.objects.push(current);
            } else {
                // Nếu chưa có, tạo mới object với id và mảng objects chứa object hiện tại
                acc.push({
                    id: current.id,
                    objects: [current]
                });
            }

            return acc;
        }, []);

        console.log("result: ", result);

        setListOrder(result)

    }
    return (
        <>

            <section className="mt-5">
                <div className="container">
                    <h1>Đơn hàng đã mua</h1>
                    {

                        listOrder.map((item, index) => {

                            const renderedProperties = item.objects.map((property, index) => (
                                <div key={`key ${index}`} >
                                    <div className="d-flex justify-content-between mt-2">
                                        <div className="d-flex w-100">
                                            <div>
                                                <img src={property.Cart.Products.image} alt="" style={{ maxWidth: "150px", maxHeight: "150px", border: "1px solid #ccc" }} />
                                            </div>
                                            <div className="d-flex flex-column ms-3">
                                                <p>{property.Cart.Products.name} </p>
                                                <p>x  {property.Cart.Products.Cart_Detail.qty}</p>
                                            </div>
                                        </div>
                                        <p>{property.Cart.Products.price}đ</p>
                                    </div>
                                    <hr />
                                </div>
                            ));
                            return (
                                <div className="mt-5" style={{ backgroundColor: "rgb(244 243 244)", padding: "15px", borderRadius: "5px" }}>
                                    {renderedProperties}
                                    <h5 style={{ textAlign: "right" }}>Tổng tiền: {item.objects[0].totalMoney}</h5>

                                </div>

                            );
                        })
                    }
                </div >
            </section>
        </>
    )
}
export default Order