import {NavLink} from "react-router-dom";
import {FormEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store";
import {addProduct} from "../../store/Slice/productSlice/productSlice";
import Select from 'react-select';
import {MeasureUnitSample} from "../../Enums/MeasureUnitSample";

const Newproduct:React.FC = () => {
    const [active, setActive] = useState<boolean>(true)
    const [name, setName] = useState<string>('')
    const [englishName, setEnglishName] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [minSellableAmount, setMinSellableAmount] = useState<number>(0)
    const [maxSellableAmount, setMaxSellableAmount] = useState<number>(0)
    const [measureUnitId, setMeasureUnitId] = useState<number>(0)
    const [groupId , setGroupId]=useState<number>(0)
    const dispatch =  useDispatch<AppDispatch>()
    const submit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            dispatch(addProduct(
                {
                    name,
                    englishName,
                    price,
                    active,
                    minSellableAmount,
                    maxSellableAmount,
                    measureUnitId,
                    groupId,
                    measureUnit:measureUnitId

                }

            ))




        } catch (error) {
            console.log(error);
        }



    };
    const Mesures = () => {
        return (MeasureUnitSample.map((data:any )=> ({ label: data.name, value: data.id })));
    }


    return (

        <div className='user-progress' >
            <div className='row'>
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                    <h5 >تعریف کالا</h5>
                    <p>در این بخش می توانید کالای جدید تعریف  کنید.</p>
                </div>
            </div>
            <div className='row d-flex justify-content-center '>
                <div className='widget box shadow col-md-6 col-xs-12'>


                    <form className="col-8">
                        <div className="n-chk d-flex  mb-4">

                            <div>
                                <label className="mr-2"> فعال </label>

                                <input type="checkbox" checked={active} onChange={e => {
                                    setActive(e.target.checked)
                                    // validator.current.showMessageFor("required");

                                }}
                                />

                            </div>
                        </div>
                        <div className="form-group mb-4 textOnInput  align-content-between">

                            <label>نام کالا</label>
                            <input type="text" className="form-control opacityForInput" placeholder="کنجاله ، ذرت و..."
                                   value={name} onChange={e => {
                                setName(e.target.value)
                                // validator.current.showMessageFor("required");

                            }} />
                            {/*{validator.current.message("required", name, "required|alpha")}*/}

                        </div>
                        <div className="form-group mb-4 textOnInput">
                            <label>کد بازارگاه</label>
                            <input type="text" className="form-control opacityForInput" placeholder="... Corn Seed "
                                   value={englishName} onChange={e => {
                                setEnglishName(e.target.value)
                                // validator.current.showMessageFor("required");

                            }} />
                            {/*{validator.current.message("required", englishName, "required")}*/}

                        </div>

                        <div className="form-group mb-4 textOnInput">
                            <div className='form-row'>
                                <div className="col-6">

                                    <label>واحد</label>
                                    <Select


                                        options={Mesures()}
                                        onChange={(e:any) => setMeasureUnitId(e.value)
                                            // validator.current.showMessageFor("required");

                                        }
                                    />
                                    {/*{validator.current.message("required", Mesures, "required")}*/}


                                </div>

                                {/*<div className="col-6" >*/}
                                {/*    <label>گروه کالا</label>*/}

                                {/*    <Select*/}
                                {/*        // placeholder={validator.current.showMessageFor("required") ? "Normal text placeholder" : <span className="text-danger">خالی است </span>}*/}
                                {/*        options={inputProductG()}*/}
                                {/*        onChange={(e:FormEvent) => {*/}
                                {/*            setGroupId(e.value)*/}
                                {/*            // validator.current.showMessageFor("required");*/}

                                {/*        }}*/}
                                {/*    />*/}
                                {/*    /!*{validator.current.message("required", inputWarehouses, "required")}*!/*/}


                                {/*</div>*/}
                            </div>
                        </div>


                        <div className="form-group">
                            <div className="form-check pl-0">
                                <div className="custom-control custom-checkbox checkbox-info">

                                </div>
                            </div>
                        </div>
                        <div className='row justify-content-between'>
                            <div className='col-6 '>
                                <button type="submit" className="btn btn-success float-left " onClick={submit}>تایید</button>
                            </div>
                            <div className='col-6 '>
                                <NavLink to='/productList' className="btn btn-danger float-right">بازگشت</NavLink>
                            </div>
                        </div>


                    </form>
                </div >
            </div >
        </div>

    );
}
export default Newproduct