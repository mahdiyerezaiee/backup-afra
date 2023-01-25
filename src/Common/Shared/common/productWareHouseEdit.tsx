import { GetProductWareHouses, SetProductWareHouses } from "../../../services/prodcutWarehouse";
import { useEffect } from "react";
import { useMemo, useState } from "react";
import MyTable from "../Form/MyTable";
import { useRef } from "react";

interface Props {
    id: any,
    submit: boolean
}
const ProductWareHouse: React.FC<Props> = ({ id, submit }) => {
    let inp: any = useRef();

    const [wareHouse, setWarehouse] = useState<any>([])
    const [active, setActive] = useState<any>([])
    const [newWareHouse, setNewWareHouse] = useState<any>([])
    const activity = active.map((data: any) => ({ active: data }))

    const mergeById = (a1: any, a2: any) =>
        a1.map((itm: any, index1: number) => ({
            ...a2.find((item: any, index: number) => index === index1 && item),
            ...itm,
        }));
    useEffect(() => {

        if (active.length === 0) {
            setActive(new Array(wareHouse.length).fill(false))
        }
        setNewWareHouse(mergeById(wareHouse, activity))

    }, [active])

    const getProductWareHouse = async () => {
        try {
            const { data, status } = await GetProductWareHouses(id)
            setWarehouse(data.result.productWareHouses)

        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getProductWareHouse()

    }, [])



    return (
        <div className='row d-flex justify-content-center '>
            <div className='widget box shadow col-md-8 col-xs-12'>
                <div className="table-responsive" style={{ overflowX: 'auto', transform: 'rotateX(180deg)' }}>
                    <table className='table mb-4 text-center' style={{ transform: 'rotateX(180deg)' }}>
                        <thead>
                            <tr>
                                <th>انتخاب</th>
                                <th>شناسه</th>
                                <th>نام</th>

                                <th>مقدار</th>
                                <th>مقدار فروش</th>
                                <th>مقدار رزرو شده</th>
                                <th>عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {wareHouse.map((contact: any, index: number) => (

                                <tr style={{ backgroundColor: contact.id !== 0 ? 'lightgray' : 'transparent' }} key={contact.wareHouseId}>
                                    <td>

                                        <input
                                            type='checkbox'
                                            id={contact.wareHouseId}
                                            
                                        />
                                    </td>
                                    <td>
                                        {contact.wareHouseId}
                                    </td>
                                    <td>
                                        {contact.wareHouseName}
                                    </td>
                                    <td>
                                        {contact.quantity}
                                    </td>




                                    <td>{contact.consumableQuantity}</td>
                                    <td>{contact.reservedQuantity}</td>
                                    <td>

                                        <button className="border-0 bg-transparent non-hover edit-btn">  ثبت
                                        </button></td>

                                </tr>
                            )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
}

export default ProductWareHouse