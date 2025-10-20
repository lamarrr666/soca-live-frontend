import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./config";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/live-scores`);
        setMatches(response.data);
      } catch (err) {
        setError("Failed to load matches. Please try again later.");
        console.error("Error fetching live matches:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) return <p className="text-center text-lg mt-10">Loading live matches...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-green-700">🔥 Soca Live – Matches</h1>
      {matches.length === 0 ? (
        <p className="text-center text-gray-600">No live matches at the moment.</p>
      ) : (
        <div className="grid gap-4">
          {matches.map((match) => (
            <Link
              key={match.fixtureId}
              to={`/match/${match.fixtureId}`}
              className="flex justify-between items-center border rounded-2xl p-4 bg-white shadow hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4">
                <img src={match.homeLogo} alt="home" className="w-8 h-8" />
                <p className="font-semibold">{match.homeTeam}</p>
              </div>

              <div className="text-center">
                <p className="text-xl font-bold">{match.score}</p>
                <p className="text-gray-500 text-sm">{match.status}</p>
              </div>

              <div className="flex items-center gap-4">
                <p className="font-semibold">{match.awayTeam}</p>
                <img src={match.awayLogo} alt="away" className="w-8 h-8" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Matches;
