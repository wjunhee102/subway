import React, { useState, useEffect } from 'react';

const inputKinds = [
    {
        id : "age",
        text : "나이",
        text2 : "세"
    },
    {
        id : "dis",
        text : "거리",
        text2 : "km"
    }
]

const useInput = defaultValue => {
    const [ value, setValue ] = useState(defaultValue || "");
    
    const onChange = e => {
        const { target : {value} } = e;
        setValue(value)
    }

    return { value, onChange }
}

function InputCom({text, id, text2, setV, ivalue}) {
    const valueChange = useInput();

    const submitEvent = e => {
        e.preventDefault();
        switch(id) {
            case "age": 
                const newAge = Object.assign({},ivalue,{ age : Number(valueChange.value)})
                return setV(newAge);
            case "dis":
                const newDis = Object.assign({},ivalue,{ dis : Number(valueChange.value)})
                return setV(newDis);
            default :
                return setV(ivalue);
        }
    }
    return (
        <form className={`inputs input${id}`} onSubmit={submitEvent}>
            <label htmlFor={id}>{text} :</label> 
            <input {...valueChange} id={id} type="number" />
            <span>{text2}</span>
            <button></button>
        </form>
    )
}

function Profile() {
    const [ ivalue, setiValue ] = useState({
        age : 0,
        dis : 0
    })
    const [ res, setRes ] = useState(0);

    const cal = ()=>{
        const {age, dis} = ivalue;
        let eleAge1 = 1;
        let eleAge2 = 1;
        let eleDis = 0;
        let won = 1250;
        let eleRes;
        if(age < 7 || age >= 65) {
            eleRes = 0;
            return setRes(eleRes)
        };
        if(age >= 19) {
            eleAge1 = 0;
        } else {
            eleAge1 = -350;
            if(age >=7 || age <= 12) {
                eleAge2 = 0.5;
            } else {
                eleAge2 = 0.2;
            }
        }

        if(dis > 10) {
            if(dis <= 50) {
                eleDis = Math.floor(dis/5)*100
            } else {
                let dis1 = (50/5)*100
                let dis2 = Math.floor((dis-50)/8)*100
                eleDis = dis1 + dis2
            }
        }
        eleRes = (won - eleAge1)*eleAge2 + eleDis 
        return setRes(eleRes)
    }

    useEffect(()=>{
        console.log(ivalue);
        console.log("\u250c")
    },[ivalue])
    return (
        <section className="profile">
            {inputKinds.map((ele, idx)=>(
                <InputCom 
                    text={ele.text}
                    text2={ele.text2}
                    id={ele.id}
                    key={idx}
                    setV={setiValue}
                    ivalue={ivalue}
                />
            ))}
            <button type="button" onClick={cal}>계산</button>
            <div className="window">
                <p>요금 : {res}원</p>
            </div>
        </section>
    )
}

export default Profile;