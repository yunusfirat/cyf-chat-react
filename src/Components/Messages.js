import React from "react";
import { useGlobalContext } from "./Context";


const Messages = () => {
    const { data, selectValue, setPostMessage, setpostName, setId, url, setData } = useGlobalContext();
    const edit = (e) => {
        data.map((element) => {
            return (
                parseInt(element.id) === parseInt(e.target.value) ?
                    setpostName(element.from) ||
                    setPostMessage(element.text) ||
                    setId(parseInt(element.id)) : null
            )
        })
    }

    const remove = (e) => {
        const targetValue = e.target.value
        fetch( selectValue.length > 0 ? `${selectValue[0]}/messages/${targetValue}` : `${url[0]}/messages/${targetValue}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => setData(data))
    }

    const refresh = () => {
        window.location.reload(false);
    }
    return (
        <div>
            <section className="message-list">
                <ul>
                    {data.map((element, index) => {
                        const { from, text, timeSent, id } = element
                        return (
                            <li key={index} className="message-li">
                                <div>
                                    <div style={{ display: "flex" }}>
                                        <div className="index">{index}  --{">"} </div>
                                        <div className="from">{from}:</div>
                                    </div>

                                    <div className="message-row">
                                        <span className="message-text">{text}</span>
                                        <div className="controls">
                                            <button onClick={edit} value={id}>Edit</button>
                                            <div className="delete">
                                                <button onClick={remove} value={id} className="btn btn-warning">X</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="timestamp">{timeSent}</div>
                                </div>
                            </li>
                        );
                    })}
                    <button className="refresh" onClick={refresh}>Refresh Messages</button>
                </ul>
            </section>
        </div>
    )
}

export default Messages;