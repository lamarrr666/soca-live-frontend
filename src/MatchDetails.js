import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./config";

const MatchDetails = () => {
  const { id } = useParams();
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/stats/${id}`);
        setStats(response.data);
      } catch (err) {
        setError("Failed to fetch match statistics.");
        console.error("Error fetching match stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [id]);

  if (loading) return <p className="text-center text-lg mt-10">Loading match stats...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link
        to="/"
        className="text-blue-600 underline mb-4 inline-block hover:text-blue-800"
      >
        ← Back to Matches
      </Link>

      <h2 className="text-2xl font-bold mb-4 text-center text-green-700">Match Statistics</h2>

      {stats.length === 0 ? (
        <p className="text-center text-gray-600">No statistics available for this match.</p>
      ) : (
        stats.map((teamStat, index) => (
          <div
            key={index}
            className="border rounded-2xl p-4 mb-6 bg-white shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-center mb-2">
              {teamStat.team.name}
            </h3>

            <ul className="space-y-2">
              {teamStat.statistics.map((stat, i) => (
                <li
                  key={i}
                  className="flex justify-between border-b py-1 text-gray-700"
                >
                  <span>{stat.type}</span>
                  <span>{stat.value ?? 0}</span>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default MatchDetails;
