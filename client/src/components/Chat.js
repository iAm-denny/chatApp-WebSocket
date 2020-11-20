import { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

let socket;
function Chat({ location }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [welcome, setWelcome] = useState("");
  const [room, setRoom] = useState("");
  const [userList, setUserList] = useState([])

  const ENDPOINT = "http://localhost:4000";
  const query = queryString.parse(location.search);

  useEffect(() => {
    socket = io.connect(ENDPOINT);
    socket.emit("join", { name: query.name, room: query.room }, (error) => {
      alert("User is taken")
      window.location.href="/"
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("welcome", (data) => {
      setWelcome(data.message);
    });
    socket.on("join", (data) => {
      setRoom(data.user.room);
    });

  }, [welcome]);
  useEffect(() => {
    socket.on("getUsersInRoom", (data) => {
      setUserList(data)
    })
  }, [userList])
  const clickHandle = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message);
      setMessage("")
    } else {
      console.log("Something went wrong");
    }
  };
  useEffect(() => {
    socket.on("getMessages", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);


  return (
    <div className="container mt-5 pt-5">
      <h1>{welcome}</h1>
      <div className="columns is-centered mt-5 pt-5">
        <div className="column is-3 has-background-primary">
          <section style={{ height: "50vh" }}>
            <h1 className="is-size-5 has-text-white">
              Chat Name -<span className="is-italic is-size-4">{room}</span>
            </h1>
            <div className="mt-5 pt-5 has-text-white">
              <h1 className="has-text-weight-bold subtitle has-text-white">
                Users
              </h1>
              <ol className="is-small ml-5" type="1">
                {
                  userList.map(user => (
                  <li key={user.name}>{user.name}</li>
                  ))
                }
 
              </ol>
            </div>
          </section>
        </div>
        <div className="column is-6 has-shadow box has-background-primary-light">
          <div className="styleRight">
            <div className="chatMessage is-flex">
              {messages.map((message) => (
                <div key={message.message}>
                  <div  className={query.name === message.user ? "perMessage has-background-primary px-5": "perMessage has-background-white px-5"}> {message.message} </div>
                  <span className="name">{message.user}</span>
                </div>
              ))}
            </div>

            <div className="field is-grouped">
              <p className="control is-expanded">
                <input
                  className="input"
                  type="text"
                  placeholder="Send Message ..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </p>
              <p className="control">
                <button className="button is-info" onClick={clickHandle}>
                  Send
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
