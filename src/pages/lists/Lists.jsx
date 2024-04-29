import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListItem from "../../components/ListItem";
import NavBar from "../../components/NavBar";

function Lists() {
  const [posts, setPosts] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const userToken = localStorage.getItem("token");
  let navigate = useNavigate();

  useEffect(() => {
    if (!userToken) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (userToken) {
      getPosts();
    }
  }, []);

  function getPosts() {
    axios
      .get("https://medicalstore.mashupstack.com/api/medicine", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSearch(e) {
    setSearchItem(e.target.value);
  }

  const filteredPosts = posts.filter((post) =>
    post.name.toLowerCase().includes(searchItem.toLowerCase())
  );

  return (
    <>
      <NavBar />
      <div>
        <h1>Lists</h1>

        <br />
        <input
          className="form-control w-25 mx-auto"
          type="text"
          placeholder="Search..."
          value={searchItem}
          onChange={handleSearch}
        />
        {filteredPosts.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Medicine</th>
                <th>Company</th>
                <th>Expiry Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((item) => (
                <ListItem key={item.id} data={item} getPosts={getPosts} />
              ))}
            </tbody>
          </table>
        ) : (
          <div>No data found</div>
        )}
      </div>
    </>
  );
}

export default Lists;
