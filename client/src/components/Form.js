import { useState } from "react";
import { Link } from "react-router-dom";

function Form() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  return (
    <div className="container">
      <div className="columns is-centered my-5 py-5">
        <div className="column is-5">
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input className="input" type="text" value={name} onChange={e => setName(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label className="label">Chat Room</label>
            <div className="control">
              <input className="input" type="text" placeholder="Room Name" value={room} onChange={e => setRoom(e.target.value)}/>
            </div>
          </div>
          <div className="control button is-primary">
            <Link
              onClick={(e) => (!name || !room ? e.preventDefault() : null)}
              to={`/chat?name=${name}&room=${room}`}
              style={{textDecoration: 'none', color:' #fff'}}
            >
              Join
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
