import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome</h1>
      <Link to="/choose-skip">
        <button style={{ padding: 10, fontSize: 16 }}>Go to Choose Skip</button>
      </Link>
    </div>
  );
}

export default Home;
