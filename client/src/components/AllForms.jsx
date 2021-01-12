import React , { useState, useEffect } from 'react';


const AllForms = () => {
    const [ data, setData ] = useState([]);

    const getAllForms = () =>{
        fetch("/allforms",{
            method:"GET"
        })
        .then(res=>res.json())
        .then(forms=>{
            setData(forms.forms)
            console.log(forms)
        }).catch(err=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        getAllForms();
    },[]);

    return (
        <div className="container">
            <div className="row">
                <div className="maintab col-lg-12 col-sm-12 mx-auto">
                    <table className="table table-striped table-dark">
                        <thead>
                            <tr>
                                <th scope="col">#            </th>
                                <th scope="col">Name         </th>
                                <th scope="col">Email        </th>
                                <th scope="col">Phone        </th>
                                <th scope="col">Date Of Birth</th>
                            </tr>
                        </thead>
                        <tbody>
                            { 
                                data.map((item,index)=>{
                                    return (
                                        <tr key={index}>
                                            <td>{index+1    }</td>
                                            <td>{item .name }</td>
                                            <td>{item .email}</td>
                                            <td>{item .phone}</td>
                                            <td>{item .dob  }</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>    
                </div>
            </div>
        </div>
    )
}

export default AllForms;