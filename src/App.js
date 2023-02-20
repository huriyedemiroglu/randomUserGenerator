import "./styles.css";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const url = "https://randomuser.me/api/?results=10&seed=foo";

  const [user, setUser] = useState([]);
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [activeTeam, setActiveTeam] = useState("team1");

  const randomUser = async () => {
    const response = await axios(url);
    setUser(response.data.results);
    console.log(response.data.results);
    setTeam1([]);
    setTeam2([]);
  };
  useEffect(() => {
    randomUser();
  }, []);

  const handleRandom = (index) => {
    const newTeam1 = [...team1];
    const newTeam2 = [...team2];

    user.forEach((item) => {
      const number = Math.random() * 100;
      if (number < 50) {
        newTeam1.push(item);
      } else {
        newTeam2.push(item);
      }
    });
    setUser([]);
    setTeam1(newTeam1);
    setTeam2(newTeam2);
  };

  return (
    <div className="App">
      {user?.map((item) => {
        return (
          <div
            onClick={() => {
              if (activeTeam === "team1") {
                const temp = [...team1, item];
                setTeam1(temp);
              } else {
                const temp = [...team2, item];
                setTeam2(temp);
              }
              const newUsers = user.filter(
                (element) => element.login.uuid !== item.login.uuid
              );
              setUser(newUsers);
            }}
            key={item.login.uuid}
          >
            {item.name.first}
          </div>
        );
      })}

      {/* {user?.map((item) =>(
        <div style={{}}>
          <li>
          {item.name.first}
          </li>
          
        </div>
      ))} */}
      <div className="user">
        <select onChange={(e) => setActiveTeam(e.target.value)}>
          <option value="team1">Team 1</option>
          <option value="team2">Team 2</option>
        </select>
        <button onClick={handleRandom}>Randomize</button>
        <button onClick={() => randomUser()}> Reset</button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <div>
          <p style={{ width: 100 }}>Team 1</p>
          {team1.map((item) => {
            return (
              <p
                onClick={() => {
                  const newTeam = team1.filter(
                    (element) => element.login.uuid !== item.login.uuid
                  );
                  setTeam1(newTeam);
                  setUser([...user, item]);
                }}
              >
                {" "}
                {item.name.first}
              </p>
            );
          })}
        </div>
        <div>
          <p>Team 2</p>
          {team2.map((item) => {
            return (
              <p
                onClick={() => {
                  const newTeam = team2.filter(
                    (element) => element.login.uuid !== item.login.uuid
                  );
                  setTeam2(newTeam);
                  setUser([...user, item]);
                }}
              >
                {" "}
                {item.name.first}
              </p>
            );
          })}
        </div>

        {/* <span style={{ width: 100 }}>Team 1</span>  <span style={{ width: 100 }}>Team 2</span> */}
      </div>
    </div>
  );
};
export default App;
