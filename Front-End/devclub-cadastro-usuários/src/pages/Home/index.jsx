import { useEffect , useState , useRef } from "react";
import "./style.css";
import Trash from "../../assets/icons8-trash.svg";
import api from "../../services/api";

function Home() {
  //React Hooks
  const [users, setUsers] = useState([]);

  const nameInput = useRef();
  const ageInput = useRef();
  const emailInput = useRef();

  async function getUsers() {
    const usersFromApi = await api.get("/users");
    
    setUsers(usersFromApi.data);
    console.log(users);
  }

  async function createUsers() {
    
    await api.post("/users",
      {
        name: nameInput.current.value,
        age: ageInput.current.value,
        email: emailInput.current.value,
      }
    );

    getUsers();
    
  }

  async function deleteUsers(id) {
    await api.delete(`/users/${id}`);

    getUsers();
  }

  useEffect(() => {
    getUsers();
  }, []); 
  

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Usuário</h1>

        <input placeholder="Nome" name="nome" type="text" ref={nameInput} />
        <input placeholder="Idade" name="idade" type="number" ref={ageInput} />
        <input placeholder="Email" name="email" type="email" ref={emailInput} />
        <button type="button" onClick={createUsers} >Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>
              Nome: <span>{user.name} </span>
            </p>
            <p>
              Idade: <span>{user.age}</span>
            </p>
            <p>
              Email: <span>{user.email}</span>
            </p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img
              src={Trash}
              style={{ width: "20px", height: "20px", filter: "invert(1)" }}
            />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
