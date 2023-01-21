import {GetProductWareHouses, SetProductWareHouses} from "../../../services/prodcutWarehouse";
import {useEffect} from "react";
import {useMemo, useState} from "react";
import MyTable from "../Form/MyTable";
import {useRef} from "react";

interface Props{
    id:any,
    submit:boolean
}
const ProductWareHouse:React.FC<Props> = ({id, submit}) => {
    let inp:any = useRef();

    const [wareHouse, setWarehouse] = useState<any>([])
    const [active, setActive] = useState<any>([])
    const [newWareHouse, setNewWareHouse] = useState<any>([])
    const activity = active.map((data:any) => ({active: data}))

    const mergeById = (a1:any, a2:any) =>
        a1.map((itm:any, index1:number) => ({
            ...a2.find((item:any, index:number) => index === index1 && item),
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
            const {data, status} = await GetProductWareHouses(id)
            setWarehouse([data.result.productWareHouses, ...active])

        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getProductWareHouse()

    }, [])

    const [editFormData, setEditFormData] = useState<any>({
        quantity: '',
        consumableQuantity: '',
        reservedQuantity: '',
        wareHouseName: "",
        id: "",

    });
    const [editContactId, setEditContactId] = useState(null);

    const handleEditFormChange = (event:any) => {
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
        const newFormData = {...editFormData};
        newFormData[fieldName] = fieldValue;
        setEditFormData(newFormData);
    };
    const checkValueee = (position:any) => {
        const updatedCheckedState = active.map((item:any, index:number) =>
            index === position ? !item : item
        );
        setActive(updatedCheckedState);
    }
    const handleEditFormSubmit = () => {
        const editedContact = {
            wareHouseId: editContactId,
            quantity: editFormData.quantity,
            consumableQuantity: editFormData.consumableQuantity,
            reservedQuantity: editFormData.reservedQuantity,
            productId: id,
            wareHouseName: editFormData.wareHouseName,
            id: editFormData.id,

        };
        const newContacts = [...wareHouse];
        const index = wareHouse.findIndex((contact:any) => contact.wareHouseId === editContactId);
        newContacts[index] = editedContact
        setWarehouse(newContacts);
        setEditContactId(null)

    };

const filterWareHouse = newWareHouse.filter((item:any )=> item.active === true).map((item:any)=>  item)
    const toDos = filterWareHouse.reduce(function(array:any, friend:any) {
        return array.concat(friend.active);
    }, []);
    const finallWarHouse= filterWareHouse.map((item:any)=>
        ({id:item.id ,
            quantity:item.quantity,
            consumableQuantity:item.consumableQuantity,
            reservedQuantity:item.reservedQuantity,
            productId:item.productId,
            wareHouseName:item.wareHouseName,
            wareHouseId:item.wareHouseId,

        }))

    const setproductware = async () => {
        const wareProduct = {
            productWareHouses:wareHouse
        }


        try {
            const {data, status} = await SetProductWareHouses(wareProduct)
        } catch (error) {
            console.log(error)
        }
    }
if (submit === true){
    setproductware()
}
    const handleEditClick = (event:any, contact:any) => {
    setEditContactId(contact.wareHouseId);
        const formValues = {
            quantity: contact.quantity,
            consumableQuantity: contact.consumableQuantity,
            reservedQuantity: contact.reservedQuantity,
            wareHouseName: contact.wareHouseName,
            id:contact.id,
        };
        setEditFormData(formValues);
};

return (
        <div className='row d-flex justify-content-center '>
            <div className='widget box shadow col-md-8 col-xs-12'>
                <div className="table-responsive" style={{overflowX: 'auto', transform: 'rotateX(180deg)'}}>
                    <table className='table mb-4 ' style={{transform: 'rotateX(180deg)'}}>
                        <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>نام</th>
                            <th>استفاده</th>
                            {/*<th>فعال</th>*/}
                            <th>مقدار</th>
                            <th>مقدار فروش</th>
                            <th>مقدار رزرو شده</th>
                            <th>عملیات</th>
                        </tr>
                        </thead>
                        <tbody>
                        {wareHouse.map((contact:any, index:number) => (
                            editContactId === contact.wareHouseId ? (
                                <tr style={{backgroundColor : contact.id !== 0 ? 'lightgray' : 'transparent'}}>
                                    <td>
                                        {contact.wareHouseId}
                                    </td>
                                    <td>
                                        {contact.wareHouseName}
                                    </td>
                                    <td>
                                        <input
                                            id={`custom-checkbox-${index}`}
                                            checked={active[index]}
                                            type="checkbox"
                                            required={true}
                                            value={contact}
                                            name={contact}
                                            onClick={(event) => checkValueee(index)}
                                        />
                                    </td>
                                    {/*<td>*/}
                                    {/*    <input*/}
                                    {/*        type="checkbox"*/}
                                    {/*        required="required"*/}
                                    {/*        name={contact}*/}
                                    {/*        disabled={true}*/}
                                    {/*    />*/}
                                    {/*</td>*/}


                                    <td >

                                        <input
                                            type="مقدار"
                                            required={true}
                                            ref={inp}

                                            value={editFormData.quantity}
                                            name='quantity'
                                            onChange={handleEditFormChange}
                                        ></input>
                                    </td>
                                    <td>{contact.consumableQuantity}</td>
                                    <td>{contact.reservedQuantity}</td>
                                    <td>

                                        <button onClick={() => handleEditFormSubmit()} className="border-0 bg-transparent non-hover edit-btn">  ثبت
                                        </button></td>

                                </tr>
                            ) : (

                                <tr style={{backgroundColor : contact.id !== 0 ? 'PaleGreen' : 'transparent'}}>
                                    <td> {contact.wareHouseId}
                                    </td>
                                    <td>{contact.wareHouseName}</td>
                                    <td>

                                        <input
                                            id={`custom-checkbox-${index}`}
                                            checked={active[index]}
                                            type="checkbox"
                                            value={contact}
                                            name={contact}
                                            onClick={function (event:any) {
                                                handleEditClick(event, contact);
                                                checkValueee(index)
                                            }}
                                        />
                                    </td>
                                    {/*<td>*/}

                                    {/*    <input*/}
                                    {/*        id={`custom-checkbox-${index}`}*/}
                                    {/*        checked={contact.id === 0 ? false : true}*/}
                                    {/*        type="checkbox"*/}
                                    {/*        value={contact}*/}
                                    {/*        name={contact}*/}
                                    {/*        disabled={true}*/}
                                    {/*    />*/}
                                    {/*</td>*/}
                                    <td>{contact.quantity}</td>
                                    <td>{contact.consumableQuantity}</td>
                                    <td>{contact.reservedQuantity}</td>
                                    <td>
                                        <button className="border-0 bg-transparent non-hover edit-btn">   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                        viewBox="0 0 24 24" fill="none"
                                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="feather feather-trash-2">
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path
                                            d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                        <line x1="14" y1="11" x2="14" y2="17"></line>

                                    </svg>

                                    </button></td>


                                </tr>
                            )
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
}

export default ProductWareHouse