import React, { useState, useEffect } from "react";
import axios from "axios";

const DogSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [breeds, setBreeds] = useState([]);
  const [results, setResults] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch the breed list when the component mounts
    async function fetchBreeds() {
      try {
        const response = await axios.get("https://dog.ceo/api/breeds/list/all");
        const breedList = Object.keys(response.data.message);
        setBreeds(breedList);
      } catch (error) {
        console.error("Failed to fetch breeds:", error);
      }
    }

    fetchBreeds();
  }, []);

  const handleSearch = async () => {
    const filteredBreeds = breeds
      .filter((breed) => breed.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 1); // only consider the top match

    setResults(filteredBreeds);

    const fetchedImages = [];
    for (let breed of filteredBreeds) {
      try {
        const response = await axios.get(
          `https://dog.ceo/api/breed/${breed}/images/random/10`
        );
        fetchedImages.push(...response.data.message); // adding multipole images for the breed
      } catch (error) {
        console.error(`Failed to fetch image for breed ${breed}:`, error);
      }
    }
    setImages(fetchedImages);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a dog breed..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {images.map((imageUrl, index) => (
          <li key={index}>
            <img src={imageUrl} alt="dog" style={{ width: "100px" }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DogSearch;
