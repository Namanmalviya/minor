import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";

const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const regionData = [
  {
    id: "north-america",
    name: "North America",
    score: 8.7,
    coordinates: [-100, 40],
    color: "#059669"
  },
  {
    id: "europe",
    name: "Europe",
    score: 8.4,
    coordinates: [10, 50],
    color: "#2563EB"
  },
  {
    id: "asia",
    name: "Asia Pacific",
    score: 7.9,
    coordinates: [100, 35],
    color: "#F59E0B"
  },
  {
    id: "latin-america",
    name: "Latin America",
    score: 6.2,
    coordinates: [-60, -15],
    color: "#EF4444"
  }
];

const WorldInnovationMap = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="bg-white rounded-lg border p-6">
      <h3 className="text-lg font-semibold mb-1">
        Global Innovation Density
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Real-world geographic visualization
      </p>

      <ComposableMap
        projectionConfig={{ scale: 150 }}
        className="w-full h-[400px]"
      >
        {/* WORLD MAP */}
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#e5e7eb"
                stroke="#94a3b8"
                strokeWidth={0.5}
              />
            ))
          }
        </Geographies>

        {/* INNOVATION MARKERS */}
        {regionData.map((region) => (
          <Marker
            key={region.id}
            coordinates={region.coordinates}
            onClick={() => setSelected(region)}
          >
            <circle
              r={region.score * 2}
              fill={region.color}
              fillOpacity={0.7}
              stroke={region.color}
              strokeWidth={2}
              className="cursor-pointer"
            />
            <text
              y={4}
              textAnchor="middle"
              fontSize={10}
              fill="#fff"
              fontWeight="bold"
            >
              {region.score}
            </text>
          </Marker>
        ))}
      </ComposableMap>

      {/* INFO BOX */}
      {selected && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-50">
          <h4 className="font-semibold">{selected.name}</h4>
          <p className="text-sm text-gray-600">
            Innovation Score: {selected.score}
          </p>
        </div>
      )}
    </div>
  );
};

export default WorldInnovationMap;
